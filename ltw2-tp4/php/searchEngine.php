<?php

include "./classDBManager.php";

$QUERY_ARG = "q";


/**
 * Verifier l'existence de la requete
 */
if (isset($_GET[$QUERY_ARG]) && $_GET[$QUERY_ARG] != "") {

    // parser la requete et la transformer en sql   
    $kwords = split(" +", $_GET[$QUERY_ARG]);
    $kwordsSql = "%" . join("%", $kwords) . "%";
    // $kwordsSql = "(" . join("|", $kwords) . ")+";
    // connexion et requete
    $db = new DBManager();
    //$res = $db->query("SELECT * FROM articles WHERE name REGEXP '$kwordsSql' OR article REGEXP '$kwordsSql';");
    $res = $db->query("SELECT * FROM articles WHERE name LIKE '$kwordsSql' OR article LIKE '$kwordsSql' ORDER BY VISITS DESC LIMIT 20;");
    $res = $res->fetchAll(PDO::FETCH_ASSOC);

    // affichage du résultat
    $output = "";

    if (sizeof($res) > 0) {
        foreach ($res as $k => $v) {

            $shortArticle = substr($v["article"], 0, 200) . "...";

            $output .= <<<EOT
    <div class="resultPiece">
            <div class="articleTitle">{$v["name"]} (lasts visits: {$v["visits"]})</div>
            <div class="article">$shortArticle</div>
            <div class="linkArticle"><a href="php/r.php?id={$v["id"]}">Visit '{$v["name"]}'</a></div>
    </div>
EOT;
        }
    } 
    
    /** Aucun résultat n'a été trouvé */
    else {
        $output = <<<EOT
            <div class='errorResponse'>
                No results found.
            </div>
EOT;
        
    }
    
    echo $output;
}


/**
 * Pas de requete, message standard
 */
//
else {
     echo <<<EOT
            <div class='errorResponse'>
                Type in search parameter.
            </div>
EOT;
}

