// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const http = require("http");
const cors = require("cors");
const cron = require("node-cron");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

const { MONGO_URL } = process.env;
const PORT = process.env.PORT || 5000;

const authRoute = require("./routes/authRoutes");
const boardRoute = require("./routes/boardRoutes");
const userRoute = require("./routes/userRoutes");

const { verifyAuthHeaderAndRole } = require("./middlewares/authMiddlewares");
const Roles = require("./constants/Roles");

const { initSocket } = require("./handler/socketHandler");
const { processCacheToDBStoreForBoardElements } = require("./utils/cronjobs");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const server = http.createServer(app);

app.use(
  cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

// parse json bodies
app.use(express.json());

// --- Serve frontend static files if build exists ---
const frontendBuildPath = path.join(__dirname, "../frontend/build");
if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));

  // explicit route for manifest.json to avoid auth middleware blocking it
  app.get("/manifest.json", (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "manifest.json"));
  });
} else {
  console.warn(
    "Frontend build folder not found at",
    frontendBuildPath,
    "- static files won't be served. Run `npm run build` in frontend before starting the server in production."
  );
}

app.get("/", (req, res) => {
  res.send("Hello server is working");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- API routes (these remain protected as before) ---
app.use("/", authRoute);
app.use("/board", boardRoute); // Todo: add auth on UI side
app.use("/user", userRoute);

/*
  Testing route for authentication header
*/
app.post("/test", verifyAuthHeaderAndRole([Roles.USER]), async (req, res) => {
  return res.json({ message: "success" });
});

// Cron job
cron.schedule("*/30 * * * * *", () => {
  processCacheToDBStoreForBoardElements();
});

// Initialize socket.io (attach to the created server)
initSocket(server);

// Fallback — send index.html for client-side routing (only if build exists)
app.get("*", (req, res, next) => {
  // let API routes and other defined routes 404/handle themselves
  if (
    req.path.startsWith("/api") ||
    req.path.startsWith("/api-docs") ||
    req.path.startsWith("/board") ||
    req.path.startsWith("/user") ||
    req.path === "/test" ||
    req.path === "/manifest.json"
  ) {
    return next();
  }

  const indexHtml = path.join(frontendBuildPath, "index.html");
  if (fs.existsSync(indexHtml)) {
    return res.sendFile(indexHtml);
  }

  // default fallback if no frontend build
  return res.status(404).send("Not Found");
});

server.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
