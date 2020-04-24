import { useEffect, useState } from "react";
import axios from "axios";

const UseBookSearch = ({ query, pageNumber }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel;

    const getBooks = async () => {
      try {
        const requestApi = axios({
          method: "GET",
          url: "http://openlibrary.org/search.json",
          params: { q: query, page: pageNumber },
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });

        const response = await requestApi;

        console.log({ response });

        const { docs } = response.data;

        setBooks((previousBooks) => {
          const newBooks = [
            ...previousBooks,
            ...docs.map((book) => book.title),
          ];

          const set = [...new Set(newBooks)];

          setHasMore(docs.length > 0);
          setLoading(false);

          // console.log({ newBooks, set });
          return set;
        });
      } catch (error) {
        if (axios.isCancel(error)) return;

        setError(true);
      }
    };

    getBooks();

    return () => cancel();
  }, [query, pageNumber]);

  return {
    loading,
    error,
    books,
    hasMore,
  };
};

export default UseBookSearch;
