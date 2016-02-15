<?php

include './classPage.php';

$introContent = <<<EOT
    
   <h1>Yeeaaaaaaa !!!!! </h1>
        
EOT;

$titles = array();
$contents = array();

$titles[] = "Services informatiques";
$contents[] = <<<EOT
     <ul>
      <li>Installation de systèmes d'exploitation libres, éthiques, sécurisés et
        qui respectent votre vie privée. </li>
      <ul>
        <li>Forfait OS Complet + outils de bureatiques + outils multimédia 80€</li>
        <li>Personnalisation et installations de matériels: imprimantes, ...</li>
        <li>Listes de suggestion d'OS:</li>
      </ul>
      <ul>
        <ul>
          <li>Pack Mint / Multimédia / Bureatique: Libreoffice, Vlc, ...</li>
          <li>Pack KUbuntu jeux: Environement graphique, Steam, ...</li>
          <li><br>
          </li>
        </ul>
      </ul>
      <li>Installation de logiciels sur Windows et Linux,</li>
      <li>Réinitialisations de systèmes et récupération de données,</li>
      <li>Récupération de données, réparation et configuration de systèmes
        d'exploitation,</li>
      <li>Conseil achat et développement</li>
    </ul>
EOT;

$titles[] = "Formation informatique";
$contents[] = <<<EOT
    <ul>
        <li>Formation aux taches courantes et tutoriels simples et clairs, </li>
        <li>Formation de bureautique avancée, logiciel libres, </li>
        <li>Initiation à la programmation et au web design, </li>
        <li>Création et configuration de machines virtuelles, essayer l'OS de
                votre choix sans dangers,</li>
              <li>Aide à la mise en place de portfolio modernes, pour un évenement par
                exemple</li>
            </ul>
          <li>   <b>Pack hébergement à domicile</b>
            <ul>
              <li>75€ de matériel + forfait installation (40€ ?), hébergement de vos
                sites web chez vous, </li>
              <li>Options: </li>
              <ul>
                <li>installation d'un service de cloud, </li>
        </ul></li>
    </ul>
EOT;

$titles[] = "A propos de l'auteur";
$contents[] = <<<EOT
    <ul>
        <li> Etudiant en informatique, Master 2,</li>
        <li> Licence de géographie à l'Université de Rennes II</li>
        <li> Développeur actif du logiciel de cartographie Abc-Map&nbsp;</li>
        <li> Compte GitHub: https://github.com/remipassmoilesel</li>
        <li> Passionné de photographie argentique: http://toutes-les-bulles-eclatent.fr</li>
    </ul>
EOT;

$page = new Page();
$page->setPageTitle("Services informatique");

$page->setIntroductionContent($introContent);

$page->setSectionTitles($titles);
$page->setSectionContents($contents);

$page->printPage();

