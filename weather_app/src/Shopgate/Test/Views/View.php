<?php 

namespace Shopgate\Test\Views;

use Shopgate\Test\Entity\City;

class View {
	
	private $cities;
	
	public function __construct($cities) {
		$this->cities = $cities;
	}
	
	public function out() {
		$output = '
			<html>
			<head>
			<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/pure-min.css">
			<body>
			<center>
			';
		if (!empty($_POST)) {
			
			$output .= '
				<table class="pure-table pure-table-bordered">
				    <thead>
				        <tr>
				            <th>City</th>
				            <th>Min Temp</th>
				            <th>Max Temp</th>
				            <th>Spread Temp</th>
				            <th>Description</th>
				            <th>Distance</th>
				        </tr>
				    </thead>
				
				    <tbody>
					';
			
			foreach ($this->cities as $city) {
				$output .= '
					<tr>
						<td>' . $city->getName(). '</td>
						<td>' . $city->getWeather()->getMinTemp(). '</td>
						<td>' . $city->getWeather()->getMaxTemp(). '</td>
						<td>' . $city->getWeather()->getTempSpread(). '</td>
						<td>' . $city->getWeather()->getDesc(). '</td>
						<td>' . $city->getDistance($_POST['latitude'],$_POST['longitude']). ' Miles</td>
					</tr>	
					';
			}
			
			$output .= '
			    </tbody>
			</table>
			';
		}
		
		else {
			$output .= '
				<form class="pure-form" method="post">
				<fieldset>
				<legend>Enter Coordinates</legend>
				
				<input id="latitude" name="latitude" type="text" placeholder="Latitude" required>
				<input id="longitude" name="longitude" type="text" placeholder="Longitude" required>
				
				<button type="submit" class="pure-button pure-button-primary">Show Weather</button>
				</fieldset>
				</form>
			';
		}
		
		$output .= '
			</center>
			</body>
			</head>
			</html>
			';
		
		return $output;
	}
}

