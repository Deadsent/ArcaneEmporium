const { getAllUsers, createUser, getUserByUsername } = require("../db/models/user");
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const usersRouter = require("express").Router();

usersRouter.use("/", (req, res, next) => {
  console.log("Request was made to /users");
  next();
});

usersRouter.post('/register', async (req, res, next) => {
  try {
      const {username, password} = req.body;
      const queriedUser = await getUserByUsername(username)
      if(queriedUser){
        res.status(401)
        next({
            name: "UserExistsError",
            message: "A user by that username already exists."
        })
      } else {
      const newUser = await createUser({
        username: username, 
        password: password
      })
      console.log("NEW USER LOG", newUser)
      if(!newUser){
        next({
            name: "USerCreationError",
            message: "There was a problem registering you. Please try again."
        })
      } else {
        const token = jwt.sign({
            id: newUser.id,
            username: newUser.username
        }, JWT_SECRET)
        console.log("TOKEN LOG", token) 
        res.send({
            newUser,
            message: "You're logged in!",
            token
        })
      }
    }
  } catch (error) {
      throw error
  }
})


usersRouter.get("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    const _user = await getUserByUsername({username})
    
    if(password !== _user.password || !_user) {
      res.status(401)
      next({error: "LoginError", message: "Invalid Username Or Password"})
    }
    
    delete _user.password;
    res.send(_user)
    
  } catch (error) {
    throw error 
  }
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
