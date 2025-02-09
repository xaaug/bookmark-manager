import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Flex } from "@aws-amplify/ui-react";

const Header = () => {
  return (
    <header className="border-b py-[.8rem] px-[1.6rem]">
      <nav className="flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold">
          Manager
        </Link>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <Flex gap="small">
            <Link to="bookmarks">Bookmarks</Link>
            <UserButton />
          </Flex>
        </SignedIn>
      </nav>
    </header>
  );
};

export default Header;
