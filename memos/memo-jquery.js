
// Stanza XMPP, XML, ... (retour) to string
$(stanza).html();

console.log($("#djoeMenuCtn > h1.ui-accordion-header").eq(0));

// manipuler un noeud après selection
var djoeMenu = $(".hey");
djoeMenu.currentResults.eq(djoeMenu.currentSearchResultIndex);

// obtenir le noeud DOM, et non un objet jquery
var firstHeadingElem = $( "h1" ).get( 0 );
console.log(firstHeadingElem.tagName);

// sélectionner le premier titre
var firstHeading = headings.eq( 0 );

// affecter le contenu du 3 eme element H3
$( "#content" ).find( "h3" ).eq( 2 ).html( "new text for the third h3!" );

// obtenir une propriete, le nom de la balise par exemple
console.log($(this).prop("tagName"));

// Obtenir tous les enfants d'un element, au premier niveau uniquement
// sur plusieurs niveaux utiliser find()
console.log($("#menu").children());


// Magasin de plugins: http://plugins.jquery.com

/*

Créer un plugin JQuery

*/
// ajouter la fonction au prototype
$.fn.greenify = function() {
    this.css( "color", "green" );

    // retourner l'objet pour chainage
    return this;
}
// La fonction sera accessible ensuite par $("...").greenify()
// Voir plus sur https://learn.jquery.com/plugins/basic-plugin-creation/


$( "a" ).greenify().addClass( "greenified" );

// vider un element
$(logSpaceId).empty();

// Transformer un objet en chaine de parametres compatible URL
$.param(req.data)

// evenements jquery
// Associer un evenement à une action
$('#go_button').bind('click', function(ev, data) {
    // do something here
});

// declencher un evenement programmaticalement
$('#go_button').trigger('click');

// declencher un evenement special
$(document).trigger('contact_added', {
    jid: 'darcy@pemberley.lit'
});

// ++ methodes utiles raccourcies
// keypress() , keyup() , keydown() , mouseup() ,
// mousedown() , mousemove() , click() , load() , and ready()

// document ready event
$(document).ready(function() {
    // init code here
});
$(function() {
    // when document is ready
});

// Obtenir tous les enfants d'un element, sur plusieurs niveaux
$(stanza).find('item').each(function() {});

// Styler des elements
var c = $('#tab1').css('color'); // get the tab's font color
$('.username').css('background-color', '#fff'); // set a single css style
$('.errorMsg').css({
    fontSize: '150%',
    color: 'red'
}); // change multiple styles at

// Utilisation:
jquery() === $()

// faire référence à l'objet courant dans une fonction anonyme: $(this)
$('#ball').mouseover(function(e) {
    $(this).animate({
        top: '-=50px' // #2 : Valeur relative
    });
});


// Selecteurs
$("#id").fadeOut();
$("#id a").fadeIn();


// evenements
$('#handle').click(function() {
    $('#header .description').fadeOut();
});

/*
Autres evenements:
- mouseover
- keypress
- change (formulaires)
*/

// déclenché lorsque le DOM selectionné est prêt
$(document).ready(function($) {
    $('#header .description').fadeOut();
});

// animations
// SHOW/HIDE
$('#exemple-show span').hide();
$('#exemple-show a').click(function(e) {
    $('#exemple-show span').show();
});

$('#exemple-hide a').click(function(e) {
    $('#exemple-hide span').hide();
});

// FADE
$('#exemple-fadetoggle a').click(function(e) {
    $('#exemple-fadetoggle span').fadeToggle();
});

// animation personnalisée
jQuery(document).ready(function($) {
    $('#handle').click(function(e) {
        $('#carre').animate({
            left: '50px',
            top: '80px'
        });
    });
});

// animations avec étapes
jQuery(document).ready(function($) {
    $('#handle').click(function(e) {
        $('#carre').animate({
            left: '50px',
            top: '80px'
        }, 600, function() {
            $('#ball').animate({
                opacity: '1',
                left: '400px'
            }, 300, 'swing'); // #1 : Easing
        });
    });

    $('#ball').mouseover(function(e) {
        $(this).animate({
            top: '-=50px' // #2 : Valeur relative
        });
    });

    $('#ball').mouseout(function(e) {
        $(this).animate({
            top: '+=50px'
        });
    });
});

// modifier le DOM
jQuery(document).ready(function($) {
    $('#mon_element').html(texte);
});

// creation et ajout d'un nouvel element
var new_element = jQuery('<div>X</div>');
new_element.css({
    background: 'red',
    width: '30px',
    height: '30px'
});
$('body').append(new_element);

// lire les attributs d'un element
$('#output').html('') // On lit quelques attributs de ce lien, et on les affiche
    .append('<i>attribut target </i>: ' + $(this).attr('target') + '<br/>')
    .append('<i>attribut rel    </i>: ' + $(this).attr('rel') + '<br/>')
    .append('<i>attribut title  </i>: ' + $(this).attr('title') + '<br/>')
    .append('<i>attribut style  </i>: ' + $(this).attr('style') + '<br/>')

// modifier un attribut
$('#handle').attr('href', 'http://www.photoshoptuto.com');

// AJAX
jQuery(document).ready(function($) {
    $('#form').submit(function(e) {
        // On désactive le comportement par défaut du navigateur
        // (qui consiste à appeler la page action du formulaire)
        e.preventDefault();

        // On envoi la requête AJAX
        $.getJSON(
            'ch6_exemple1_ajax.php', {
                chaine: $('#chaine').val()
            },
            function(data) {
                $('#retour').hide();
                $('#retour').html('')
                    .append('<b>Paramètre en majuscule</b> : ' + data.chaine + '<br/>')
                    .append('<b>Date</b> : ' + data.date + '<br/>')
                    .append('<b>Version PHP</b> : ' + data.phpversion + '<br/>');
                $('#retour').fadeIn();
            }
        );
    });
});

// Jquery UI

// datepicker
jQuery(document).ready(function($) {
    $("#datepicker").datepicker();
});

// + d'utres: Sliders, drag and drop, ....
