<?php
namespace Shopgate\Test\Entity;

class City 
{
	
    private $sName;
    private $sZip;
    private $sCountry;
    private $sLong;
    private $sLat;
    
    private $oWeather;

    /**
     * Unsorted list of partners with their corresponding prices.
     * 
     * @var Partner[]
     */
    //public $aPartners = array();

    public function getName(){
        return $this->sName;
    }

    public function getWeather(){
        return $this->oWeather;
    }
    
    public function getZip(){
    	return $this->sZip;
    }
    
    public function getCountry(){
    	return $this->sCountry;
    }
    
    public function getLong(){
    	return $this->sLong;
    }
    
    public function getLat(){
    	return $this->sLat;
    }
    
    public function setName($sName){
    	$this->sName = $sName;
    }
    
    public function setWeather($oWeather){
    	$this->oWeather = $oWeather;
    }

    public function setZip($sZip){
    	$this->sZip = $sZip;
    }

    public function setCountry($sCountry){
    	$this->sCountry = $sCountry;
    }
    
    public function setLong($sLong){
    	$this->sLong = $sLong;
    }
    
    public function setLat($sLat){
    	$this->sLat = $sLat;
    }
    
    public function getDistance($sLat1, $sLong1) {
    	$sLat2 = $this->getLat();
    	$sLong2 = $this->getLong();
		$theta = $sLong1 - $sLong2;
		
  		$dist = sin(deg2rad($sLat1)) * sin(deg2rad($sLat2)) +  cos(deg2rad($sLat1)) * cos(deg2rad($sLat2)) * cos(deg2rad($theta));
  		$dist = acos($dist);
		$dist = rad2deg($dist);
		$miles = $dist * 60 * 1.1515;
    	
    	return $miles;
    	 
    }
}
