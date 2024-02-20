require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./api/users/user.router");
const topicRouter = require("./api/topics/topic.router");

app.use(express.json());

app.use(cors());

app.use("/api", userRouter);
app.use("/api", topicRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server is Up and running at ", process.env.SERVER_PORT);
});
