"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
const Specks = () => {
  const [selectedColor, setSelectedColor] = useState("primary");
  const [totalPages, setTotalPages] = useState([]);
  const [rows, setRows] = useState([]);
  const columns = [
    {
      key: "userName",
      label: "Rojanelo",
    },
    {
      key: "soilCount",
      label: "Parcelas",
    },
    {
      key: "treeCount",
      label: "Árboles",
    },
    {
      key: "listEntitis",
      label: "Industrias",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.pixels-tools.somee.com/Speck/Page/1"
        );
        setTotalPages(response.data.totalPages);
        setRows(response.data.listSpeck);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Table
      className="p-3"
      aria-label="Specks de Rojanelos"
      color={selectedColor}
      selectionMode="single"
      defaultSelectedKeys={[]}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.userID}>{column.label}</TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.userID}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "listEntitis" ? (
                  <div className="flex">
                    {item.listEntitis.map((industry) => (
                      <div key={industry.idEnt} className="w-8 h-8 ">
                        <img
                          src={industry.img}
                          alt={industry.name}
                          className="w-full h-full object-cover object-left"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  item[columnKey]
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Specks;
