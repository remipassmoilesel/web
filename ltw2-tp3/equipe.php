<?php

include './classHtmlPage.php';

session_start();

$content = <<<EOT
    <section>
      <h1>Under construction ! <img src="./images/enConstruction.gif" /></h1>
    </section>    
EOT;

$page = new HtmlPage();
$page->setContent($content);

if (isset($_SESSION['login'])) {
    $page->setIdentification($_SESSION['login']);
}

$page->printHtml();
