<?php
namespace Shopgate\Test\Service;

use Shopgate\Test\Entity;
use Shopgate\Test\FileProcessor\FileParser;
use Shopgate\Test\Views\View;
use Shopgate\Test\Entity\Weather;

class CityWeatherService {

    private $results;
    private $fileParser;

    public function __construct(FileParser $fileParser = null){  
    	if ($fileParser === null){
			$this->fileParser = new FileParser();
		}
		else {
			$this->fileParser = $fileParser;
		}
    }
    
    public function getCities($sFile) {
        $this->results = $this->fileParser->getInputData($sFile);      
        
        foreach ($this->results as $city) {
        	$weather = new Weather();
        	$resultAPI = $weather->callWeather($city->getName());       		
        	$city->setWeather($weather);
        }
               
        // Sort the cities accrding to the spread temperature
        usort($this->results, function ($item1, $item2) {
              if ($item1->getWeather()->getTempSpread() == $item2->getWeather()->getTempSpread()) return 0;
                  return $item1->getWeather()->getTempSpread() < $item2->getWeather()->getTempSpread() ? -1 : 1;
        });
                
        $view = new View($this->results);
        return $view->out();
        
    }
}
