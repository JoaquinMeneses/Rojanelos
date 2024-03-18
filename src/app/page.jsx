"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "@/utils/apiUrl";

const App = () => {
  const [totalRojanelos, setTotalRojanelos] = useState(0);
  const [totalWatchlist, setTotalWatchlist] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/rojanelos/watchlist`);
        setTotalRojanelos(response.data.totalRojanelos);
        setTotalWatchlist(response.data.totalWatchlist);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid place-content-center">
      <p>
        Protectores de Felpu y amantes del buen mate. $RON HOLDERS. Pixels
        Lovers.
      </p>
      <div>
        <p>Rojanelos en la Guild: {totalRojanelos}</p>
        <p>Rojanelos en la Watchlist: {totalWatchlist}</p>
      </div>
      <p>Tamos laburando esta seccion aun :D</p>
    </div>
  );
};

export default App;
