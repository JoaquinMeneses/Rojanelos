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

export const TableAllSkills = ({ users }) => {
  const [selectedColor, setSelectedColor] = useState("warning");

  const rows = users;

  const columns = [
    {
      key: "username",
      label: "ROJANELO",
    },
    {
      key: "totalsLevels",
      label: "TOTAL LEVELS",
    },
    {
      key: "aviculture",
      label: "Aviculture",
    },
    {
      key: "beekeeping",
      label: "Beekeeping",
    },
    {
      key: "farming",
      label: "Farming",
    },
    {
      key: "forestry",
      label: "Forestry",
    },
    {
      key: "mining",
      label: "Mining",
    },
    {
      key: "ceramicist",
      label: "Ceramicist",
    },
    {
      key: "cooking",
      label: "Cooking",
    },
    {
      key: "granger",
      label: "Granger",
    },
    {
      key: "textiler",
      label: "Textiler",
    },
    {
      key: "winemaking",
      label: "Winemaking",
    },
    {
      key: "woodwork",
      label: "Woodwork",
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
          <TableColumn key={key}>{label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {rows.map(({ key, username, totalsLevels, skills }, index) => (
          <TableRow key={key} className={index < 5 ? "text-success" : ""}>
            {columns.map(({ key: columnKey }) => {
              if (columnKey === "username") {
                return <TableCell key={columnKey}>{username}</TableCell>;
              } else if (columnKey === "totalsLevels") {
                return <TableCell key={columnKey}>{totalsLevels}</TableCell>;
              } else {
                const skillLevel = skills.find(
                  (skill) => skill.name === columnKey
                );
                return (
                  <TableCell key={columnKey}>
                    {skillLevel ? skillLevel.level : "0"}
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
