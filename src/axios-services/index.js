import axios from 'axios';

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:


  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }

  export async function registerUser({username, password}) {
    try {
      const {data: user} = await axios.post('/api/users/register', {
        username: username,
        password: password
      })
      console.log(user)
      return user
    } catch (error) {
      console.error("Error in registerUser", error)
      throw error
    }

  }

  export async function loginUser({username, password}) {
    try {
      const {data: user} = await axios.post('/api/users/login', {
        username: username,
        password: password
      })
      return user 
    } catch (error) {
      console.error("Error in longUser", error)
      throw error
    }
  }


export async function getAPIHealth() {
  try {
    const { data } = await axios.get('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}
