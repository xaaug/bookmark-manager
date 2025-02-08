import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./components/Layout";
import Bookmarks from "./pages/Bookmarks";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="bookmarks" element={<Bookmarks />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
