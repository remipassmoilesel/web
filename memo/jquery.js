
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

