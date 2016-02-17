<?php
// connexion
session_start();

// destruction des variables (optionnel)
session_unset();

// destruction
session_destroy();

// rediriger vers la page d'appel
header('Location: ' . $_SERVER['HTTP_REFERER']);
