<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Genre;

class GenreController extends Controller
{
    /**
     * Display listing of resources.
     * 
     * 
     */
    public function index(){

        $genres = Genre::orderBy('id')
                  ->get(['id', 'name']);

        return response()->json(
            $genres,
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
}
