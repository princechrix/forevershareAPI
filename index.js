require("dotenv").config();
const express = require("express");
const cors = require('cors')
const app = express();
const userRouter = require("./api/users/user.router");

app.use(express.json());

app.use(cors())

app.use("/api", userRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server is Up and running at ", process.env.SERVER_PORT);
});
