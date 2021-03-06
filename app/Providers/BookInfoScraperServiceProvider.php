<?php

namespace App\Providers;

use App\Components\BookInfoScraper\ScrapeManager;
use App\Components\BookInfoScraper\GoogleBooksScraper;
use App\Components\BookInfoScraper\OpenBDScraper;
use App\Components\BookInfoScraper\NationalDietLibraryScraper;
use Illuminate\Support\ServiceProvider;

class BookInfoScraperServiceProvider extends ServiceProvider
{

    const RAKUTEN_URI = "https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&applicationId=";
    const QUERY = "&isbn=";

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        // GoogleBooksScraperをコンテナに登録
        $this->app->bind(
            'app.bookInfo.scraper.google',
            GoogleBooksScraper::class
        );

        // OpenBDScraperをコンテナに登録
        $this->app->bind(
            'app.bookInfo.scraper.openbd',
            OpenBDScraper::class
        );

        // NationalDietLibraryScraperをコンテナに登録
        $this->app->bind(
            'app.bookInfo.scraper.ndl',
            NationalDietLibraryScraper::class
        );

        // tag付け
        $this->app->tag(
            [
                'app.bookInfo.scraper.openbd',
                'app.bookInfo.scraper.google',
                'app.bookInfo.scraper.ndl',
            ],
            'app.bookInfo.scraper'
        );

        // ScrapeManagerをコンテナに登録
        // コンストラクタに引数として'app.bookInfo.scraper'のタグを持つ各スクレイパーを渡す
        $this->app->bind(
            'app.bookInfo.scrapeManager',
            function ($app) {
                return new ScrapeManager((self::RAKUTEN_URI . env('RAKUTEN_KEY') . self::QUERY),
                                         $app->tagged('app.bookInfo.scraper'
                                        ));
            }
        );
    }
}
