import * as React from 'react';
import * as ResourceTypes from '../resource-types';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../actions';
import { store } from '../store';
import { isEmpty } from '../utils';
import { Loading } from './shared/Loading';
import DefaultAvatar from './shared/user/DefaultAvatar';

interface Props {
    users?: Array<ResourceTypes.User>;
}

export class UsersView extends React.Component<Props> {
    componentDidMount() {
        store.dispatch(fetchUsers());
    }

    render() {
        if (isEmpty(this.props.users)) {
            return <Loading />;
        }

        // @ts-ignore
        const bindedUsers = this.props.users.map((user, i) => (
            <div className="card border-secondary mb-2" key={i}>
                <div className="card-body d-flex">
                    {user.avatar ? (
                        <img src={user.avatar} className="user-list-avatar" />
                    ) : (
                        <DefaultAvatar className="user-list-avatar bg-bookbok" />
                    )}
                    <div className="ml-2">
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                        <div className="small text-muted">{user.created_at}</div>
                    </div>
                </div>
            </div>
        ));

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h1 className="mt-4 mb-4 mr-2">ユーザー一覧</h1>
                        {bindedUsers}
                    </div>
                </div>
            </div>
        );
    }
}
