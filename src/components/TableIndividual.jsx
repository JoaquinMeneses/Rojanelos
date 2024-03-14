"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export const TableIndividual = ({ users, filter }) => {
  const [selectedColor, setSelectedColor] = useState("warning");

  const getSkillLevel = (user, skillName) => {
    const skill = user.skills.find((skill) => skill.name === skillName);
    return skill ? skill.level : 0;
  };

  const sortedUsers = [...users].sort((a, b) => {
    const levelA = getSkillLevel(a, filter);
    const levelB = getSkillLevel(b, filter);
    return levelB - levelA;
  });

  const rows = sortedUsers;

  const columns = [
    {
      key: "username",
      label: "ROJANELO",
    },
    {
      key: filter,
      label: filter,
    },
  ].map((column) => ({
    ...column,
    label: column.label.toUpperCase(),
  }));

  return (
    <Table
      aria-label="Leaderboard of all skills"
      color={selectedColor}
      selectionMode="single"
      defaultSelectedKeys={[""]}
    >
      <TableHeader>
        {columns.map(({ key, label }) => (
          <TableColumn key={key} className="w-1/2">
            {label}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {rows.map(({ key, username, skills }, index) => (
          <TableRow key={key} className={index < 5 ? "text-success" : ""}>
            {columns.map(({ key: columnKey }) => {
              if (columnKey === "username") {
                return <TableCell key={columnKey}>{username}</TableCell>;
              } else {
                // Obtener el nivel de la habilidad para el usuario actual
                const skillLevel = getSkillLevel({ skills }, filter);
                return (
                  <TableCell key={columnKey}>
                    {skillLevel ? skillLevel : "0"}
                  </TableCell>
                );
              }
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
