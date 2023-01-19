// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  getUserById,
  getUserByUsername
};

async function getAllUsers() {
 try {
   const { rows } = await client.query(`
    SELECT * from users;
  `);

   return rows;
 } catch (error) {
  console.error("Error Getting All Users", error)
  throw error
 }
}

async function createUser({username, password, isAdmin}) {
  try {

    if(!isAdmin) isAdmin = false
   const {rows: [user]} = await client.query(`
      INSERT INTO users(username, password, "isAdmin")
      VALUES($1, $2, $3)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
    `, [username, password, isAdmin])

    console.log(user)
    return user
  } catch (error) {
    console.error("Error Creating A User", error)
    throw error
  }
}

async function getUserById({id}){
  try {
    const {rows: [user]} = await client.query(`
      SELECT * FROM users
      WHERE id = $1;
    `, [id])

    if(!user) return null
    delete user.password
    return user
  } catch (error) {
    console.error("Error getting user by ID", error)
    throw error
  }
}

async function getUserByUsername({username}) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *FROM users
        WHERE username=$1;
      `,
      [username]
    );

    return user;
  } catch (error) {
    console.error("Error Getting User By Username", error)
    throw error;
  }
};