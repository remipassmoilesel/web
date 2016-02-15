<?php

include './classPage.php';

$titles = array();
$contents = array();

$titles[] = "Section 1";
$contents[] = "Contenu de la section 1";

$titles[] = "Section 2";
$contents[] = "Contenu de la section 2";


$page = new Page();
$page->setTitles($titles);
$page->setContents($contents);

$page->printPage();

