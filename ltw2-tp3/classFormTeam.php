<?php

class FormTeam {

    private $formHtml;

    public function __construct() {
        $this->formHtml = <<<EOT
    <form method = "GET" action = "manageTeams.php">
        <br/><label>Nom de l'équipe: </label><input type="text" name="equipe_id" />
        <br/><label>Championnat: </label><input type="text" name="championnat" />
        <br/><label>Sexe: </label><input type="text" name="sexe" />
        <br/><label>Nom de l'entraineur: </label><input type = "text" name = "coach" />
        <br/><label>Photo du club: </label><input type = "text" name = "photo_c" />
        <br/><label>Photo de l'équipe: </label><input type="text" name="photo_e" />
        <br/><label>Url résultats: </label><input type="text" name="url_res" />
        <br/><label>Url classement: </label><input type="text" name="url_classmnt" />
        <br/><input type="submit"/>
        <input type="hidden" name="action" value="add"/>
    </form>
EOT;
    }

    public function getHtml() {
        return $this->formHtml;
    }

}
