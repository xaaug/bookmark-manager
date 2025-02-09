import { useState } from "react";

import { Button, Flex, Text } from "@aws-amplify/ui-react";
import InputField from "../components/InputField";
import BookmarkCard from "../components/BookmarkCard";

type Bookmark = {
  title: string;
  url: string;
};

const Home = () => {
  const [titleValue, setTitleValue] = useState<string>("");
  const [urlValue, setUrlValue] = useState<string>("");

  const [urlError, setUrlError] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<boolean>(false);

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
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

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
    if (titleValue.trim().length < 2) {
      setTitleError(true);
      return;
    }
    setTitleError(false);
  };

  const handleUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUrlValue(value);
    const isValidUrl = (url: string): boolean => {
      try {
        new URL(url);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    };

    if (isValidUrl(value)) {
      setUrlError(false);
    } else {
      setUrlError(true);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (titleValue.trim().length < 2) {
      setTitleError(true);
      return;
    } else if (urlValue.trim().length < 2) {
      setUrlError(true);
      return;
    }

    setTitleError(false);
    setUrlError(false);

    setBookmarks((prev) => [{ title: titleValue, url: urlValue }, ...prev]);

    setTitleValue("");
    setUrlValue("");
  };

  return (
    <>
      <div>
        <h3 className="text-xl font-semibold my-6">New Bookmark</h3>
        <Flex direction="column" gap="small" as="form">
          <InputField
            handleInput={handleInput}
            label="Title"
            id="title"
            isRequired
            value={titleValue}
          />
          {titleError && (
            <Text as="span" fontSize="small" color="font.error">
              Kindly provide a valid title
            </Text>
          )}

          <InputField
            handleInput={handleUrl}
            label="URL"
            id="link"
            type="url"
            isRequired
            hasError={urlError}
            value={urlValue}
          />
          {urlError && (
            <Text as="span" fontSize="small" color="font.error">
              Kindly provide a valid URL in the correct format{" "}
              https://google.com
            </Text>
          )}
          <Button
            variation="primary"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Add Bookmark
          </Button>
        </Flex>
      </div>

      <div>
        <h3 className="text-xl font-semibold my-6">Recent Bookmarks</h3>
        <Flex direction="column">
          {bookmarks.length > 0 ? (
            bookmarks.map((bookmark, i) => (
              <BookmarkCard key={i} bookmark={bookmark} />
            ))
          ) : (
            <Text variation="info">No Recent Bookmarks</Text>
          )}
        </Flex>
      </div>
    </>
  );
};

export default Home;
