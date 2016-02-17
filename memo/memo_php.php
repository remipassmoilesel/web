<?php

// rediriger vers la page d'appel
header('Location: ' . $_SERVER['HTTP_REFERER']);

/**
 * Créer une classe
 */
class MyClass {

    // propriété publique
    public $prop1 = "I'm a class property!";
    public static $count = 0;

    public function __construct() {
        echo 'The class "', __CLASS__, '" was initiated!<br />';
    }

    public function __destruct() {
        echo 'The class "', __CLASS__, '" was destroyed.<br />';
    }

    public function __toString() {
        echo "Using the toString method: ";
        return $this->getProperty();
    }

    public function setProperty($newval) {
        $this->prop1 = $newval;
    }

    public function getProperty() {
        return $this->prop1 . "<br />";
    }

    /**
     * Méthode statique
     * @return type
     */
    public static function plusOne() {
        return "The count is " . ++self::$count . ".<br />";
    }

}

/**
 * Héritage
 */
class MyOtherClass extends MyClass {

    /**
     * Overrider le constructeur
     */
    public function __construct() {
        // appel du constructeur parent
        parent::__construct();
        echo "A new constructor in " . __CLASS__ . ".<br />";
    }

    /**
     * Appelée si usage du mot clef "clone"
     */
    public function __clone() {
        
    }

    public function newMethod() {
        echo "From a new method in " . __CLASS__ . ".<br />";
    }

    /**
     * Typage explicite, ne fonctionne pas avec les types simples.
     * @param MyClass $argument
     */
    public function doSomething(MyClass $argument) {
        echo "From a new method in " . __CLASS__ . ".<br />";
    }

}

// instanciation
$obj = new MyClass;

echo $obj->prop1;

// afficher les propriétés d'un objet
var_dump($obj);

// Destroy the object
unset($obj);

// instanciation dynamque
$typeUser = "SimpleUser";
$pers1 = new $typeUser(); // equivalent à new SimpleUser()
// appels statiques
do {
    echo MyClass::plusOne();
} while (MyClass::$count < 10);


// clonage d'objet
$pers2 = clone $pers1;

// connexion à une bdd
$db = new PDO('mysql:host=localhost;dbname=testdb;charset=utf8', 'username', 'password');

// gestion d'exceptions
try {
    $stmt = $db->query('hi'); //invalid query!
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $ex) {
    echo "An Error occured!"; //user friendly message
}

// Iterer un resultat de requette
foreach ($db->query('SELECT * FROM table') as $row) {
    echo $row['field1'] . ' ' . $row['field2']; //etc...
}

// stats
$row_count = $stmt->rowCount();
$affected_rows = mysql_affected_rows($result);

// prepare / execute
$stmt = $db->prepare("SELECT * FROM table WHERE id=? AND name=?");
$stmt->execute(array($id, $name));
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
