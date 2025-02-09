import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b py-[.8rem] px-[1.6rem]">
      <nav className="flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold">
          Manager
        </Link>
        <Link to="bookmarks">Bookmarks</Link>
      </nav>
    </header>
  );
};

export default Header;
