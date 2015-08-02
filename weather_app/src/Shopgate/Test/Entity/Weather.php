<?php
namespace Shopgate\Test\Entity;

use Shopgate\Test\Libraries;
use Shopgate\Test\Libraries\YahooWeather;
use Shopgate\Test\Libraries\FileSystemCache;

class Weather 
{
	
    private $sDesc;
    private $sMinTemp;
    private $sMaxTemp;    
    private $sTempSpread;
    
    private $weatherAPI;

    public function getDesc(){
        return $this->sDesc;
    }

    public function getMinTemp(){
        return $this->sMinTemp;
    }
    
    public function getMaxTemp(){
    	return $this->sMaxTemp;
    }
    
    public function getTempSpread(){
    	return $this->sTempSpread;
    }
    
    
    public function setDesc($sDesc){
    	$this->sDesc = $sDesc;
    }
    
    public function setMinTemp($sMinTemp){
    	$this->sMinTemp = $sMinTemp;
    }

	public function setMaxTemp($sMaxTemp){
    	$this->sMaxTemp = $sMaxTemp;
    }
    
    public function setTempSpread(){
    	$this->sTempSpread = $this->sMaxTemp - $this->sMinTemp;
    }
    
    public function callWeather($sCity) {
    	
    	$this->weatherAPI = new YahooWeather();
    	
    	FileSystemCache::$cacheDir = '/tmp/cache';
    	$key = FileSystemCache::generateCacheKey($sCity);
    	$result = FileSystemCache::retrieve($key);
    		
    	if($result === false) {
    		//$weatherAPI = new YahooWeather();
    		$result = json_decode($this->weatherAPI->callAPI($sCity));
    		FileSystemCache::store($key, $result, 300);
    	}
    	
    	$this->setDesc($result->description);
    	$this->setMaxTemp($result->maxTemp);
    	$this->setMinTemp($result->minTemp);
    	$this->setTempSpread();
    }
    
}
