<?php

/**
 * Description of classHtmlPageStub
 *
 * @author remipassmoilesel
 */
class HtmlPage {

    private $content;
    private $connexionForm;

    public function __construct() {
        // chargement du squelette
        $this->pageStub = file_get_contents('stub.html');

        $this->connexionForm = <<<EOT
            <form action="connexion.php" method="post">
                Identifiant : <input type="text" size="16" name="login" />
                Mot de passe : <input type="password" size="16" name="passwd" />
                <input type="submit" value="Se connecter" />
            </form>	            
EOT;
    }

    public function setContent($str) {
        $this->content = $str;
    }

    public function printHtml() {
        // appliquer le copyright
        $output = str_replace("%content%", $this->content, $this->pageStub);
        $output = str_replace("%connexion-form%", $this->connexionForm, $output);

        echo $output;
    }

    public function setIdentification($login) {
        $this->connexionForm = <<<EOT
        <span style='background: black'>
              Bonjour <b>$login</b> ! 
              <a href="disconnect.php">Se déconnecter</a>
        </span>
EOT;
    }

}
