import React from 'react';
import PropTypes from 'prop-types';
import { fetchBookList } from "../../actions";
import { isEmpty } from "../../utils";
import { BookView } from "../BookView";

const BooksSuspense = (props) => {
    if (!props.books) {
        throw fetchBookList();
    }

    if(isEmpty(props.books)) {
        return <p className="h5">本が見つかりませんでした</p>;
    }
    return props.books.map((book) => {
        return <BookView book={book} link={`/books/${book.id}`} key={book.id} />
    });
}

BooksSuspense.propTypes = {
    books: PropTypes.array
}

export default BooksSuspense;