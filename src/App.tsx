import { Route, Routes } from "react-router-dom";

import SearchPage from "./pages/Search";

function App() {
  return (
    <Routes>
      <Route element={<SearchPage />} path="/" />
    </Routes>
  );
}

export default App;
