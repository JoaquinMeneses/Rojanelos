"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button } from "@nextui-org/react";
import { Search } from "lucide-react";
import { apiUrl } from "@/utils/apiUrl";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");

  const sendUser = async (user) => {
    const createUser = async () => {
      try {
        const res = await axios.get(`https://pixels-server.pixels.xyz/v1/player?username=${user}`);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };
    createUser()
  };

  const getUsers = async () => {
    try {
      const res = await axios.get(`${apiUrl}/rojanelos`);
      setUsers(res.data.players);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    sendUser(searchUser);
  };

  return (
    <div className="p-3 flex flex-col gap-3">
      <form className="flex w-full items-center gap-3" onSubmit={handleSearch}>
        <Input
          size="sm"
          label="Nickname"
          value={searchUser}
          onValueChange={(value) => setSearchUser(value)}
        />
        <Button
          className="p-2"
          type="submit"
          isIconOnly
          size="sm"
          radius="full"
          color="primary"
        >
          <Search />
        </Button>
      </form>
      {users.length > 0 &&
        users.map(({ _id, username, skills }) => (
          <div key={_id}>{username}</div>
        ))}
    </div>
  );
}
