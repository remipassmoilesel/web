
/* Selection par dates */
SELECT * FROM `traffic` WHERE `date` >= "2016-04-07 00:00:00" AND `date` <= "2016-04-08 00:00:00"

/* Afficher la structure d'une table */
describe nom_table;
--
-- -- Faire un dump
--
-- mysqldump -u user -p databasename –result-file=dump.sql
--
-- -- Exécuter une commande à partir d'un fichier
--
-- mysql> source file_name
-- shell> mysql --verbose < text_file
--
-- Montrer les bases de données

SHOW {DATABASES | SCHEMAS} [LIKE 'pattern' | WHERE expr]

-- Montrer les tables

SHOW TABLES db_name [LIKE 'pattern' | WHERE expr]

-- Utiliser une base de donnée

USE db_name;

CHAR_LENGTH(chaîne)
POSITION(chaîne IN source)
SUBSTRING(source FROM début FOR longueur)
UPPER(chaîne)
LOWER(chaîne)
chaîne1 || chaîne2 /* Concaténation de chaînes */
BETWEEN 1000 AND 1500
LIKE 'chaine de % ? _'     /* %=*, ?=., _=. */
IS NULL
SELECT COUNT(expr) FROM table ;
SELECT SUM(expr) FROM table ;
SELECT MIN(expr) FROM table ;
SELECT MAX(expr) FROM table ;
SELECT AVG(expr) FROM table ;
-- [DISTINCT | ALL] expr

-- Syntaxe complète de sélection

SELECT [DISTINCT] { * |
<nom_de_relation>,<nom_d’attribut> [AS] |
<nom_d’attribut>[AS] [, ...]
FROM [<nom_d’utilisateur>]<nom_de_relation> [AS] [, ...]
[WHERE <condition>]
[GROUP BY <nom_d’attribut> [, ...] [HAVING <condition>] ]
[ {UNION | INTERSECT | EXCEPT [ALL]}
<commande_SELECT>
[ ORDER BY {<nom_d’attribut> | <numéro_de_colonne>}
[{ASC | DESC}] [, ... ] ;

-- R3 : Donner le numéro, le nom et le prénom des vendeurs de Grenoble gagnant plus de 1500 €

SELECT N°Vendeur, Nom, Prénom
FROM VENDEUR
WHERE Base = 'Grenoble' and Salaire > 1500 ;

-- R5 : Donner les numéros des commandes réalisées par chaque vendeur de Grenoble

SELECT VENDEUR.N°Vendeur, N°Commande
FROM VENDEUR, COMMANDE
WHERE Base = 'Grenoble' and VENDEUR.N°Vendeur = COMMANDE.N°Vendeur ;

-- Produit Cartésien ou Jointure Croisée

SELECT * FROM VENDEUR, COMMANDE;

-- R9 : Donner les numéros des vendeurs qui sont mieux payés que le vendeur Durand

SELECT N°Vendeur
FROM VENDEUR AS MIEUXPAYES JOIN VENDEUR AS
DURAND on MIEUXPAYES.Salaire > DURAND.Salaire
WHERE DURAND.Nom = 'Durand' ;

-- R10 : Donner le nom des clients ou des vendeurs

SELECT Nom FROM VENDEUR
union
SELECT Nom FROM client ;

-- R12 : Donner la liste des numéros clients n'ayant pas de commande en cours

SELECT N°Client FROM client
except
SELECT N°Client FROM COMMANDE ;

-- R13 : Donner les clients de même nom que des vendeurs (alias)

SELECT V.Nom FROM VENDEUR V, client C
WHERE V.Nom = C.Nom ;

-- R15 : Donner la liste des villes des vendeurs

SELECT Base AS Ville FROM VENDEUR ;

-- Opérateur IN : R16 : Donner les numéro et date des commandes effectuées par la société JCN par l'intermédiaire de vendeurs Lyonnais

SELECT N°Commande, DateCommande FROM COMMANDE
WHERE N°Client IN
(SELECT N°Client FROM client WHERE Société='JCN')
and N°Vendeur IN
(SELECT N°Vendeur FROM VENDEUR WHERE Base = 'Lyon') ;

-- Opérateur ANY : R17 : Donner les nom et prénom des vendeurs grenoblois dont le salaire est supérieur à celui d'au moins un vendeur lyonnais

SELECT Nom,Prénom FROM VENDEUR
WHERE Base = 'Grenoble'
and Salaire > any
(SELECT Salaire FROM VENDEUR WHERE Base = 'Lyon') ;

-- Opérateur NOT IN :
SELECT Nom,Prénom
FROM VENDEUR WHERE Base
not IN ('Grenoble', 'LYON') ;
/* ou */
not IN (SELECT Nom FROM client) ;

-- Opérateur ALL : R20 : Donner les nom et prénom du (des) vendeur(s) le mieux payé

SELECT distinct Nom,Prénom FROM VENDEUR
WHERE Salaire >=
all (SELECT Salaire FROM VENDEUR);
/* vrai si salaire ≥ à tous les éléments entre parenthèses */
Opérateur EXIST : R21 : Donner la liste des clients qui ont au moins une commande en cours

SELECT distinct N°Client
FROM client Cl WHERE
exists (SELECT * FROM COMMANDE Co WHERE Co.N°Client = Cl.N°Client);

/* Possible « not exist ». Vrai si renvoie au moins un tuple. */

-- R29 : Nombre de villes où sont basés les vendeurs

SELECT count(DISTINCT Base) FROM  VENDEUR ;

-- R31 : Donner la moyenne des salaires des vendeurs de chaque localité

SELECT Base, avg(Salaire) FROM VENDEUR
group by Base;

-- R33 : Donner pour chaque client ayant effectué au moins 5 comandes son
-- numéro, sa société et le nombre de commandes effectuées

SELECT Société, N°Client, count(*) FROM client, COMMANDE
WHERE client.N°Client = COMMANDE.N°Client
group by Société, N°Client
having count(*) > 5;

-- R35 : Donner le salaire annuel de chaque vendeur gagnant plus de 30000 € (le résultat sera ordonné par nom et prénom croissants et salaire décroissant)

SELECT Nom, Prénom, Salaire * 12
FROM VENDEUR
WHERE Salaire > 30000
ORDER BY Nom ASC, Prénom ASC, Salaire DESC ;

-- Syntaxe complète

INSERT [INTO] nom_de_la_table_cible
[(liste_des_colonnes_visées)]
{VALUES (liste_des_valeurs) | requête_SELECT | DEFAULT
VALUES }

-- R36 : ajouter un nouveau vendeur

INSERT INTO VENDEUR (N°Vendeur, Nom, Prénom, DateEmbauche, Base, Salaire)
VALUES(1234, 'Martin', 'Auguste', '16_oct_72', 'Grenoble', 1800);

-- R38 : Tranférer les vendeurs grenoblois dans la nouvelle table créée à
-- cet effet (interdit à partir de la table de destination)

INSERT INTO VENDEUR_GRENOBLOIS
SELECT Nom, Prénom FROM VENDEUR WHERE Base = 'Grenoble';

-- Syntaxe complète

DELETE [ <element > ] FROM < nom_de_relation > [WHERE ... ]

-- R45 : Créer la table client

CREATE table client
	(N°Client integer,
	Société char(30),
	Nom char(20),
	Prénom char(20),
	UNIQUE (Nom, Prénom)
	PRIMARY KEY (N°Client)) ; /* clef primaire */

-- Avec une clef primaire

CREATE table client_SANS_NUMERO
	(Société char(30),
	Nom char(20),
	Prénom char(20),
	CONSTRAINT CLEF_NOM_PRENOM PRIMARY KEY
	(Nom, Prenom)) ;
	/* ATTENTION : nécessite que chaque colonne concourrant à la clef 	soit NOT NULL. */
