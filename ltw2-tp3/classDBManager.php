<?php

/**
 * Description of dbmanager
 *
 * @author remipassmoilesel
 */
class DBManager {

    private $connexion;

    public function __construct() {
        $this->connexion = new PDO('mysql:host=localhost;dbname=ltw2_ffcb;charset=utf8', 'root', '');
    }

    public function getConnexion() {
        return $this->connexion;
    }

    public function query($statement) {
        return $this->connexion->query($statement);
    }

    public function secureReq($statement, $values) {
        $stmt = $this->connexion->prepare($statement);
        $stmt->execute($values);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}
