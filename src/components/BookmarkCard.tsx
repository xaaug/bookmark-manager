import { Card, Link } from "@aws-amplify/ui-react";

type Bookmark = {
  title: string;
  url: string;
};

type Props = {
  bookmark: Bookmark;
};

const BookmarkCard: React.FC<Props> = ({ bookmark }) => {
  return (
    <Card variation="outlined">
      <Link href={bookmark.url} target="_blank">
        {bookmark.title}
      </Link>
    </Card>
  );
};

export default BookmarkCard;
