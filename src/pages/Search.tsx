import { title } from "@/components/primitives";
import SearchInput from "@/features/userSearch/searchInput";
import DefaultLayout from "@/layouts/default";

export default function SearchPage() {
  return (
    <DefaultLayout>
      <SearchInput />
    </DefaultLayout>
  );
}
