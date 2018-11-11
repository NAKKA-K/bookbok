<?php

namespace App\Http\Controllers;

use App\UserBook;
use App\User;
use App\Book;
use Illuminate\Http\Request;

class UserBookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @param string $userId
     * @return \Illuminate\Http\Response
     */
    public function index($userId)
    {
        // $userbooks = UserBook::where('user_id', '=', $userId)
        //             ->join('books', 'user_book.book_id', '=', 'books.id')
        //             ->select()
        //             ->get();

        $userbooks = User::with(array('books'=>function($q){
                        $q->select('books.id','books.name', 'books.cover', 'books.author', 'books.genre_id');
                    }))
                    ->select(['users.id', 'users.name', 'users.avatar', 'users.description', 'users.role_id'])
                    ->find($userId);
                    
        
        return response()->json(
            $userbooks,
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\UserBook  $userBook
     * @return \Illuminate\Http\Response
     */
    public function show(UserBook $userBook)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\UserBook  $userBook
     * @return \Illuminate\Http\Response
     */
    public function edit(UserBook $userBook)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\UserBook  $userBook
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UserBook $userBook)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\UserBook  $userBook
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserBook $userBook)
    {
        //
    }
}
