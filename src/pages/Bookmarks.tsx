import { Text, Flex } from "@aws-amplify/ui-react";
import { useState } from "react";
import BookmarkCard from "../components/BookmarkCard";

type Bookmark = {
  title: string;
  url: string;
};

const Bookmarks = () => {
  const [bookmarks] = useState<Bookmark[]>([
    {
      title: "CSS Font Pairings Guide",
      url: "https://www.canva.com/learn/the-ultimate-guide-to-font-pairing/",
    },
    {
      title: "Google Fonts Pairing Tool",
      url: "https://fonts.google.com/knowledge/pairing",
    },
    {
      title: "Font Pair – Free Typography Combos",
      url: "https://www.fontpair.co/",
    },
    {
      title: "Best Google Font Combinations",
      url: "https://www.creativebloq.com/inspiration/20-perfect-pairings-of-google-fonts",
    },
    {
      title: "A Guide to Font Pairing",
      url: "https://www.smashingmagazine.com/2010/11/best-practices-of-combining-typefaces/",
    },
  ]);
  return (
    <>
      <div className="mt-6">
        <h3 className="text-xl font-semibold my-6">Your Bookmarks</h3>
        {bookmarks.length ? (
          <Flex direction="column">
            {bookmarks.map((bookmark, i) => (
              <BookmarkCard key={i} bookmark={bookmark} />
            ))}
          </Flex>
        ) : (
          <Text variation="info">You haven't created any bookmarks</Text>
        )}
      </div>
    </>
  );
};

export default Bookmarks;
