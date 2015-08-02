<?php
namespace Shopgate\Test\Libraries;

class YahooWeather implements WeatherAPIInterface
{
	public function callAPI($sCity){
		
		$BASE_URL = "http://query.yahooapis.com/v1/public/yql";
	    	 
	    $yql_query = "select item.description,item.forecast from weather.forecast where woeid in (select woeid from geo.places(1) where text='". $sCity ."')";
	    
	    $yql_query_url = $BASE_URL . "?q=" . urlencode($yql_query) . "&format=json";
	    	 
	    // Make call with cURL
	    $session = curl_init($yql_query_url);
	    curl_setopt($session, CURLOPT_RETURNTRANSFER,true);
	    $json = curl_exec($session);
	    	 
	    // Convert JSON to PHP object
	    $result =  json_decode($json);
	    
	    $dataArray = array(
	    	'description' => $result->query->results->channel[0]->item->description,
	    	'maxTemp' => $result->query->results->channel[0]->item->forecast->high,
	    	'minTemp' => $result->query->results->channel[0]->item->forecast->low
	    );
    	
    	return json_encode($dataArray);
    	
	}
}