<?php
namespace Shopgate\Test\FileProcessor;

use Shopgate\Test\Entity\Weather;
use Shopgate\Test\Entity\City;
use Shopgate\Test\FileProcessor;
use Shopgate\Test\FileProcessor\FileReader;

class FileParser implements FileParserInterface {

	private $results;
	private $cFileReader;

	public function __construct(FileReader $frFileReader = null){
		if ($frFileReader === null){
			$this->cFileReader = new FileReader();
		}
		else {
			$this->cFileReader = $frFileReader;
		}
	}

	public function getInputData($sFile){
		
		$sFilePath = ('data/' . $sFile);
		$aFileData = $this->cFileReader->readFile($sFilePath);
		$aData = array();
		$aElement = explode(' ',chop(array_shift($aFileData)));
		
		foreach($aFileData as $sData) {
			chop($sData);
			 
			$aLine = str_getcsv($sData, ' ');
			 
			$city = new City();
			$city->setCountry($aLine[0]);
			$city->setZip($aLine[1]);
			$city->setName($aLine[2]);
			$city->setLong($aLine[3]);
			$city->setLat($aLine[4]);		 
			
			/*
			$weather = new Weather();
			$resultAPI = $weather->callWeather($aLine[2]);
			$city->setWeather($weather);
			*/
			 
			$aData[] = $city;
		}
		 
		return $aData;

	}
}
