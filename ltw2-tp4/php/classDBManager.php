<?php

class DBManager {

    public function __construct() {
        $host = "localhost";
        $user = "root";
        $pass = "";
        $dbName = "search_engine";

        // connexion à une bdd
        $this->db = new PDO("mysql:host=$host;dbname=$dbName;charset=utf8", $user, $pass);

        // obtenir des exceptions à chaque erreur
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function getConnexion() {
        return $this->db;
    }

    public function query($statement) {
        return $this->db->query($statement);
    }

    public function secureReq($statement, $values) {
        $stmt = $this->db->prepare($statement);
        $stmt->execute($values);
        return $stmt;
    }

}
