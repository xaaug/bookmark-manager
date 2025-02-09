import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="px-6">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
