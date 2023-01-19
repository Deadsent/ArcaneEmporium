const {
  client,
  User
  // declare your model imports here
  // for example, User
} = require('./');

async function buildTables() {
  try {
    client.connect();
    console.log("Starting to drop tables")

    await client.query(`
      DROP TABLE IF EXISTS users;
    `)

    console.log("Finished dropping tables");

    console.log("Starting to create tables");

    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false
      );
    `)

    console.log("Finished creating tables");
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    const user1 = await User.createUser({username: "Deadsent", password: "Deadman2", isAdmin: true})
    console.log("Here is user1", user1)
    await User.createUser({
      username: "Jewel",
      password: "Canyon"
    });
    await User.createUser({
      username: "Cadence",
      password: "ofWater",
    });
    const allUsers = await User.getAllUsers()
    console.log("Here are all the users", allUsers)
    const userById = await User.getUserById({id: 2})
    console.log("Here is the user with ID 2", userById)
    const userByUsername = await User.getUserByUsername({username: "Cadence"})
    console.log("Here is the user with username Cadence", userByUsername)
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
