import { Card, Flex, Link } from "@aws-amplify/ui-react";

import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

type Bookmark = {
  title: string;
  url: string;
  _id: Id<"bookmarks">;
};

type Props = {
  bookmark: Bookmark;
};

const BookmarkCard: React.FC<Props> = ({ bookmark }) => {
  const deleteBookmark = useMutation(api.bookmarks.deleteBookmark);

  const handleClick = async (id: Id<"bookmarks">) => {
    await deleteBookmark({ id });
  };

  return (
    <Card variation="outlined">
      <Link
        href={bookmark.url}
        target="_blank"
        fontSize="1.5rem"
        fontWeight="semi-bold"
      >
        {bookmark.title}
      </Link>
      <Flex marginTop="1rem">
        <Link
          onClick={() => handleClick(bookmark._id)}
          fontSize=".9rem"
          color="blue"
          textDecoration="underline"
        >
          Delete
        </Link>
        {/* <Link onClick={} >Delete</Link> */}
      </Flex>
    </Card>
  );
};

export default BookmarkCard;
