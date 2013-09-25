<?php

$in = file_get_contents('articles.txt');
$out = array();

$thisEra = "";
$eras = explode("\n\n\n", $in);

foreach ($eras as $era) {

	$thisEra = array();

	$parts = explode("\n\n", $era);

	$headers = explode("\n", array_shift($parts));

	$thisEra['title'] = $headers[0];
	$thisEra['description'] = $headers[1];
	$thisEra['start'] = (int) $headers[2];
	$thisEra['end'] = (int) $headers[3];

	$thisEra['articles'] = array();

	while ($article = array_shift($parts)) {
		
		$thisArticle = explode("\n", $article);

		array_push($thisEra['articles'], array(
			'date' => $thisArticle[0],
			'title' => $thisArticle[1],
			'url' => $thisArticle[2],
			'year' => (int) date("Y", strtotime($thisArticle[0])),
			'author' => $thisArticle[3]
		));
	}

	array_push($out, $thisEra);

}

$out = json_encode($out);

echo $out;
file_put_contents('data.json', $out);