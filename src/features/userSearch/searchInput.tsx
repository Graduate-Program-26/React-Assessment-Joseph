import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";

import { SearchIcon } from "@/components/icons";
import { useAppStore } from "@/store/store";
import { title } from "@/components/primitives";

export default function SearchInput() {
  const { searchQuery, setSearchQuery } = useAppStore();
  const navigate = useNavigate();

  function handleSearch() {
    navigate(`/results?`);
  }

  return (
    <div className="w-full h-full flex flex-col flex-grow place-content-center place-items-center gap-4">
      <div className={`${title({ color: "violet" })}`}>GitSearch</div>

      <div className="w-full max-w-2xl mb-50">
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
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          onValueChange={(value) => setSearchQuery(value)}
        />
      </div>
    </div>
  );
}
