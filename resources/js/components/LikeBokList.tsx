import * as React from 'react';
import * as ResourceTypes from '../resource-types';
import { fetchLikeBoks, fetchUser, loading, loaded } from '../actions';
import { store } from '../store';
import { isEmpty } from '../utils';

import { Loading } from './shared/Loading';
import { Bok } from './Bok';
import { MyPageTabs } from './shared/user/MyPageTabs';
import { FloatUserInfo } from './shared/user/FloatUserInfo';

interface Props {
    match: ResourceTypes.Matcher;
    user?: ResourceTypes.User;
    loading?: boolean;
    likeBoks?: Array<ResourceTypes.Bok>;
}

const fetchLikeBokListActions = userId => {
    store.dispatch(loading());
    Promise.all([fetchLikeBoks(userId), fetchUser(userId)]).then(() => {
        store.dispatch(loaded());
    });
};

class LikeBokList extends React.Component<Props> {
    componentDidMount() {
        const userId = this.props.match.params.id;
        fetchLikeBokListActions(userId);
    }

    render() {
        const likeBoks = this.props.likeBoks;
        const user = this.props.user;
        const likeList = view => (
            <div className="page-content-wrap row">
                <FloatUserInfo user={user} />

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 p-4 p-md-5">
                            <MyPageTabs isLikes userId={this.props.match.params.id} />
                            <div className="mt-4">
                                <p>いいねしたBok</p>
                                {view}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        if (isEmpty(user)) {
            return <Loading />;
        } else if (this.props.loading || (user && !likeBoks)) {
            return likeList(<Loading />);
        }

        // @ts-ignore
        const boks = likeBoks.map((likeBok, index) => {
            return <Bok bok={likeBok} key={index} />;
        });

        return likeList(boks);
    }
}

import { connect } from 'react-redux';
export default connect(state => state)(LikeBokList);
