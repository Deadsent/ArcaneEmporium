const { getAllUsers } = require("../db/models/user");

const usersRouter = require("express").Router();

usersRouter.use("/", (req, res, next) => {
  console.log("Request was made to /users");
  next();
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send(users);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
