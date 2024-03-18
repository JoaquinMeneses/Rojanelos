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

const INITIAL_VISIBLE_COLUMNS = ["landOwner", "landname", "class", "entitis"];

export default function TableLands() {
  const columns = [
    { name: "ROJANELO", uid: "landOwner", sortable: true },
    { name: "LAND", uid: "landname", sortable: true },
    { name: "TIPO", uid: "class", sortable: true },
    { name: "PARCELAS", uid: "soilCount", sortable: true },
    { name: "ÁRBOLES", uid: "treeCount", sortable: true },
    { name: "INDUSTRIAS", uid: "entitis", sortable: true },
  ];

  const [users, setUsers] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "entitis",
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
      const response = await axios.get(
        `https://www.pixels-tools.somee.com/Lands/List`
      );
      setUsers(response.data);
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
        `https://www.pixels-tools.somee.com/Lands/List`
      );
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
        users.landOwner.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [users, filterValue]);

  const items = useMemo(() => {
    return [...filteredItems];
  }, [currentPage, filteredItems]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "entitis":
        return (
          <div className="flex">
            {cellValue.map((entity) => (
              <div key={entity.idEnt} className="w-8 h-8">
                <img
                  src={entity.img}
                  alt={entity.name}
                  className="w-full h-full object-cover object-left"
                />
              </div>
            ))}
          </div>
        );
      case "class":
        return cellValue.charAt(0).toUpperCase() + cellValue.slice(1);

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
