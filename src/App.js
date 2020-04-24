import React, { useState, useRef, useCallback } from "react";
import "./App.css";
import UseBookSearch from "./hooks/use-books-search.hook";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { books, hasMore, loading, error } = UseBookSearch({
    query,
    pageNumber,
  });

  const observer = useRef();

  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        console.log({ entries });

        if (entries[0].isIntersecting && hasMore) {
          console.log("visible");

          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleChange = ({ target }) => {
    setQuery(target.value);
    setPageNumber(1);
  };

  return (
    <div className="App">
      <input
        type="search"
        className="search__input"
        onChange={handleChange}
        value={query}
      />

      <div className="books">
        {books.map((book, index) => {
          if (books.length === index + 1)
            return (
              <div key={book} ref={lastBookElementRef}>
                {book}{" "}
              </div>
            );
          else return <div key={book}>{book}</div>;
        })}
      </div>

      <div>{loading && "Loading..."}</div>
      <div>{error && "error"}</div>
    </div>
  );
}

export default App;
