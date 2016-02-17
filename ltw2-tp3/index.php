<?php

include './classHtmlPage.php';

session_start();

$content = <<<EOT
        <h2>Bienvenue sur la page d'accueil du FCCB</h2>
EOT;

$page = new HtmlPage();
$page->setContent($content);

if(isset($_SESSION['login'])){
    $page->setIdentification($_SESSION['login']);
}

$page->printHtml();
