const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Your username is required"],
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    firstName: {
        type: String,
        required: [true, "Your firstname is required"],
    },
    role: {
        type: String,
        required: [true, "Role is required"],
    },
    lastName: {
        type: String,
        required: [true, "Your lastname is required"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);