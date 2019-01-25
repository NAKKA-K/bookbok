import React, { Component } from "react";
import { fetchLoveBoks, fetchUser } from "../actions";
import { store } from "../store";
import { isEmpty } from "../utils";

import { Loading } from "./shared/Loading";
import { Bok } from "./Bok";
import { MyPageTabs } from "./shared/user/MyPageTabs";
import { FloatUserInfo } from "./shared/user/FloatUserInfo";

export class LoveBokList extends Component {
    componentDidMount(){
        const userId = parseInt(this.props.match.params.id);
        store.dispatch(fetchLoveBoks(userId));
        fetchUser(userId);
    };

    render(){
        const loveBoks = this.props.loveBoks;
        const user = this.props.user;
        const loveList = (view) => (
            <div className="page-content-wrap row">
                <FloatUserInfo user={user} />

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 main-content p-5">
                            <MyPageTabs isLoves userId={this.props.match.params.id} />
                            <div className="mt-4">
                                <p>ブックマークしたBok</p>
                                {view}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        if(isEmpty(user)){
            return <Loading />;
        } else if(user && isEmpty(loveBoks)){
            return (
                loveList(<Loading />)
            );
        }

        const boks = loveBoks.map((loveBok, index) => {
            return <Bok bok={loveBok} key={index} />
        })

        return (
            loveList(boks)
        );
    }
}
