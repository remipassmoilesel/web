<?php

include './classHtmlPage.php';

// Login et mdp OK
if (loginOK($_POST['login'], $_POST['passwd'])) {
    
    session_start();
    $_SESSION['login'] = $_POST['login'];

    // rediriger vers la page d'appel
    header('Location: ' . $_SERVER['HTTP_REFERER']);
} 

// Erreur
else {
    
    session_start();
    session_destroy();

    $content = <<<EOT
    <h1>Erreur d'identification</h1>
    <a href="${_SERVER['HTTP_REFERER']}"><<< Précédent</a>
EOT;
    
    $page = new HtmlPage();
    $page->setContent($content);
    $page->printHtml();

}

/* Vérifie la combinaison nom/mot de passe et renvoie 
  true si elle est OK, false sinon
  Pour le moment on n'utilise pas de base de données.
  le évrification est codée en "dur" */

function loginOK($login, $passwd) {
    return (($login == "toto") && ($passwd == "toto"));
}
