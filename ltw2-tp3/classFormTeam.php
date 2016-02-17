<?php

class FormTeam {

    public static $fields = array(
        "equipe_id" => "Nom de l'équipe",
        "championnat" => "Championnat",
        "sexe" => "Sexe (M/F)",
        "coach" => "Nom de l'entraineur",
        "photo_c" => "Photo de l'entraineur",
        "photo_e" => "Photo de l'équipe",
        "url_res" => "Résultats",
        "url_classmnt" => "Classement");
    private $values;
    private $action;
    private $disableId = False;

    public function __construct() {
        
    }

    public function setValues($arrayValues) {
        $this->values = $arrayValues;
    }

    public function disableId($booleanVal) {
        $this->disableId = $booleanVal;
    }

    public function setAction($strAction) {
        $this->action = $strAction;
    }

    public function getHtml() {

        $output = "<form  action='manageTeams.php' mehod='GET'><table>";

        foreach (self::$fields as $k => $v) {

            $disabled = "";
            if ($this->disableId && $k == "equipe_id") {
                $disabled = "readonly";
            }

            $val = "";
            if (isset($this->values[$k])) {
                $val = $this->values[$k];
            }

            $output .= "<tr><td>$v:</td><td><input type='text' name='$k' value='$val' $disabled /></td></tr>";
        }

        $output .= "<tr><td>&nbsp;</td><td><input type='hidden' name='action' value=\"$this->action\" /></td></tr>";
        $output .= "<tr><td>&nbsp;</td><td><input type='submit' /></td></tr>";
        $output .= "</table></form>";

        return $output;
    }

}
