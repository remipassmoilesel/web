create database search_engine;
use search_engine;

create table articles (
   id int(11) NOT NULL AUTO_INCREMENT,
   name varchar(120),
   article text,
   visits int(11),
   PRIMARY KEY (id)
 );

insert into articles (name, article, visits) values (
  'php',
  "PHP: Hypertext Preprocessor, plus connu sous son sigle PHP (acronyme récursif), est un langage de programmation libre principalement, utilisé pour produire des pages Web dynamiques via un serveur HTTP, mais pouvant également fonctionner comme n'importe quel langage interprété de façon locale. PHP est un langage impératif orienté objet comme C++.",
  '1'
);

insert into articles (name, article, visits) values (
  'ajax',
  "L'architecture informatique Ajax (acronyme d'Asynchronous JavaScript and XML) permet de construire des applications Web et des sites web dynamiques interactifs sur le poste client en se servant de différentes technologies ajoutées aux navigateurs web entre 1995 et 2005. Ajax combine JavaScript, les CSS, JSON, XML, le DOM et le XMLHttpRequest afin d'améliorer maniabilité et confort d'utilisation des Applications Internet Riches (abr. RIA) : DOM et JavaScript permettent de modifier l'information présentée dans le navigateur en respectant sa structure ; L'objet XMLHttpRequest sert au dialogue asynchrone avec le serveur Web ; XML structure les informations transmises entre serveur Web et navigateur. Outre le XML, les échanges de données entre client et serveur peuvent utiliser d'autres formats, tels que JSON. Les applications Ajax fonctionnent sur tous les navigateurs Web courants : Mozilla Firefox, Internet Explorer, Konqueror, Google Chrome, Safari, Opera, etc.",
  '1'
);

insert into articles (name, article, visits) values (
  'html',
  "L'Hypertext Markup Language, généralement abrégé HTML, est le format de données conçu pour représenter les pages web. C'est un langage de balisage permettant d'écrire de l'hypertexte, d'où son nom. HTML permet également de structurer sémantiquement et de mettre en forme le contenu des pages, d'inclure des ressources multimédias dont des images, des formulaires de saisie, et des programmes informatiques. Il permet de créer des documents interopérables avec des équipements très variés de manière conforme aux exigences de l'accessibilité du web. Il est souvent utilisé conjointement avec des langages de programmation (JavaScript) et des formats de présentation (feuilles de style en cascade). HTML est initialement dérivé du Standard Generalized Markup Language (SGML).",
  '1'
);

insert into articles (name, article, visits) values (
  'html5',
  "HTML5 (HyperText Markup Language 5) est la dernière révision majeure d'HTML (format de données conçu pour représenter les pages web). Cette version a été finalisée le 28 octobre 2014. HTML5 spécifie deux syntaxes d'un modèle abstrait défini en termes de DOM : HTML5 et XHTML5. Le langage comprend également une couche application avec de nombreuses API, ainsi qu'un algorithme afin de pouvoir traiter les documents à la syntaxe non conforme. Le travail a été repris par le W3C en mars 2007 après avoir été lancé par le WHATWG. Les deux organisations travaillent en parallèle sur le même document afin de maintenir une version unique de la technologie. Le W3C vise la clôture des ajouts de fonctionnalités le 22 mai 2011 et une finalisation de la spécification en 2014, et encourage les développeurs Web à utiliser HTML 5 dès maintenant. Dans le langage courant, HTML5 désigne souvent un ensemble de technologies Web (HTML5, CSS3 et JavaScript) permettant notamment le développement d'applications (cf. DHTML).",
  '1'
);

insert into articles (name, article, visits) values (
  'css',
  "Les feuilles de style en cascade, généralement appelées CSS de l'anglais Cascading Style Sheets, forment un langage informatique qui décrit la présentation des documents HTML et XML. Les standards définissant CSS sont publiés par le World Wide Web Consortium (W3C). Introduit au milieu des années 1990, CSS devient couramment utilisé dans la conception de sites web et bien pris en charge par les navigateurs web dans les années 2000.",
  '1'
);

insert into articles (name, article, visits) values (
  'javascript',
  "JavaScript est un langage de programmation de scripts principalement employé dans les pages web interactives mais aussi pour les serveurs. C’est un langage orienté objet à prototype, c’est-à-dire que les bases du langage et ses principales interfaces sont fournies par des objets qui ne sont pas des instances de classes, mais qui sont chacun équipés de constructeurs permettant de créer leurs propriétés, et notamment une propriété de prototypage qui permet d’en créer des objets héritiers personnalisés. En outre, les fonctions sont des objets de première classe. Le langage a été créé en 1995 par Brendan Eich (Brendan Eich étant membre du conseil d'administration de la fondation Mozilla à cette époque) pour le compte de Netscape Communications Corporation. Le langage, actuellement à la version 1.8.2, est une implémentation de la 3e version de la norme ECMA-262 qui intègre également des éléments inspirés du langage Python. La version 1.8.5 du langage est prévue pour intégrer la 5e version du standard ECMA.",
  '1'
);

insert into articles (name, article, visits) values (
  'jquery',
  "jQuery est une bibliothèque JavaScript libre et multi-plateforme créée pour faciliter l'écriture de scripts côté client dans le code HTML des pages web. La première version est lancée en janvier 2006 par John Resig. La bibliothèque contient notamment les fonctionnalités suivantes : Parcours et modification du DOM (y compris le support des sélecteurs CSS 1 à 3 et un support basique de XPath) ; Événements ; Effets visuels et animations ; Manipulations des feuilles de style en cascade (ajout/suppression des classes, d'attributs…) ; Ajax ; Plugins ; Utilitaires (version du navigateur web...).",
  '1'
);

commit;
