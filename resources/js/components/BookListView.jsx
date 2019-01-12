import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchBookList } from "../actions";
import { store } from "../store";
import { isEmpty } from "../utils";

import { ConnectedGenres } from "../containers";
import { Search } from "./Search";
import { Loading } from "./shared/Loading";
import { BookView } from "./BookView";
import { ISBNModal } from "./shared/book/ISBNModal";

class BookListView extends Component {
    constructor(props) {
        super(props);

        this.state = { q: "" };
        this.handleSubmitSearchText = this.handleSubmitSearchText.bind(this);
    }

    componentDidMount() {
        store.dispatch(fetchBookList());
    };

    handleSubmitSearchText(q) {
        this.setState({ q: q }); // 現状stateに入れる必要はないが、ジャンルでの絞り込みも始めた時に必要になりそうなので
        store.dispatch(fetchBookList({ q: q }));
    }

    render() {
        const books = this.props.books;
        if(isEmpty(books)) {
            return <Loading />;
        }

        const booksInfo = books.map((book, i) => {
            return <BookView book={book} link={`/books/${book.id}`} key={i} />
        });

        const bookList = [];
        for(let index = 0, key = booksInfo.length ; index < booksInfo.length; index++) {
            bookList.push(booksInfo[index]);
            if(index % 3 == 2 || booksInfo.length == (index+1)) {
                bookList.push(<div key={key++}></div>);
            }
        }

        return(
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="d-flex">
                        <div className="m-3">
                            <ConnectedGenres />
                        </div>
                        <div className="m-3">
                            <Search handleSubmit={this.handleSubmitSearchText} />
                        </div>
                    </div>
                    <div className="m-3">
                        <ISBNModal />
                    </div>
                    <div className="mt-4">
                        {bookList}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(state => state)(BookListView));
