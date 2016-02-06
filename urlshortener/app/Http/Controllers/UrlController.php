<?php

namespace App\Http\Controllers;

use Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Url;

class UrlController extends Controller {

    /**
    * Function to shorten the url given
    * return $url to '/'
    * 
    */
    public function shorten() {
        // Validate if the entered url is a valid URL
        $rules = array(
            'url' => 'required|url'
        );
        $valid = Validator::make(Request::all(),$rules);

        $short_url = "http://".$_SERVER['SERVER_NAME'].'/';

        if ($valid->fails()) {
            return Redirect::to('/')
            ->withInput()
            ->with('error','Invalid Url');
        }
        else {

            // We want to know if url exists in database
            $url = Url::where('url', '=', Request::get('url'))->first();

            if ($url) {
                $short_url .= $url['code'];
                return Redirect::to('/')
                ->with('url',$short_url);
            }
            else {
                $new_code = $this->_addUrl();

                $short_url .= $new_code;
                return Redirect::to('/')
                ->with('url',$short_url);
            }
        }
    }

    /**
     * This functions add the URL to the datase and generates the
     * unique short url
     * 
     * return string $new code
     */
    private function _addUrl() {

        $new_code;
        
        // We want to make sure the generated code is unique
        // else we will keep generating until we 
        // produce a unique key
        do {
            $new_code = str_random(8);
        } while(Url::where('code','=',$new_code)->count()>0);

        // Add both url and short key to the database
        Url::create(
          array(
            'url' => Request::get('url'),
            'code' => $new_code
          )
        );

        return $new_code;
    }

    /**
     * Redirect the shor url the the long/original url
     * redirect the long url to the view 
     * 
     */
    public function redirect($code){
        $row = Url::where('code', '=', $code)->first();

        if($row) {
            return Redirect::to($row->url);
        }
        else {
            return Redirect::to('/invalid')
            ->with('url','Invalid');
        }
    }
}
