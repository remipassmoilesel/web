<?php

include './classPage.php';

$introContent = <<<EOT
    
    <h1>Bienvenue !</h1>
        
    <div>
        <p>Etudiant en Master 2 d'informatique et passionné de technologies de l'information, 
            n'hésitez pas à me contacter aux coordonnées situées en bas de 
            page pour me proposer vos projets.<p>

        <p><a href="#section5" class="button scrolly">En savoir plus</a></p>
    </div>
        
EOT;

$titles = array();
$contents = array();

$titles[] = "Prestations";
$contents[] = <<<EOT
        <div>
            <p><b>Dépannage</b> et interventions sur systèmes Windows et Linux:</p>
            <ul>
                 <li>Correction des problèmes de démarrage,</li>
                 <li>Réintialisation de systèmes,</li>
                 <li>Récupération de données,</li>
                 <li>Mise à jour / nettoyage anti-virus et programmes publicitaires,</li>
                 <li>Configuration avancée,</li>
                 <li>Mise en place de réseaux locaux,</li>
                 <li>Installation de périphériques et améliorations matérielles 
                     (mémoire RAM, disques SSD, ...)</li>
            </ul>
            
            <p><b>Installation</b> de systèmes d'exploitation complets:</p>
            <ul>
               <li>Choix de la distribution et de son environnement graphique: Mint, Ubuntu, Fedora, ...</li>
               <li>Choix des packs d'application: multimédia, éducation, 
                   bureautique, jeux, programmation, </li>
               <li>Personnalisation et installation de matériels: imprimantes, scanners,
                   webcams, ...</li>
            </ul>
        
            <p><b>Pack d'applications libres</b> sur Windows et Linux. Installation de logiciels adaptés à toutes 
                activités: bureautique, éducation, programmation, photographie, et plus:</p>
            <ul>
               <li>Firefox et Chromium, deux navigateurs performants, avec bloqueurs de publicité,</li>
               <li>Lecteur vidéo VLC Média Player, lecteur audio Audacious,</li>
               <li>Suite Libre Office: découvrez la suite bureautique qui ouvre 
                   le plus grand nombre de formats différents (Writer, Calc, Draw, Base, 
                       Math),</li>
               <li>Les logiciel de graphisme Pinta, Inkscape, The Gimp, LibreOffice Draw, pour satisfaire tous 
                   les besoins, des plus basiques aux plus avancés,</li>
               <li>Virtualbox, pour tester n'importe quel OS sans danger,</li>
               <li>GnuPG, Tor, et wallets BitCoin pour protéger votre vie privée.</li>
             </ul>
            
        </div>
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

$titles[] = "Installation d'OS libres";
$contents[] = <<<EOT

    <div>
       <p>Installez un nouveau système d'exploitation pour donner un coup de neuf à votre PC et
           le rendre plus performant, même si il n'est pas tout jeune. Profitez de systèmes d'exploitation 
                libres et éthiques, qui respectent votre vie privée. Les logiciels libres sont variés, 
                adaptés aux usages numériques quotidiens.</p>

            $selectionOs
        
    </div>
        
EOT;

$titles[] = "Pack auto-hébergement";
$contents[] = <<<EOT

    <div>
        <p><b>Reprenez le contrôle de vos données !</b> Hébergez vos sites et vos données personnelles
            grâce à des applications libres et robustes. Sur demande, formation complète à l'installation 
                et à l'utilisation des applications. Ce site ainsi que 
                d'autres services utilisés quotidiennement sont installés sur un hébergement personnel.</p>
        
        <p>Pack formation à l'auto-hébergement: à partir de 45€ de matériel + 
                forfait installation, hébergez vos sites web chez vous sans frais supplémentaires et
            sans limites de durée, pour 7€ d'électricité par an. Plusieurs applications disponibles
                sur demande: </p>


            <ul>
                <li>OwnCloud: Découvrez la plateforme libre de stockage de données en ligne. Avec une interface 
                    épurées, uploadez vers votre propre plateforme personnelle en ligne tous vos documents.</li>
                <li>Installez un wiki, un forum, un Wordpress ou tout autre CMS ...</li>
                <li>Phplist: gérer votre liste mail d'information pour garder le lien avec votre public,</li>
                <li>Développez vos propres applications: PHP, MySQL/MariaDB, virtualisation et conteneurs Docker, 
                    Java EE, PostgreSQL, ...</li>
            </ul>

            <p>Solutions entièrement libres et hautement extensibles !</p>
    </div>

EOT;


$titles[] = "Formation";
$contents[] = <<<EOT
        <div>
            <ul>
                <li>Pack 2h formation aux tâches courantes et mise en place de tutoriels simples et clairs, </li>
                <li>Pack 1h formation à la protection de la vie privée sur internet, </li>
                <li>Formation de bureautique avancée, </li>
                <li>Initiation à la création de sites web: HTML5, PHP, Java, installation de serveurs, installation de CMS (Wordpress, 
                    Zenfolio, wikis, ...), mise en ligne, ...</li>
                <li>Initiation à la programmation et à l'administration distante de systèmes Linux,</li>
                <li>Veille technologique: virtualisation, Docker, Java EE, serveurs d'applications, Git, ...</li>
            </ul>
        </div>
EOT;

$titles[] = "Tarifs";
$contents[] = <<<EOT
        <div>
            <ul>
                <li>...</li>
            </ul>
        </div>
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
            <a class="button special disabled">remi.pace88[#]gmail.com</a>
            <a class="button special disabled">06 58 15 37 86</a>
        </p>
        
    </div>   
EOT;

$page = new Page();
$page->setPageTitle("Services Libre-Info !");

$page->setIntroductionContent($introContent);

$page->setSectionTitles($titles);
$page->setSectionContents($contents);

$page->setCopyrightMention("<a href='https://creativecommons.org/licenses/by-sa/4.0/legalcode'>CC BY-SA</a>");

$page->printPage();

