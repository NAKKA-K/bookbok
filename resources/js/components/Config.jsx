import React, { Component } from 'react';
import { store } from "../store";
import { fetchUser, requestUpdateUser, setAlertMessage } from "../actions";
import * as utils from "../utils";
import { Loading } from "./shared/Loading";

class Config extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            avatar: "",
            description: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const loginUser = utils.getAuthUser();
        if(!loginUser){
            return this.props.history.push('/login');
        }

        this.setState({
            name: loginUser.name,
            avatar: loginUser.avatar,
            description: loginUser.description
        });
    }

    handleChange(e) {
        const name = e.target.name;
        this.setState({ [name]: e.target.value });
    }

    handleSubmit(e) {
        requestUpdateUser(this.state).then(() => {
            store.dispatch(setAlertMessage('success', {__html: '更新しました'}));
        });
    }

    render() {
        return (
            <div className="page-content-wrap row">
                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="main-content">
                            <div className="user-detail-wrapper d-flex flex-column">
                                <h1>プロフィール設定</h1>

                                {/* ニックネーム */}
                                <div className="items-wrapper">
                                    <div className="d-flex align-items-end">
                                        <label className="font-weight-bold">ニックネーム</label>
                                        <p className="text-muted hint-message">32文字以内の英数字で入力してください</p>
                                    </div>
                                    <input name="name"
                                        type="text"
                                        className="name-input"
                                        value={this.state.name}
                                        onChange={this.handleChange} />
                                </div>

                                {/* プロフィール画像 */}
                                <div className="items-wrapper">
                                    <label className="font-weight-bold">
                                        プロフィール画像
                                        <i className="far fa-question-circle ml-2" />
                                    </label>
                                    <img src={this.state.avatar} className="user-info-avatar d-block mb-1" />
                                    <input name="avatar"
                                        type="text"
                                        className="avatar-input"
                                        placeholder="例：https://example.com/sample.png"
                                        value={this.state.avatar}
                                        onChange={this.handleChange} />
                                </div>

                                {/* 自己紹介欄 */}
                                <div className="items-wrapper">
                                    <div className="d-flex align-items-end">
                                        <label className="font-weight-bold">自己紹介</label>
                                        <p className="text-muted hint-message">1000文字以内で入力してください</p>
                                    </div>
                                    <textarea name="description"
                                        type="text"
                                        className="description-input"
                                        placeholder="例）小説をよく読みます。好きな作者は○○さんです。"
                                        value={this.state.description}
                                        onChange={this.handleChange} />
                                </div>

                                <button className="btn btn-success float-right"
                                    onClick={this.handleSubmit}>
                                    保存
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


import { connect } from "react-redux";

export default connect(state => state)(
    Config
);