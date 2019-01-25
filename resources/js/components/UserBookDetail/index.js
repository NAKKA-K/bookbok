import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { fetchUserBookDetail, fetchUser, requestUpdateUserBookStatus } from "../../actions";
import { store } from "../../store";
import { isEmpty, getAuthUser } from "../../utils";

import { Loading } from "../shared/Loading";
import UserDetailBok from "./UserDetailBok";
import { FloatUserInfo } from "../shared/user/FloatUserInfo";
import { BookInfo } from "../shared/book/BookInfo";
import { BokModal } from "../BokModal";
import { ReviewModal } from "../ReviewModal";
import { MyPageTabs } from "../shared/user/MyPageTabs";
import UserBookInfo from './UserBookInfo';


class UserBookDetail_ extends Component {
    constructor(props){
        super(props);

        this.readingStatuses = [
            { id: 0, name: 'none', intl: '未設定' },
            { id: 5, name: 'wanted', intl: '欲しい' },
            { id: 10, name: 'unread', intl: '未読' },
            { id: 15, name: 'reading', intl: '読書中' },
            { id: 20, name: 'readed', intl: '読了' },
        ];
        this.handleUpdate = this.handleUpdate.bind(this);
    };

    componentDidMount(){
        this.userId = parseInt(this.props.match.params.userId);
        this.userBookId = parseInt(this.props.match.params.userBookId);
        store.dispatch(fetchUserBookDetail(this.userId, this.userBookId));
        fetchUser(this.userId);
    };

    // idを元にサーバーに送信する値を返す
    getStatusNameFromId(id) {
        return (this.readingStatuses.filter((val) => (val.id == id))[0]).name;
    }

    handleUpdate(e) {
        if(isEmpty(getAuthUser())){
            return this.props.history.push('/login');
        }

        let body = {
            reading_status: this.getStatusNameFromId(this.props.userBookDetail.reading_status),
            is_spoiler: this.props.userBookDetail.is_spoiler,
        };
        const name = e.target.name;
        if(name === 'reading_status') {
            body = { ...body, reading_status: this.getStatusNameFromId(e.target.value) };
        }else if(name === 'is_spoiler') {
            body = { ...body, is_spoiler: e.target.checked };
        }

        requestUpdateUserBookStatus(
            this.userId,
            this.userBookId,
            body
        ).then(() => {
            // TODO: Bootstrap alertで更新したことを通知する
        });
    }

    buttonDisplayCheck(loginUser, userId) {
        if(loginUser && loginUser.id == userId) {
            return true;
        }
        return false;
    }

    render(){
        if(isEmpty(this.props.userBookDetail) || isEmpty(this.props.user)){
            return <Loading />;
        }

        const userBook = this.props.userBookDetail;
        const boks = userBook.boks.map((bok) => {
            return <div className="boks-bok" key={bok.id}>
                <UserDetailBok bok={bok}/>
                <div className="boks-relation-line"></div>
            </div>
        })

        const isModalView = this.buttonDisplayCheck(getAuthUser(), this.userId)
        const { book, review } = userBook;
        const user = this.props.user;
        return (

            <div className="page-content-wrap row row-book-detail">
                <FloatUserInfo user={user} />


                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 main-content p-5">
                            <MyPageTabs userId={this.userId} />
                            <Link to={`/users/${this.userId}/user_books`}
                                className="btn btn-outline-primary mt-5">
                                戻る
                            </Link>
                            <UserBookInfo
                                readingStatuses={this.readingStatuses}
                                handleUpdate={this.handleUpdate}
                                userId={userBook.user_id}
                                readingStatus={userBook.reading_status}
                                isSpoiler={userBook.is_spoiler} />

                            <BookInfo book={book} />
                            <hr />
                            <h3 className="mt-5">レビュー<div className="float-right"><ReviewModal display={isModalView} /></div></h3>
                            <p className="mt-4">{review.body}</p>
                            <hr />
                            <h3 className="mt-5">Boks <div className="float-right"><BokModal display={isModalView} /></div></h3>
                            <div className="mt-4">{boks}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(UserBookDetail_);

