<?php

include './classPage.php';

$introContent = <<<EOT
    
   <h1>Bienvenue !</h1>
   <p>Etudiant en Master 2 d'informatique et passionné de technologies de l'information, 
       n'hésitez pas à me contacter aux coordonnées situées en bas de 
       page pour me proposer vos projets.<p>
   
   <p>
       <a href="#section0" class="button scrolly">En savoir plus</a>        
   </p>
   
        
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
$osDescriptions[] = "<b>Kubuntu</b> est un OS dérivé de Linux Ubuntu. Multimédia, bureautique, jeux, les 
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
            <p><a href="images/%imageSrc" 
                data-lightbox="image-%c" 
                    data-title="Image %c">
                        <img style='width: 75%; padding-left: 15%' src="images/%imageSrc"/></a>
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
        
    <p>Donnez un coup de neuf à votre PC pour le rendre plus performant, 
        même si il n'est pas tout jeune. Profitez de systèmes d'exploitation 
            libres et éthiques, qui respectent votre vie privée. Les logiciels libres sont variés, 
            adaptés aux usages numériques quotidiens, fiables et puissants.</p>
    
        $selectionOs
        
EOT;

$titles[] = "Services";
$contents[] = <<<EOT
        
<div>
     <h3>Forfait OS Complet</h3>
     <ul>
        <li>Choix de l'OS et de son environnement graphique: Mint, Ubuntu, Fedora, ...</li>
        <li>Choix des packs d'application: multimédia, éducation, 
            bureautique, jeux, programmation, </li>
        <li>Personnalisation et installation de matériels: imprimantes, scanners,
            webcams, ...</li>
     </ul>

     <h3>Liste d'applications installées:</h3>
     <ul>
        <li>Firefox et Chromium, deux navigateurs performants, avec bloqueurs de publicité</li>
        <li>Lecteur vidéo VLC Média Player, lecteur audio Audacious,</li>
        <li>Suite Libre Office: découvrez la suite bureautique qui ouvre 
            le plus grand nombre de formats différents (Writer, Calc, Draw, Base, 
                Math),</li>
        <li>Les logiciel de graphisme Pinta, Inkscape, The Gimp, LibreOffice Draw, pour satisfaire tous 
            les besoins, des plus basiques aux plus avancés,</li>
        <li>Virtualbox, pour tester n'importe quel OS sans danger,</li>
        <li>GnuPG, Tor, et un wallet BitCoin pour protéger votre vie privée.</li>
      </ul>
        
    </div>
    <div>
        <h3>Interventions personnalisées:</h3>
       <ul>
        <li><b>Réparation / récupération de données:</b> données supprimées accidentellement, 
            problèmes de démarage et réparation de boot, ... </li>
        <li><b>Installation de logiciels adaptés à toutes activités:</b> 
             bureautiques, éducation, programmation, photographie, et plus. 
                 Sur systèmes Windows et Linux,</li>
        <li>Mise à jour / nettoyage anti-virus et programmes publicitaires,</li>
        <li>Installations de matériels: disques SSD, ajout de mémoire vide, scanners, imprimantes, webcam, ...</li>
        <li>Conseil achat.</li>
      </ul>
    </div>
EOT;

$titles[] = "Formation";
$contents[] = <<<EOT
    <p>
        <ul>
            <li>Pack 2h formation aux tâches courantes et mise en place de tutoriels simples et clairs, </li>
            <li>Pack 1h formation à la protection de la vie privée sur internet, </li>
            <li>Formation de bureautique avancée, </li>
            <li>Initiation à la création de sites web: HTML5, PHP, Java, installation de serveurs, installation de CMS (Wordpress, 
                Zenfolio, wikis, ...), mise en ligne, ...</li>
            <li>Initiation à la programmation et à l'administration distante de systèmes Linux,</li>
            <li>Veille technologique: virtualisation, Docker, Java EE, serveurs d'applications, Git, ...</li>
        </ul>
        <ul>
            <li><b>Pack auto-hébergement:</b> à partir de 45€ de matériel + 
                forfait installation, hébergez vos sites web chez vous, pour 
                    7€ d'électricité par an,</li>
            <li>Installation de services sur demande en option: cloud, virtualisation, PHP, 
                MySQL, PostgreSQL, Java EE, ...</li>
        </ul>
    </p>
EOT;

$links = array();
$links[] = array("Compte GitHub", "https://github.com/remipassmoilesel");
$links[] = array("Logiciel de cartographie Abc-Map", "http://abc-map.fr");
$links[] = array("Photographie argentique", "http://toutes-les-bulles-eclatent.fr");
$links[] = array("Interview sur le Framablog", "http://framablog.org/2015/03/06/abc-map-realisez-des-cartes-et-des-traces-facilement/");

function getLinksHtml() {

    global $links;

    $output = "";

    foreach ($links as $c => $v) {
        $output .= "<li>$v[0]: <a target='_blank' href='$v[1]'>$v[1]</a></li>";
    }

    return $output;
}

$linksHtml = getLinksHtml();


$titles[] = "A propos";
$contents[] = <<<EOT
    <div>
        <p> Rémi Pace, étudiant en Master 2 d'informatique,
        <br>Licence de géographie à l'Université de Rennes II,
        <br>Développeur actif du logiciel de cartographie Abc-Map.</p>

        <ul>
            $linksHtml
        </ul>
        
        <p>
            <a class="button scrolly">remi.pace88[#]gmail.com</a>
            <a class="button scrolly">06 58 15 37 86</a>
        </p>
        
    </div>   
EOT;

$page = new Page();
$page->setPageTitle("Services informatiques");

$page->setIntroductionContent($introContent);

$page->setSectionTitles($titles);
$page->setSectionContents($contents);

$page->setCopyrightMention("<a href='https://creativecommons.org/licenses/by-sa/4.0/legalcode'>CC BY-SA</a>");

$page->printPage();

