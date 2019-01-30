import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { storeIsbnBulkRegisterDirect } from '../actions';
import { store } from "../store";
import { getAuthUser } from "../utils";


class IsbnBulkRegistrationView extends Component {
    constructor(props) {
        super(props);

        this.state = { text: "", invalidMessage: null };
        this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
    }

    componentWillMount() {
        if(!getAuthUser()) {
            return this.props.history.push(`/login`);
        }
    }

    handleSubmitRegister(e) {
        e.preventDefault();
        const isbnList = this.state.text.split("\n");
        if(isbnList.lenght === 0) {
            return this.setState({ invalidMessage: "1つ以上のISBNを入力してください" });
        }

        const userId = this.props.loggedinUser.id;
        storeIsbnBulkRegisterDirect(userId, { isbnList }).then(res => {
            if(res.status == 400) {
                this.setState({ invalidMessage: json.userMessage });
            } else if(res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        }).then(json => {
            this.props.history.push(`/users/${userId}/user_books`);
        }).catch(err => {
            this.setState({ invalidMessage: err.message + ': 登録時にエラーが発生しました。恐れ入りますがフッターの「お問い合わせ」からご連絡ください。' });
        });
    }

    render() {
        return(
            <div className="container mt-4">
                <div className="row justify-content-center">

                    <div className="col-md-8 main-content p-5">
                        <Link to={`/users/${this.props.loggedinUser.id}/user_books`} className="btn btn-outline-primary mb-5">本棚へ</Link>
                        <div className="mb-5">
                            <h1>まとめて登録(ISBN)</h1>
                            <p>本に記載されているISBNを入力することで、簡単に本を自分の本棚に一括登録することができます。<br/>
                            一括登録には若干の時間がかかる場合がありますが、不具合ではありません。</p>
                        </div>

                        <form onSubmit={this.handleSubmitRegister}>
                            <div className="form-group">
                                <label
                                    htmlFor="text">
                                    ISBN(複数行)
                                </label>

                                <textarea id="text"
                                    name="text"
                                    className={`form-control ${this.state.invalidMessage && "is-invalid"}`}
                                    value={this.state.text || ''}
                                    rows="5"
                                    onChange={(e) => this.setState({ text: e.target.value })}
                                    required
                                    autoFocus />
                                <div className="invalid-feedback">
                                    {this.state.invalidMessage}
                                </div>
                                <small className="text-muted">
                                    ・isbnを改行区切りで入力してください。<br/>
                                    ・1つ以上のisbnを入力してください。<br/>
                                </small>
                            </div>

                            <div className="form-group row d-flex flex-column align-items-center">
                                <button type="submit" className="btn btn-success">まとめて登録</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => state)(IsbnBulkRegistrationView);