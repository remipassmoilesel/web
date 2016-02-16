<?php

include './classPage.php';

$introContent = <<<EOT
    
   <h1>Yeeaaaaaaa !!!!! </h1>
        
EOT;

$osImages = array();
$osDescriptions = array();

$osImages[] = "visuel_mint.png";
$osDescriptions[] = " <b>Linux Mint</b> est un environnement multimédia complet, profitez "
        . "d'une expérience fluide sur toutes les machines, même anciennes.";

$osImages[] = "visuel_elementary.png";
$osDescriptions[] = "<b>Elementary OS</b> est un environnement épuré tourné vers une expérience "
        . "ludique et créative. Le dock en bas de l'écran rassemble les applications et libère l'utilisateur "
        . "des menus déroulants.";

$osImages[] = "visuel_kubuntu.png";
$osDescriptions[] = "<b>KUbuntu</b> est un OS dérivé de Linux Ubuntu. Multimédia, bureautique, jeux, les 
    applications sont inombrables et l'environnement graphique est hautement personnalisable. De nombreux
    thèmes graphiques circulent sur les listes .... ";

$osImages[] = "visuel_store.png";
$osDescriptions[] = "<b>Profitez du store Ubuntu</b>, choisissez et installez des applications de qualité "
        . "en un clic.";

function getOSselection() {

    global $osImages;
    global $osDescriptions;

    $output = "";

    $model = <<<EOT
        <section>
            <p>%description</p>
            <p><a href="images/%imageSrc" data-lightbox="image-%c" data-title="Image %c"><img src="images/%imageSrc"/></a>
            <p>&nbsp;</p>
        </section>
EOT;

    foreach ($osImages as $c => $v) {

        $n = str_replace("%imageSrc", $v, $model);
        $n = str_replace("%c", $c + 1, $n);
        $n = str_replace("%description", $osDescriptions[$c], $n);
        $output .= $n;
    }

    return $output;
}

$selectionOs = getOSselection();

$titles = array();
$contents = array();

$titles[] = "Installation d'OS libres";
$contents[] = <<<EOT
        
    <p>Installation de systèmes d'exploitation libres et éthiques, 
        qui respectent votre vie privée. Les logiciels libres sont variés, 
            adaptés aux usages numériques quotidiens, fiables et puissants.</p>
    
        $selectionOs
        
    <div>
     <h3>Forfait OS Complet</h3>
     <ul>
        <li>Choix de l'OS: Mint, Ubuntu, Fedora, ...</li>
        <li>Choix des packs d'application: multimédia, éducation, 
            bureautique, jeux, programmation, </li>
        <li>Personnalisation et installation de matériels: imprimantes, scanners,
            webcams, ...</li>
     </ul>

     <h3>Liste d'applications installées:</h3>
     <ul>
        <li>Firefox et Chromium, deux navigateurs performants, avec bloqueurs de publicité</li>
        <li>Lecteur VLC Média Player</li>
        <li>Suite Libre Office: découvrez la suite bureautique qui ouvre 
            le plus grand nombre de formats différents (Writer, Calc, Draw, Base, 
                Math)</li>
        <li>Logiciel de dessin vectoriel Inkscape</li>
        <li>The Gimp</li>
        <li>Virtualbox, pour tester n'importe quel OS sans danger,</li>
        <li>GnuPG, Tor, et un wallet BitCoin pour protéger votre vie privée,</li>
      </ul>
        
    </div>
EOT;
$titles[] = "Services";
$contents[] = <<<EOT
    <p>
       <ul>
        <li><b>Réparation / récupération de données:</b> données supprimées accidentellement, 
            problèmes de démarage et réparation de boot, ... </li>
        <li><b>Installation de logiciels adaptés à toutes activités:</b> 
             bureautiques, éducation, programmation, photographie,  
                 sur systèmes Windows et Linux,</li>
        <li>Mise à jour / nettoyage virus et publicités,</li>
        <li>Installations de matériels: disques SSD, scanners, imprimantes, webcam, ...</li>
        <li>Conseil achat.</li>
      </ul>
    </p>
EOT;

$titles[] = "Formation";
$contents[] = <<<EOT
    <p>
        <ul>
            <li>Formation aux tâches courantes et tutoriels simples et clairs, </li>
            <li>Formation de bureautique avancée, </li>
            <li>Initiaition à la création de sites web, et à l'installation de CMS: Wordpress, 
                Zenfolio, wikis, ...</li>
            <li>Initiation à la programmation, </li>
            <li>Veille technologique: virtualisation, Docker, Git, Java EE, serveurs, ...</li>
            <li>Aide à la mise en place de portfolios modernes, pour un évenement par
              exemple</li>
        </ul>
        <ul>
            <li><b>Pack hébergement à domicile:</b> à partir de 45€ de matériel + 
                forfait installation, hébergez vos sites web chez vous, pour 
                    7€ d'électricité par an</li>
            <li>Installation de services en option: cloud, virtualisation, PHP, 
                MySQL, PostgreSQL, Java EE, ...</li>
        </ul>
    </p>
EOT;

$titles[] = "A propos";
$contents[] = <<<EOT
    <p>
        <p> Rémi Pace, étudiant en Master 2 d'informatique,
        <br>Licence de géographie à l'Université de Rennes II,
        <br>Développeur actif du logiciel de cartographie Abc-Map.</p>

        <ul>
            <li> Compte GitHub: https://github.com/remipassmoilesel</li>
            <li> Logiciel de cartographie Abc-Map: http://abc-map.fr</li>
            <li> Photographie argentique: http://toutes-les-bulles-eclatent.fr</li>
        </ul>
        
        <p>&nbsp;</p>
        <p>Interview sur le Framablog: 
            http://framablog.org/2015/03/06/abc-map-realisez-des-cartes-et-des-traces-facilement/<p>
    </p>   
EOT;

$page = new Page();
$page->setPageTitle("Services informatiques");

$page->setIntroductionContent($introContent);

$page->setSectionTitles($titles);
$page->setSectionContents($contents);

$page->setCopyrightMention("<a href='https://creativecommons.org/licenses/by-sa/4.0/legalcode'>CC BY-SA</a>");

$page->printPage();

