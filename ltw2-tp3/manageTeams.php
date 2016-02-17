<?php

include './classHtmlPage.php';
include './classDBManager.php';
include './classFormTeam.php';

// récupérer les informations de la session
session_start();

// si pas de requete ou utilisateur pas identifié, rediriger vers la page d'appel
if (isset($_SESSION['login']) == false || isset($_GET['action']) == false) {
    // rediriger vers la page d'appel
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    exit;
}

// verifier l'id de l'équipe
if (isset($_GET['equipe_id']) == false || $_GET['equipe_id'] == "") {
    showErrorPage("Vous devez spécifier le nom de l'équipe.");
}

// connexion à la BDD
$db = new DBManager();

/*
 * Ajout d'équipe
 */
if ($_GET['action'] == "add") {

    // lister les valeurs à insérer, et vérifier que chaque champ a une valeur
    $labels = array();
    $values = array();
    foreach (FormTeam::$fields as $k => $v) {
        $labels[] = $k;
        if (isset($_GET[$k])) {
            $values[] = $_GET[$k];
        } else {
            $values[] = "";
        }
    }

    // representation PDO des valeurs
    $pi = array();
    foreach ($labels as $v) {
        $pi[] = "?";
    }

    // construction de la requête
    $req = "INSERT INTO equipes(" . join(",", $labels) . ") VALUES(" . join(",", $pi) . ");";

    // insertion
    $db->secureReq($req, $values);

    // redirection vers la page d'appel
    header('Location: ' . $_SERVER['HTTP_REFERER']);
}

/*
 * Suppression d'une équipe
 */
if ($_GET['action'] == "delete") {

    // suppression
    $req = "DELETE FROM equipes WHERE equipe_id=?;";
    $db->secureReq($req, array($_GET['equipe_id']));

    // redirection vers la page d'appel
    header('Location: ' . $_SERVER['HTTP_REFERER']);
}

/*
 * Affichage d'un formulaire de modification
 */
if ($_GET['action'] == "edit") {

    // récuperer l'entrée à modifier
    $rawRes = $db->secureReq("SELECT * FROM equipes WHERE equipe_id=?;", array(urldecode($_GET['equipe_id'])));
    $rawRes = $rawRes->fetchAll();

    // pas d'entrée correspondante, erreur
    if (sizeof($rawRes) < 1) {
        showErrorPage("Nom d'équipe incorrect");
    }

    // protéger les données
    $resDecoded = array();
    foreach ($rawRes[0] as $k => $v) {
        $resDecoded[$k] = addslashes($v);
    }

    // créer un formulaire
    $ft = new FormTeam();
    $ft->setAction("update");
    $ft->disableId(True);
    $ft->setValues($resDecoded);
    $ftHtml = $ft->getHtml();

    // contenu de la page à afficher
    $content = <<<EOT
            
        <h1>Edition de l'équipe: ${_GET['equipe_id']}</h1>
    
        <p>$ftHtml</p>
   
        <a href="${_SERVER['HTTP_REFERER']}"><<< Précédent</a>
   
EOT;

    // affichage de la page
    $page = new HtmlPage();
    $page->setContent($content);

    if (isset($_SESSION['login'])) {
        $page->setIdentification($_SESSION['login']);
    }

    $page->printHtml();
    exit;
}

/**
 * Mise à jour d'une équipe
 */
if ($_GET['action'] == "update") {

    // construire la requete
    $parts = array();
    $values = array();
    foreach (FormTeam::$fields as $k => $v) {
        if (isset($_GET[$k])) {
            $parts[] = $k . "=?";
            $values[] = $_GET[$k];
        }
    }

    // Mise à jour
    if (sizeof($values) > 0) {

        $values[] = $_GET['equipe_id'];
        $req = "UPDATE equipes SET " . join(", ", $parts) . " WHERE equipe_id=?;";

        // récuperer l'entrée à modifier
        $db->secureReq($req, $values);
    }

    // Affichage 
    $content = "<h1>Modifications enregistrées ! </h1>"
            . "<a href='lesequipes.php'><<< Retour à la liste d'équipes</a>";

    $page = new HtmlPage();
    $page->setContent($content);

    if (isset($_SESSION['login'])) {
        $page->setIdentification($_SESSION['login']);
    }

    $page->printHtml();
    exit;
}

/**
 * Affiche une page d'erreur et quitte
 * @param type $msg
 */
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
