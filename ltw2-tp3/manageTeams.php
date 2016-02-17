<?php

include './classHtmlPage.php';
include './classDBManager.php';
include './classFormTeam.php';

session_start();

// si pas de requete ou pas identifié, rediriger vers la page d'appel
if (isset($_SESSION['login']) == false || isset($_GET['action']) == false) {
    // rediriger vers la page d'appel
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    exit;
}

$db = new DBManager();

if ($_GET['action'] == "add") {

    // verifier uniquement l'id
    if (isset($_GET['equipe_id']) == false || $_GET['equipe_id'] == "") {
        showErrorPage("Vous devez spécifier un nom pour l'équipe.");
    }

    // les informations à ajouter
    $labels = array(
        "equipe_id",
        "championnat",
        "sexe",
        "coach",
        "photo_c",
        "photo_e",
        "url_res",
        "url_classmnt");

    // les valeurs à insérer, vérifier que chaque champs a une valeur
    $values = array();
    foreach ($labels as $k => $v) {
        if (isset($_GET[$v])) {
            $values[] = $_GET[$v];
        } else {
            $values[] = "";
        }
    }

    // la representation PDO des valeurs
    $pi = array();
    foreach ($labels as $v) {
        $pi[] = "?";
    }

    // insertion
    $req = "INSERT INTO equipes(" . join(",", $labels) . ") VALUES(" . join(",", $pi) . ");";
    $db->secureReq($req, $values);

    // redirection vers la page d'appel
    header('Location: ' . $_SERVER['HTTP_REFERER']);
}

if ($_GET['action'] == "delete") {

    // verifier uniquement l'id
    if (isset($_GET['id']) == false || $_GET['id'] == "") {
        showErrorPage("Vous devez spécifier le nom de l'équipe.");
    }

    // suppression
    $req = "DELETE FROM equipes WHERE equipe_id=?;";
    $db->secureReq($req, array($_GET['id']));

    // redirection vers la page d'appel
    header('Location: ' . $_SERVER['HTTP_REFERER']);
}

if ($_GET['action'] == "edit") {

    // verifier uniquement l'id
    if (isset($_GET['id']) == false || $_GET['id'] == "") {
        showErrorPage("Vous devez spécifier le nom de l'équipe.");
    }

    $ft = new FormTeam();
    $ftHtml = $ft->getHtml();

    $content = <<<EOT
    <h1>Edition de l'équipe: ${_GET['id']}</h1>
    <p>$ftHtml</p>
    <a href="${_SERVER['HTTP_REFERER']}"><<< Précédent</a>
EOT;

    $page = new HtmlPage();
    $page->setContent($content);

    if (isset($_SESSION['login'])) {
        $page->setIdentification($_SESSION['login']);
    }

    $page->printHtml();
    exit;
}

function showErrorPage($msg) {

    $content = <<<EOT
    <h1>Erreur dans le formulaire</h1>
    <p>$msg</p>
    <a href="${_SERVER['HTTP_REFERER']}"><<< Précédent</a>
EOT;

    $page = new HtmlPage();
    $page->setContent($content);

    if (isset($_SESSION['login'])) {
        $page->setIdentification($_SESSION['login']);
    }

    $page->printHtml();
    exit;
}
