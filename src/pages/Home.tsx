import { useState } from "react";

import { Button, Flex, Text } from "@aws-amplify/ui-react";
import InputField from "../components/InputField";
import BookmarkCard from "../components/BookmarkCard";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const Home = () => {
  const [titleValue, setTitleValue] = useState<string>("");
  const [urlValue, setUrlValue] = useState<string>("");

  const [urlError, setUrlError] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<boolean>(false);

  const bookmarks = useQuery(api.bookmarks.get);
  const addBookmark = useMutation(api.bookmarks.addBookmark);

  // const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  // const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
  //   const savedBookMarks = localStorage.getItem("bookmarks");
  //   return savedBookMarks ? JSON.parse(savedBookMarks) : [];
  // });

  // useEffect(() => {
  //   // localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  // }, [bookmarks]);

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return false;
      }
    };

    if (isValidUrl(value)) {
      setUrlError(false);
    } else {
      setUrlError(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
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

    // setBookmarks((prev) =>
    //   bookmarks.length > 0
    //     ? [{ title: titleValue, url: urlValue }, ...prev]
    //     : [{ title: titleValue, url: urlValue }],
    // );

    await addBookmark({ title: titleValue, url: urlValue });

    setTitleValue("");
    setUrlValue("");
  };

  const recentBookmarks = bookmarks?.slice().reverse()?.slice(0, 5);

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
          {!recentBookmarks ? (
            <Text variation="info">Loading...</Text>
          ) : recentBookmarks.length === 0 ? (
            <Text variation="info">No Recent Bookmarks</Text>
          ) : (
            recentBookmarks.map((bookmark) => (
              <BookmarkCard key={bookmark._id} bookmark={bookmark} />
            ))
          )}
        </Flex>
      </div>
    </>
  );
};

export default Home;
