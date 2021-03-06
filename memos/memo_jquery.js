
// areter la propagation d'un evenement
$("selector").click(function(){
    // ...
    return false;
})


/**
Fusionner deux objet. Si vrai alors une copie profonde est effectuée.
*/

$.extend(true, object1, object2);


/*
 * Changer la couleur de fond avec animation
 */

$('#input').animate({backgroundColor: "#faa"}, 200);

/*
 * iteration d'objets
 */
var arrayString = ["a", "b", "c", "d"];
$.each(arrayString, function (index, object) {
    console.log(index + ": " + object);

    // si retourne faux, alors arret de la boucle
    // peut ne rien retourner (undefined)
    return true;
});

/*
 * Vérifier la sélection d'un id
 */
console.log($('#true_id').length); // == 1
console.log($('#fake_id').length); // == 0

/*
 * Evenements personnalisés 
 */
$(document).bind('custom_event_name', function (ev, data) {
//Action
});

$(document).trigger('custom_event_name', {
    jid: $('#jid').val(),
    password: $('#password').val()
});

/*
 * jquery ui: créer un dialogue
 */
$('#item_hidded').dialog({
    autoOpen: true,
    draggable: false,
    modal: true,
    title: 'Connect to XMPP',
    buttons: {
        "Connect": function () {
            $(document).trigger('connect', {
                jid: $('#jid').val(),
                password: $('#password').val()
            });
            $('#password').val('');
            $(this).dialog('close');
        }
    }
});

// associer une action avec on keypress
$('#someTextBox').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        alert('You pressed a "enter" key in textbox');  
    }
});

// Tester si un element est visible
