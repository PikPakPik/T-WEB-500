//Initialize the server and Prisma Client
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

//Use the router
app.use("/", require("./app/router/router"));

// Server listening
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
