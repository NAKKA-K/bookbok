<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserBook;
use App\Book;
use App\Components\BookInfoScraper\ScrapeManager;

class CsvImportController extends Controller
{

    /**
     * 書籍を一括登録するためのエンドポイント
     * カンマ区切りのISBN文字列が送られてくることを期待している
     * 
     * @Request $request
     *  リクエスト情報をまとめているLaravel組込クラス
     */
    public function store(Request $request){
        
        $authId = auth()->guard('api')->id();
        if(!$authId){
            return response()->json(
                [
                    'status' => 401,
                    'userMessage' => '書籍の一括登録にはログインが必要です。'
                ],
                401
            );
        }

        // 文字列⇒配列
        $raw_isbn_array = explode(',', $request->input('isbn'));

        // 正しいISBNの形式を守るデータのみを残すようにフィルタリング
        $filterd_isbn_array = array_filter($raw_isbn_array, ['App\Components\ISBN', 'normalizeReturnBoolean']);

        if(empty($filterd_isbn_array)){
            return response()->json(
                [
                    'status' => 400,
                    'userMessage' => '入力されたISBNは13桁の数字になっていますか？ご確認お願い致します。'
                ],
                400
            );
        }

        //　ユーザの本棚に登録されている本と重複しないかをチェックして
        //　問題なければユーザの本棚に新規登録する
        foreach($filterd_isbn_array as $isbn){

            // App\Bookに存在しているか確認
            if(Book::where('isbn', '=', $isbn)->exists()){

                // App\UserBookに存在しているか確認
                $book = Book::where('isbn', '=', $isbn)->first();
                if(!(UserBook::where('user_id', '=', $authId)->where('book_id', '=', $book->id)->exists())){
                    
                    // ユーザの本棚に登録
                    $user_book = UserBook::create([
                        'user_id' => $authId,
                        'book_id' => $book_id
                    ]);

                    $response[] = $book->name;
                }
                continue;
            }

            // App\Bookに存在していない場合
            // ScrapeManagerを使って本情報を取得してからBookとUserBook双方の登録を行う
            $scrapers = resolve('app.bookInfo.scrapeManager');

            // すでにISBN文字列の正規化は行っているので例外（\InvalidArgumentException）を考慮しない
            $book = $scrapers->searchByIsbn($isbn);
            if($book == null){
               continue;
            }

            // App\Bookの保存
            $book->save();

            // App\UserBookの保存
            $book_id = Book::where('isbn', '=', $isbn)->first()->id;
            $user_book = UserBook::create([
                'user_id' => $authId,
                'book_id' => $book_id
            ]);

            $response[] = $book->name;
        }

        if(empty($user_book)){
            return response()->json(
                [
                    'status' => 200,
                    'userMessage' => 'リクエストされた本はすべて登録済みです。'
                ],
                200
            );
        }

        return response()->json($response,201);
    }
}
