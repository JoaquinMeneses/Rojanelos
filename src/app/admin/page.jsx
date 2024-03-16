"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { apiUrl } from "@/utils/apiUrl";

const App = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingCount, setLoadingCount] = useState(0);

  async function loadWatchlist() {
    try {
      const response = await axios.get(`${apiUrl}/rojanelos/watchlist`);
      setWatchlist(response.data.rojanelos);
      console.log(response.data.rojanelos);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadWatchlist();
  }, []);

  async function sendUsers(users) {
    try {
      setLoadingCount(users.length); // Establecer el contador de usuarios a cargar
      for (const user of users) {
        await axios.post(`${apiUrl}/rojanelos/create`, {
          userID: user.userID,
        });
        console.log("Jugador cargado: " + user.userID);
        setLoadingCount((prevCount) => prevCount - 1); // Decrementar el contador después de cargar un usuario
      }
      const userIDs = users.map((user) => user.userID);
      setUsers(userIDs);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="grid place-content-center">
      <Button color="primary" onClick={() => sendUsers(watchlist)}>
        Cargar Usuarios
      </Button>
      <p>Usuarios Cargando: {loadingCount}</p>
      {users.map((userID) => (
        <div key={userID}>
          <p>User ID: {userID}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
