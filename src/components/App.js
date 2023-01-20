import React, { useState, useEffect } from "react";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth, getUsers } from "../axios-services";
import "../style/App.css";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };
    const fetchAllUsers = async () => {
      const data = await getUsers();
      setUsers(data)
    };
    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    fetchAllUsers();
    getAPIStatus();
  }, []);

  return (
    <div className="app-container">
      <h1>Hello, to the World!</h1>
      <p>API Status: {APIHealth}</p>
      <p>There are {users.length} customers.</p>
    </div>
  );
};

export default App;
