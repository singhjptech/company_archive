<?php

	// example use from browser
	// http://localhost/companydirectory/libs/php/insertDepartment.php?name=New%20Department&locationID=1

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

	// $_REQUEST used for development / debugging. Remember to cange to $_POST for production

	if($_REQUEST['action'] == 'add_emp'){
		$query = 'INSERT INTO personnel (firstName, lastName, jobTitle, email, departmentID) VALUES ("'.$_REQUEST['first_name'].'", "'.$_REQUEST['last_name'].'", "'.$_REQUEST['job_title'].'", "'.$_REQUEST['email'].'", "'.$_REQUEST['department'].'")';
	}elseif($_REQUEST['action'] == 'edit_emp'){
		$query = 'UPDATE personnel SET firstName = "'.$_REQUEST['efirst_name'].'", lastName = "'.$_REQUEST['elast_name'].'", jobTitle = "'.$_REQUEST['ejob_information'].'", email = "'.$_REQUEST['eemail'].'",departmentID = "'.$_REQUEST['emp_department'].'" where id = "'.$_REQUEST['emp_id'].'"';
	}elseif($_REQUEST['action'] == 'delete'){
		$query = 'DELETE FROM personnel where id = "'.$_REQUEST['deleteid'].'"';
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

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = [];
	
	mysqli_close($conn);

	echo json_encode($output); 

?>