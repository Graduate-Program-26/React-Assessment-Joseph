import { Outlet } from "react-router-dom";

import { Navbar } from "@/components/navbar";
import AppBreadcrumbs from "@/components/AppBreadcrumbs";

export default function DefaultLayout() {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-4">
        <AppBreadcrumbs />
        <Outlet />
      </main>
    </div>
  );
}
