import { Input } from "@heroui/input";

import { SearchIcon } from "@/components/icons";
import { title } from "@/components/primitives";

export default function SearchInput() {
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
        />
      </div>
    </div>
  );
}
