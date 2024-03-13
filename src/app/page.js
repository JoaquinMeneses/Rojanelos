"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableHeader, TableColumn, TableBody } from "@nextui-org/react";

export default function Home() {
  const [watchlist, setWatchlist] = useState([]);

  const getWatchlist = async () => {
    const body = { token: "rPaIN6CpP7Bf2781yXO3lFiVLaPNyXHIUcOSPJ_heLOn" };
    try {
      const res = await axios.post(
        "https://pixels-server.pixels.xyz/v1/guilds/me",
        body
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWatchlist();
  }, []);

  return (
    <>
      <Table aria-label="Example empty table">
        <TableHeader>
          <TableColumn>Rojanelo</TableColumn>
          <TableColumn>Skills</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No hay jugadores"}>{[]}</TableBody>
      </Table>
    </>
  );
}
