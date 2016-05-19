

// methode utilitaire de decomposition de JID
Strophe.getUserFromJid('darcy@pemberley.lit/library'); // 'darcy'
Strophe.getDomainFromJid('darcy@pemberley.lit/library'); // 'pemberley.lit'
Strophe.getResourceFromJid('darcy@pemberley.lit/library'); // 'library'
Strophe.getBareJidFromJid('darcy@pemberley.lit/library'); // 'darcy@pemberley.lit'


// A l'aide de JQuery, retrouver le corps d'une stanza
var body = $(stanza).find("body").text();

$('#chat_input').text('Type your message here..');

// iterer une stanza
$(stanza).find('item').each(function() {
    $('#contact_list').append(' < li > ' + $(this).attr('jid') + ' < /li>');
});
