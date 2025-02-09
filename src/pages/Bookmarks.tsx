import { Text, Flex } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import BookmarkCard from "../components/BookmarkCard";

const Bookmarks = () => {
const bookmarks = useQuery(api.bookmarks.get)
  return (
    <>
      <div className="mt-6">
        <h3 className="text-xl font-semibold my-6">Your Bookmarks</h3>
        {typeof bookmarks !== 'undefined' && bookmarks.length < 0 ? 
          <>
          <Text variation="info">You haven't created any bookmarks</Text>
          <Link to="/">Add Bookmark</Link>
          </> : null
        }
        {typeof bookmarks !== 'undefined' && bookmarks.length > 0 ? (
          <Flex direction="column">
            {bookmarks.slice().reverse()?.map((bookmark, i) => (
              <BookmarkCard key={i} bookmark={bookmark} />
            ))}
          </Flex>
        ) : (
          <>
            <Text variation="info">Loading....</Text>
          </>
        )}
      </div>
    </>
  );
};

export default Bookmarks;
