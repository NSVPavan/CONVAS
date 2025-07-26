const swaggerJSDoc = require('swagger-jsdoc');
const { PORT } = process.env;

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'CoSketch REST APIs documentation',
    version: '1.0.0',
    description: 'Documentation for CoSketch REST APIs',
  },
  servers: [
    {
      url: `http://localhost:${PORT}`, // Change this to your application's URL
      description: 'Local server',
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'], // Adjust the path to where your route files are located
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
