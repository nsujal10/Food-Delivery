const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Food Delivery Backend API",
      version: "1.0.0",
      description: "Production-ready Food Delivery Backend with Auth, Cart, Orders, Payment, Reviews, and Delivery"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./src/routes/*.js"], // scans route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
