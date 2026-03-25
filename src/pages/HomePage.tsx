import SearchInput from "@/features/userSearch/SearchInput";
import { title } from "@/components/primitives";

export default function SearchPage() {
  return (
    <>
      <div className="w-full h-full flex flex-col flex-grow place-content-center place-items-center gap-4 ">
        <div className={`${title({ color: "violet" })}`}>GitSearch</div>
        <div className="mb-50 w-full max-w-2xl">
          <SearchInput />
        </div>
      </div>
    </>
  );
}
