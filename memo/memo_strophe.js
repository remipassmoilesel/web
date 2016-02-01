// IQ stanzas =  info/query stanzas
// http://slixmpp.readthedocs.org/en/latest/api/stanza/iq.html

// CORS /!\ : le '/' de fin est très important !
var serviceUrl = "http://localhost:7070/http-bind/";

/*
 * Ajout de handlers
 */

my_handler_function = new function (iq) {

    // si retourne vrai alors le handler sera retiré
    // peut ne rien retourner (undefined)
    return false;
};

var ref = conn.addHandler(my_handler_function, null, 'message');
// once the handler is no longer needed:
connection.deleteHandler(ref);

/*
 * Connexion
 */
var conn = new Strophe.Connection(
        "http://.....");

conn.connect("jid", "password", function (status) {
    if (status === Strophe.Status.CONNECTED) {
        $(document).trigger('connected');
    } else if (status === Strophe.Status.DISCONNECTED) {
        $(document).trigger('disconnected');
    }
});

/*
 * Créer une stanza
 */
var stanza = $build('foo').c('bar').c('baz');
// -> <foo><bar><baz/></bar></foo>

/*
 * Créer un message
 */
var message = $msg({to: 'darcy@pemberley.lit', type: 'chat'})
        .c('body').t('How do you do?');

/*
 * Information sur jid
 */
Strophe.getUserFromJid('darcy@pemberley.lit / library'); // 'darcy
Strophe.getDomainFromJid('darcy@pemberley.lit / library'); // 'pemberley.lit'
Strophe.getResourceFromJid('darcy@pemberley.lit / library'); // 'library'
Strophe.getBareJidFromJid('darcy@pemberley.lit / library'); // 'darcy@pemberley.lit'



