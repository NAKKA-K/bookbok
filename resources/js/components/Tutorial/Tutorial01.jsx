import React from 'react';
import { Link } from 'react-router-dom';

class Tutorial01 extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p>BookBokではユーザー固有の本棚を持ちます。</p>
                <p>本の登録方法は2種類あります。</p>
                <ol className="ml-4">
                    <li>ISBNを入力して登録する方法</li>
                    <li>本の詳細画面から「本棚に登録」ボタンを押して登録する方法</li>
                    <li>複数のISBNから一括登録する方法</li>
                </ol>
                <hr/>

                <ol>
                    <li className="mb-5">
                        <p>
                            ISBNから登録する場合、本の裏表紙などに書かれている13桁(古い本では10桁の場合もある)のIDを入力することによって、自分の本棚へその本を追加することができます。
                            <img src="/images/tutorials/01-02.png" className="img-fluid card" />
                        </p>

                        <p>
                            ISBNの入力は「本の一覧」ページにある「ISBNから本棚に登録」からできます。
                            <img src="/images/tutorials/01-01.png" className="img-fluid card" />
                        </p>
                    </li>

                    <li className="mb-5">
                        <p>
                            本の詳細画面から「本棚に登録」ボタンを押して登録する場合、「本の一覧」ページで本を検索したり、誰かが書いたレビューやBokと呼ばれる感想などから本の詳細ページに飛ぶ必要があります。
                            しかしこの方法は、一度誰かが本棚に登録した本でないとできません。
                            誰も登録していない本の場合、「1」のISBNから登録する方法が必要です。
                            <img src="/images/tutorials/01-03.png" className="img-fluid card" />
                        </p>
                    </li>
                </ol>

                <div className="text-center">
                    <Link to="/tutorial/2" className="btn btn-success">Bok投稿</Link>
                </div>
            </div>
        );
    }
}

export default Tutorial01;
