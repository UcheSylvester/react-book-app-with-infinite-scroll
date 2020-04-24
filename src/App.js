import React, { useState, useRef, useCallback } from "react";
import "./App.css";
import UseBookSearch from "./hooks/use-books-search.hook";
import BookCard from "./book-card/book-card.component";

export const shuffleString = (string) => {
  var arr = string.split(""); // Convert String to array

  arr.sort(() => 0.5 - Math.random());

  string = arr.join(""); // Convert Array to string
  return string; // Return shuffled string
};

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
        {books.map((book, idx) => {
          if (books.length === idx + 1)
            return (
              <BookCard
                key={shuffleString(book.title)}
                ref={lastBookElementRef}
                {...book}
              />
            );
          else return <BookCard key={shuffleString(book.title)} {...book} />;
        })}
      </div>

      <div>{loading && "Loading..."}</div>
      <div>{error && "error"}</div>
    </div>
  );
}

export default App;
