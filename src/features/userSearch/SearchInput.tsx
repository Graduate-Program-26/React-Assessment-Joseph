import { Button, Input } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { SearchIcon } from "@/components/icons";
import { useAppStore } from "@/store/store";

export default function SearchInput() {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useAppStore();

  function handleSearch() {
    if (searchQuery) {
      const params = new URLSearchParams();

      params.append("query", searchQuery);
      navigate(`/search?${params.toString()}`);
    }
  }

  return (
    <>
      <div className="w-full ">
        <Input
          aria-label="Search"
          classNames={{
            inputWrapper: "bg-default-100",
            input: "text-sm",
          }}
          endContent={
            <Button
              className=""
              radius="sm"
              size="sm"
              onPress={() => handleSearch()}
            >
              <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            </Button>
          }
          labelPlacement="outside"
          placeholder="Search for a github user..."
          type="search"
          value={searchQuery}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
            event.key === "Enter" && handleSearch()
          }
          onValueChange={(value: string) => setSearchQuery(value)}
        />
      </div>
    </>
  );
}
