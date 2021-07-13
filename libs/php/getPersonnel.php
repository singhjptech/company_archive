<?php

	// example use from browser
	// http://localhost/companydirectory/libs/php/getPersonnel.php?id=1

	// remove next two lines for production
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}	

	// first query
	
	if($_REQUEST){
		$query = '';

		$query .= 'SELECT personnel.* from personnel INNER JOIN department ON personnel.departmentID=department.id';

		if($_REQUEST['sdepartment'] > 0){
			$query .= ' where departmentID = "'.$_REQUEST['sdepartment'].'"';
		}

		if($_REQUEST['slocation'] > 0){
			$query .= ' AND department.locationID = "'.$_REQUEST['slocation'].'"';
		}
			
		if($_REQUEST['keywords']){
			$query .= ' AND (firstName LIKE "%'.$_REQUEST['keywords'].'%" OR lastName LIKE "%'.$_REQUEST['keywords'].'%")';
		}	
		$query .= ' ORDER BY firstName asc';
	}else{
		$query = 'SELECT * from personnel ORDER BY firstName asc';
	}

	$result = $conn->query($query);
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
   
   	$personnel = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($personnel, $row);

	}

	/*$query = 'SELECT * from personnel WHERE id =' . $_REQUEST['id'];

	$result = $conn->query($query);
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
   
   	$personnel = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($personnel, $row);

	}*/

	// second query

	$query = 'SELECT department.id as dep_id, department.name as dep_name, location.name as loc_name, location.id as loc_id from department INNER JOIN location ON department.locationID=location.id order By department.id desc';

	$result = $conn->query($query);
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
   
   	$department = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($department, $row);

	}

	$locationquery = 'SELECT id, name from location ORDER BY id desc';

	$locationresult = $conn->query($locationquery);
	
	if (!$locationresult) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
   
   	$location = [];

	while ($row = mysqli_fetch_assoc($locationresult)) {

		array_push($location, $row);

	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data']['personnel'] = $personnel;
	$output['data']['department'] = $department;
	$output['data']['location'] = $location;
	
	mysqli_close($conn);

	echo json_encode($output); 

?>