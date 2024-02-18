"use client";
import { debounce } from "@/lib/utils";
import useDashboardStore from "@/store/dashboard";
import { SearchIcon } from "lucide-react";
import React, { useCallback } from "react";

const Search = () => {
  const { setSearchQuery } = useDashboardStore();
  const debouncedFn = useCallback(
    debounce((query: string) => setSearchQuery(query), 500),
    []
  );
  const onChangeHandler = (query: string) => debouncedFn(query);
  return (
    <div className="flex flex-row items-center border p-2 rounded-sm">
      <SearchIcon className="w-4 h-4 mx-4" />
      <input
        type="text"
        placeholder="Search boards and playgrounds"
        className="outline-none bg-transparent text-[14px] flex-1 w-[400px]"
        onChange={(ev) => onChangeHandler(ev.target.value)}
      />
    </div>
  );
};

export default Search;
