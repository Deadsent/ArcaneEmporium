const { getAllUsers, createUser, getUserByUsername } = require("../db/models/user");

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

usersRouter.post('/register', async (req, res, next) => {
    try {
        const {username, password} = req.body;

        const newUser = await createUser({username, password})

        res.send(newUser)
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

module.exports = usersRouter;
