import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class MyPageTabs extends Component {
    render() {
        const userId = this.props.userId;

        return (
            <div className="nav-scroll">
                {/*タブのボタン部分*/}
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link to={`/users/${userId}/`}
                           className={this.props.isTop ? 'nav-link active' : 'nav-link'}
                           data-toggle={this.props.isTop ? 'tab' : ''}>トップ</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`/users/${userId}/user_books`}
                           className={this.props.isUserBooks ? 'nav-link active' : 'nav-link'}
                           data-toggle={this.props.isUserBooks ? 'tab' : ''}>本棚</Link>
                    </li>

                    <li className="nav-item">
                        <Link to={`/users/${userId}/likes`}
                           className={this.props.isLikes ? 'nav-link active' : 'nav-link'}
                           data-toggle={this.props.isLikes ? 'tab' : ''}>Likes</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`/users/${userId}/loves`}
                           className={this.props.isLoves ? 'nav-link active' : 'nav-link'}
                           data-toggle={this.props.isLoves ? 'tab' : ''}>Loves</Link>
                    </li>

                    <li className="nav-item">
                        <Link to={`/users/${userId}/followings`}
                           className={this.props.isFollowings ? 'nav-link active' : 'nav-link'}
                           data-toggle={this.props.isFollowings ? 'tab' : ''}>Followings</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`/users/${userId}/followers`}
                           className={this.props.isFollowers ? 'nav-link active' : 'nav-link'}
                           data-toggle={this.props.isFollowers ? 'tab' : ''}>Followers</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

