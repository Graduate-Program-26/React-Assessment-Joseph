import { Navbar } from "@/components/navbar";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        <Outlet />
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <p className="text-sm text-default-500">
          &copy; {new Date().getFullYear()} GitSearch. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
