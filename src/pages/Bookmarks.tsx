import { Text, Flex } from "@aws-amplify/ui-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import BookmarkCard from "../components/BookmarkCard";

type Bookmark = {
  title: string;
  url: string;
};

const Bookmarks = () => {
  const [bookmarks] = useState<Bookmark[]>(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });
  return (
    <>
      <div className="mt-6">
        <h3 className="text-xl font-semibold my-6">Your Bookmarks</h3>
        {bookmarks.length > 0 ? (
          <Flex direction="column">
            {bookmarks.map((bookmark, i) => (
              <BookmarkCard key={i} bookmark={bookmark} />
            ))}
          </Flex>
        ) : (
          <>
            <Text variation="info">You haven't created any bookmarks</Text>
            <Link to="/">Add Bookmark</Link>
          </>
        )}
      </div>
    </>
  );
};

export default Bookmarks;
