const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Board API",
      version: "1.0.0",
      description: "Job Board API with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "Authorization",
        scheme: "bearer",
        in: "header",
      },
    },
  },
  tags: [
    { name: "Advertissements" },
    { name: "Users" },
    { name: "Company" },
    { name: "Applications" },
    { name: "Superman" },
  ],
  apis: ["./app/router/swaggerdoc.js"], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
