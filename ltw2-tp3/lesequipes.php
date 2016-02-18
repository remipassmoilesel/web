<?php

include './classHtmlPage.php';
include "./classDBManager.php";
include "./classFormTeam.php";

session_start();

// connexion à la base de données
$db = new DBManager();

function extractTeams($sex) {

    global $db;

    $rows = $db->query("SELECT * FROM equipes WHERE sexe LIKE \"%$sex%\";");

    $output = "";
    $model = <<<EOT
    <div style="border: solid 1px gray; margin: 10px; padding: 10px">
        <h4>%name% %championnat% </h4>
          <img src="images/%team-img%" style="float: none"/>
          <img src="images/%coach-img%" style="float: none"/>
          <ul>
            <li>Entraineur : %coach-name%</li>
            <li><a href="equipe.php?equipe=%name%">Composition</a></li>
            <li>Championnat
              <ul>
                <li><a href="%url-res%">Résultats dernière journée</a></li>
                <li><a href="%url-class%">Classement</a></li>
              </ul>
            </li>
          </ul>
          
         %modif-form%
    </div>
EOT;

    foreach ($rows as $c => $v) {
        $n = str_replace("%name%", $v['equipe_id'], $model);
        $n = str_replace("%championnat%", $v['championnat'], $n);
        $n = str_replace("%team-img%", $v['photo_e'], $n);
        $n = str_replace("%coach-img%", $v['photo_c'], $n);
        $n = str_replace("%coach-name%", $v['coach'], $n);
        $n = str_replace("%url-res%", $v['url_res'], $n);
        $n = str_replace("%url-class%", $v['url_classmnt'], $n);

        $form = "";
        if (isset($_SESSION['login'])) {
            $id = urlencode($v['equipe_id']);
            $form = <<<EOT
            <a href="manageTeams.php?action=delete&equipe_id=$id">Supprimer</a>
            <a href="manageTeams.php?action=edit&equipe_id=$id">Modifier</a>
EOT;
        }
        $n = str_replace("%modif-form%", $form, $n);


        $output .= $n;
    }

    return $output;
}

$mascHtml = extractTeams("m");
$femHtml = extractTeams("f");

$formTeam = "";
if (isset($_SESSION['login'])) {
    $ft = new FormTeam();
    $ft->setAction("add");
    $formTeam = $ft->getHtml();
}

// affichage du résultat
$content = <<<EOT
   <h2>Les équipes</h2>
   <a href="#newTeam">Ajouter une équipe</a>
        
   <h3>Equipes masculines</h3>
    $mascHtml
   
   <h3>Equipes féminines</h3>
    $femHtml
   
   <a id="newTeam" />
   <h3>Ajouter une équipe</h4>
   $formTeam
EOT;


$page = new HtmlPage();
$page->setContent($content);

if (isset($_SESSION['login'])) {
    $page->setIdentification($_SESSION['login']);
}

$page->printHtml();
