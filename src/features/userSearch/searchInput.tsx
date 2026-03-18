import { Input } from "@heroui/input";

import { SearchIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { useAppStore } from "@/store/store";

export default function SearchInput() {
  const { searchQuery, setSearchQuery } = useAppStore();

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
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          }
          labelPlacement="outside"
          placeholder="Search for a github user..."
          type="search"
          value={searchQuery}
          onValueChange={(value) => setSearchQuery(value)}
        />
      </div>
    </div>
  );
}
