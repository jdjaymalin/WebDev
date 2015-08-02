<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);

use Shopgate\Test\Service\CityWeatherService;
use Shopgate\Test\Service\WeatherService;
use Shopgate\Test\Libraries\YahooWeather;

require_once(__DIR__ . '/src/SplClassLoader.php');

$splClassLoader = new \SplClassLoader('Shopgate', __DIR__ . '/src');
$splClassLoader->register();

$weatherService = new CityWeatherService();
$output = $weatherService->getCities('cities.dat');


echo $output;

?>
