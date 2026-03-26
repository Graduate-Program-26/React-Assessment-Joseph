import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import SearchPage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import DefaultLayout from "./layouts/default";
import { useAuth } from "./hooks/useAuth";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Dashboard from "./pages/DashboardPage";

const queryClient = new QueryClient();

function App() {
  useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<DefaultLayout />} path="/">
          <Route index element={<SearchPage />} />
          <Route element={<SearchResultsPage />} path="/search" />
          <Route element={<UserDetailsPage />} path="/user/:username" />
          <Route element={<ProtectedRoute />} path="/dashboard">
            <Route index element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
