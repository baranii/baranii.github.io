<?php

require "db/pdo.php";

$sql = 'SELECT prezi, title, code, tag, professor, classlink, schedule, classroom
					FROM bustan WHERE `schedule` <> "" AND `state` = "فعال" ';
$stm = $pdo->query($sql);
$rows = $stm->fetchAll(PDO::FETCH_NUM);

$jsonArray = json_encode($rows, JSON_UNESCAPED_UNICODE);
$corsi = 'const ROWS = ' . $jsonArray;
$bom = "\xEF\xBB\xBF"; // UTF-8 BOM
file_put_contents("corsi.js", $bom . $corsi);

echo "<h1>Total <mark>" . count($rows) ."</mark> Courses Rendered. </h1>";

