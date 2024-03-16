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
  Spinner,
} from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";

const Specks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
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

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: loadMoreData,
  });

  async function fetchData() {
    try {
      const response = await axios.get(
        `https://www.pixels-tools.somee.com/Speck/Page/${currentPage}`
      );
      setRows(response.data.listSpeck);
      setHasMore(response.data.totalPages > 1);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadMoreData() {
    try {
      const nextPage = currentPage + 1;
      const response = await axios.get(
        `https://www.pixels-tools.somee.com/Speck/Page/${nextPage}`
      );
      const newData = response.data.listSpeck;
      setRows((prevRows) => [...prevRows, ...newData]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < response.data.totalPages);
    } catch (error) {
      console.error("Error al cargar más datos:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Table
      isHeaderSticky
      className="p-3 h-[90vh]"
      aria-label="Specks de Rojanelos"
      baseRef={scrollerRef}
      bottomContent={hasMore ? <Spinner ref={loaderRef} color="white" /> : null}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody isLoading={isLoading} items={rows}>
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
