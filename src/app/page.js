"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button } from "@nextui-org/react";
import { UserPlus } from "lucide-react";
import { apiUrl } from "@/utils/apiUrl";
import Leaderboards from "@/components/Leaderboards";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [loading, setLoading] = useState(false);

  const sendUser = async (userParam) => {
    let user;
    const readUser = async () => {
      try {
        const res = await axios.get(`${apiUrl}/players/${userParam}`);
        user = res.data.player;
        setSearchUser("");
        return user;
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 500) {
          try {
            const res = await axios.get(
              `http://www.pixels-tools.somee.com/Actualizar/${userParam}`
            );
            user = res.data.player;
            setSearchUser("");
            return user;
          } catch (error) {
            console.error(error);
            return null;
          }
        }
      }
    };
    user = await readUser();
    if (!user) return;
    const { _id, username, levels } = user;
    const userBody = { key: _id, _id: _id, username: username, levels: levels };
    const uploadUser = async () => {
      try {
        await axios.post(`${apiUrl}/rojanelos/create`, userBody);
        setLoading(!loading);
        setSearchUser("");
      } catch (error) {
        console.error(error);
      }
    };
    uploadUser();
    setSearchUser("");
  };

  const getUsers = async () => {
    try {
      const res = await axios.get(`${apiUrl}/rojanelos`);
      setUsers(res.data.players);
      console.log(res.data.players);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [loading]);

  const handleSearch = (event) => {
    event.preventDefault();
    sendUser(searchUser);
  };

  return (
    <div className="p-3 flex flex-col gap-3">
      <form className="flex w-full items-center gap-3" onSubmit={handleSearch}>
        <Input
          size="sm"
          label="Agregar Rojanelo"
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
          <UserPlus />
        </Button>
      </form>
      <Leaderboards users={users} />
    </div>
  );
}
