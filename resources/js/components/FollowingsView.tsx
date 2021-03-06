import * as React from 'react';
import PropTypes from 'prop-types';
import * as ResourceTypes from '../resource-types';
import { connect } from 'react-redux';
import { store } from '../store';
import { fetchUser, fetchFollowings, loading, loaded } from '../actions';
import { isEmpty } from '../utils';

import { Loading } from './shared/Loading';
import { MyPageTabs } from './shared/user/MyPageTabs';
import { FloatUserInfo } from './shared/user/FloatUserInfo';
import SimpleUser from './shared/user/SimpleUser';

interface Props {
    match: ResourceTypes.Matcher;
    user?: ResourceTypes.User;
    loading?: boolean;
    followings?: Array<ResourceTypes.SimpleUser>;
}

class FollowingsView extends React.Component<Props> {
    componentDidMount() {
        const userId = this.props.match.params.id;
        store.dispatch(loading());
        Promise.all([fetchFollowings(userId), fetchUser(userId)]).then(() => {
            store.dispatch(loaded());
        });
    }

    render() {
        const followings = this.props.followings;
        const user = this.props.user;
        const followList = view => (
            <div className="page-content-wrap row">
                <FloatUserInfo user={user} />

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="main-content">
                            <MyPageTabs isFollowings userId={this.props.match.params.id} />
                            <div className="mt-4">
                                <p>フォロー中</p>
                                {view}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        if (isEmpty(user)) {
            return <Loading />;
        } else if (this.props.loading || (user && !followings)) {
            return followList(<Loading />);
        }

        // @ts-ignore
        const bindedUsers = followings.map((user, i) => <SimpleUser user={user} key={i} />);

        return followList(bindedUsers);
    }
}

export default connect(state => state)(FollowingsView);
