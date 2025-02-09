import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="px-6 lg:max-w-[60%] mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
