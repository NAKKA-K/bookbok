import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { connect } from "react-redux";

import { Footer } from './Footer';
import { Home } from './Home';
import { Login } from './Login';
import { Logout } from './Logout';
import { PrivacyPolicyView } from './PrivacyPolicyView';
import { TermsOfServiceView } from './TermsOfServiceView';
import { UserRegister } from './UserRegister';

import Header from './Header';
import { ConnectedFollowersView } from './FollowersView';
import { ConnectedFollowingsView } from './FollowingsView';
import { ConnectedUserDetail } from './UserDetail';
import {
    ConnectedBokFlow,
    ConnectedBookDetail,
    ConnectedBookList,
    ConnectedUserBookshelf,
    ConnectedLikeBokList,
    ConnectedUsersView,
    ConnectedUserBookDetail
} from '../containers';


//react-router-dom
const RouterWithHeader = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={ Home } />
                <Route exact path="/home" component={ Home } />
                <Route exact path="/privacy" component={ PrivacyPolicyView } />
                <Route exact path="/terms_of_service" component={ TermsOfServiceView } />
                <Route exact path="/bok_flow" component={ ConnectedBokFlow } />
                <Route exact path="/register" component={ UserRegister } />
                <Route exact path="/login" component={ Login } />
                <Route exact path="/logout" component={ Logout } />
                <Route exact path="/user_register" component={ UserRegister } />
                <Route exact path="/users/:id" component={ ConnectedUserDetail } />
                <Route exact path="/books" component={ ConnectedBookList } />
                <Route exact path="/books/:id" component={ ConnectedBookDetail } />
                <Route exact path="/users/:id/user_books" component={ ConnectedUserBookshelf } />
                <Route exact path="/users/:userId/user_books/:userBookId" component={ ConnectedUserBookDetail } />

                <Route exact path="/users/:id/likes" component={ ConnectedLikeBokList } />
                <Route exact path="/users/:id/followers" component={ ConnectedFollowersView } />
                <Route exact path="/users/:id/followings" component={ ConnectedFollowingsView } />

                <Route exact path="/users" component={ ConnectedUsersView } />
                <Route exact component={ Home } /> {/* TODO: Replace to 404 page component*/}
            </Switch>
            <Footer />
        </div>
    </BrowserRouter>
)

export default RouterWithHeader;