<?php

$charset = 'utf8mb4';
$host = 'localhost';

/// Site
// $db   = 'nrppsnv_unis';
// $user = 'nrppsnv_unis';
// $pass = 'erfan@37*';

/// Local
$db   = 'unis';
$user = 'root';
$pass = '';

// $test_string = sprintf('This is a %s test string', FOO);
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
	PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
	PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
	PDO::ATTR_EMULATE_PREPARES   => false,
];
try
{
	$pdo = new PDO($dsn, $user, $pass, $options);
}
catch (\PDOException $e)
{
	throw new \PDOException($e->getMessage(), (int)$e->getCode());
}