import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import SearchPage from "./pages/Search";
import SearchResultsPage from "./pages/Results";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<SearchPage />} path="/" />
        <Route element={<SearchResultsPage />} path="/results" />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
