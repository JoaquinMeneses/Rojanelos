import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

export const Tables = ({ users, filter }) => {
  const rows = users;

  const columns = [
    {
      key: "username",
      label: "ROJANELO",
    },
    {
      key: "skills",
      label: "LVL SKILL",
    },
  ];

  return (
    <Table aria-label="Leaderboard de Rojanelos" isStriped>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell key={columnKey}>
                {columnKey === "skills"
                  ? filter === "all-skills"
                    ? item.levels.map((skillsObject, index) => {
                        const totalPoints = Object.values(skillsObject).reduce(
                          (acc, { level }) => acc + level,
                          0
                        );
                        return (
                          <div key={index} className="flex">
                            <p>{totalPoints}</p>
                          </div>
                        );
                      })
                    : item.levels
                        .filter((skillsObject) =>
                          Object.keys(skillsObject).includes(filter)
                        )
                        .map((filteredSkill, index) => (
                          <div key={index} className="flex">
                            <p>{filteredSkill[filter].level}</p>
                          </div>
                        ))
                  : getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
