<?php

namespace App\Http\Controllers;

use Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Url;

class UrlController extends Controller {

    // Shuffled letters of [0-9A-Za-z]
    // We shuffle so that users won't know 
    // the order of generated code
    private $_codeset = "scOKfk6oiCux0WNqbSp7P2vgIwYRGmAXUHtJjar0Ez4MT5leFyZ9D83hBQVLd1n";
    private $_base = 63;

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
            $url = Url::where('code', '=', md5(Request::get('url')))->first();

            if ($url) {
                $id = $this->_getCompressedURL($url['id']);
                $short_url .= $id;
                return Redirect::to('/')
                ->with('url',$short_url);
            }
            else {
                $id = $this->_addUrl();
                $code = $this->_getCompressedURL($id);

                $short_url .= $code;
                return Redirect::to('/')
                ->with('url',$short_url);
            }
        }
    }

    /**
     * Gives us back the index of the 
     * compressed URL code
     *
     */
    private function _getIndex($compressed) {

        $index = 0;
        for ($i = strlen($compressed); $i; $i--) {
            $index += strpos($this->_codeset, substr($compressed, (-1 * ( $i - strlen($compressed) )),1)) 
                    * pow($this->_base,$i-1);
        }
        return $index;
    }

    /**
     * We generate a base 64 code from the 
     * index of the inserted record 
     *
     */
    private function _getCompressedURL($index) {
        $code = "";

        while ($index > 0) {
            $code  = substr($this->_codeset, ($index % $this->_base), 1) . $code;
            $index = floor($index/$this->_base);
        }

        return $code;
    }

    /**
     * This functions add the URL to the datase and generates the
     * unique short url
     * 
     * return string $new code
     */
    private function _addUrl() {

        // Add both url and short key to the database
        $url = Url::create(
            array(
                'url' => Request::get('url'),
                'code' => md5(Request::get('url'))
            )
        );

        return $url->id;
    }

    /**
     * Redirect the shor url the the long/original url
     * redirect the long url to the view 
     * 
     */
    public function redirect($code){
        $id = $this->_getIndex($code);
        $row = Url::where('id', '=', $id)->first();

        if($row) {
            return Redirect::to($row->url);
        }
        else {
            return Redirect::to('/invalid')
            ->with('url','Invalid');
        }
    }
}
