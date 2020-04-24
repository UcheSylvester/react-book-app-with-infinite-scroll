import React, { forwardRef } from "react";

import "./book-card.styles.css";

const BookCard = forwardRef((props, ref) => {
  const { title, author_name, publish_date, ...otherProps } = props;

  return (
    <div className="book-card" {...otherProps} ref={ref}>
      <h3 className="title">{title}</h3>

      {author_name?.length ? <p className="name">{author_name[0]}</p> : null}

      {publish_date?.length ? <p className="name">{publish_date[0]}</p> : null}
    </div>
  );
});

export default BookCard;
