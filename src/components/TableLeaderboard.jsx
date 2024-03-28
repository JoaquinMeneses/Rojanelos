"use client";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "@nextui-org/react";
import { Filter, Search } from "lucide-react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { apiUrl } from "@/utils/apiUrl";

const INITIAL_VISIBLE_COLUMNS = ["userName", "allSkills"];

export default function TableLeaderboard() {
  const columns = [
    { name: "ROJANELO", uid: "userName", sortable: true },
    { name: "ALL SKILLS", uid: "allSkills", sortable: true },
    { name: "AVICULTURE", uid: "aviculture", sortable: true },
    { name: "BEEKEEPING", uid: "beekeeping", sortable: true },
    { name: "FARMING", uid: "farming", sortable: true },
    { name: "FORESTRY", uid: "forestry", sortable: true },
    { name: "MINING", uid: "mining", sortable: true },
    { name: "SLUGGER", uid: "slugger", sortable: true },
    { name: "CERAMICIST", uid: "ceramicist", sortable: true },
    { name: "COOKING", uid: "cooking", sortable: true },
    { name: "GRANGER", uid: "granger", sortable: true },
    { name: "PETCARE", uid: "petcare", sortable: true },
    { name: "REDIFFERENTIATOR", uid: "redifferentiator", sortable: true },
    { name: "TEXTILER", uid: "textiler", sortable: true },
    { name: "WINEMAKING", uid: "winemaking", sortable: true },
    { name: "WOODWORK", uid: "woodwork", sortable: true },
    { name: "BUSINESS", uid: "business", sortable: true },
  ];

  const [users, setUsers] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "allSkills",
    direction: "descending",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: loadMoreData,
  });

  async function fetchData() {
    try {
      const response = await axios.get(`${apiUrl}/rojanelos`);
      setUsers(response.data.rojanelos);
      setHasMore(response.data.totalPages > 1);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadMoreData() {
    try {
      const nextPage = currentPage + 1;
      const response = await axios.get(`${apiUrl}/rojanelos/?page=${nextPage}`);
      const newData = response.data.listSpeck;
      setUsers((prevUsers) => [...prevUsers, ...newData]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < response.data.totalPages);
    } catch (error) {
      console.error("Error al cargar más datos:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((users) =>
        users.userName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [users, filterValue]);

  const items = useMemo(() => {
    return [...filteredItems];
  }, [currentPage, filteredItems]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      let first, second;

      switch (sortDescriptor.column) {
        case "allSkills":
        case "aviculture":
        case "beekeeping":
        case "farming":
        case "forestry":
        case "mining":
        case "slugger":
        case "ceramicist":
        case "cooking":
        case "granger":
        case "petcare":
        case "redifferentiator":
        case "textiler":
        case "winemaking":
        case "woodwork":
          first = Math.max(
            ...a[sortDescriptor.column].map((skill) => skill.level)
          );
          second = Math.max(
            ...b[sortDescriptor.column].map((skill) => skill.level)
          );
          break;
        default:
          first = a[sortDescriptor.column];
          second = b[sortDescriptor.column];
      }

      let cmp =
        (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }

      return cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "allSkills":
      case "aviculture":
      case "beekeeping":
      case "farming":
      case "forestry":
      case "mining":
      case "slugger":
      case "ceramicist":
      case "cooking":
      case "granger":
      case "petcare":
      case "redifferentiator":
      case "textiler":
      case "winemaking":
      case "woodwork":
        return cellValue.map((skill, index) => (
          <p key={index}>{skill.level}</p>
        ));
      default:
        return cellValue;
    }
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setCurrentPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setCurrentPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            autoComplete="off"
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar Rojanelo..."
            startContent={<Search />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<Filter className="text-small" />}
                  variant="flat"
                >
                  Filtros
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Filtros por columnas"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    users.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <Table
      isStriped
      className="p-2"
      aria-label="Specks de Rojanelos"
      isHeaderSticky
      classNames={{
        wrapper: "h-[80vh]",
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
      baseRef={scrollerRef}
      bottomContent={hasMore ? <Spinner ref={loaderRef} color="white" /> : null}
    >
      <TableHeader isLoading={isLoading} columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Cargando Rojanelos..."} items={sortedItems}>
        {(item) => (
          <TableRow key={item.userID}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
