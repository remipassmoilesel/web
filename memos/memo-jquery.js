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
