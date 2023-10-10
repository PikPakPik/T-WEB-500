//Initialize the server and Prisma Client
const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

//Use the router
app.use("/", require("./app/router/router"));

// Server listening
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3000");
});
