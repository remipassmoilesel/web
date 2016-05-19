


// Ajouter un observateur de stanza
Strophe = {
    addHandler: function(handler, ns, name, type, id, from) {
        // La selection des message se fait sur la base de l'égalité.
        // Attention à l'usage de from, un bare jid ne sera pas egal à tous les jid en liens
        // name: nom de la stanza. message, presence, iq, null
        //
    }
}



// Ajouter du texte: t()
var message = $msg({
        to: 'darcy @pemberley.lit',
        type: 'chat'
    })
    .c('body').t('How do you do ?');


// pour ajouter deux enfants à un element, appeler "up" pour remonter après l'ajout vers un parent
var stanza = $build('foo').c('bar').up().c('baz');

// ajouter un enfant à une stanza
var stanza = $build('foo').c('bar').c('baz');
// --> <foo><bar><baz/></bar></foo>

// serialiser une stanza en chaine
$pres().toString()


// Construction de stanzas, formulations equivalentes
var pres1 = new Strophe.Builder('presence');
var pres2 = new Strophe.Builder('presence', {
    to: 'example.com'
});

var pres1 = $build('presence');
var pres2 = $build('presence', {
    to: 'example.com'
});
var pres1 = $pres();
var pres2 = $pres({
    to: 'example.com'
});

// Etats de la connexion, dans l'ordre normal d'apparition
Strophe.Status.CONNECTED

// CONNECTING Strophe has started its attempt to make a connection to the XMPP server.
// AUTHENTICATING The connection has been established, and Strophe is now attempting to authenticate and create a session.
// CONNECTED A session has been established, and user data may now flow freely.
// DISCONNECTING Termination of the connection has started.
// DISCONNECTED The connection is fully terminated.
// CONNFAIL Strophe encountered a problem trying to establish the connection.
// AUTHFAIL An error occurred during the authentication process.

// IQ stanzas =  info/query stanzas
// http://slixmpp.readthedocs.org/en/latest/api/stanza/iq.html

// CORS /!\ : le '/' de fin est très important !
var serviceUrl = "http://localhost:7070/http-bind/";

/*
 * Ajout de handlers
 */

my_handler_function = new function(iq) {

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

conn.connect("jid", "password", function(status) {
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
var message = $msg({
        to: 'darcy@pemberley.lit',
        type: 'chat'
    })
    .c('body').t('How do you do?');

/*
 * Information sur jid
 */
Strophe.getUserFromJid('darcy@pemberley.lit / library'); // 'darcy
Strophe.getDomainFromJid('darcy@pemberley.lit / library'); // 'pemberley.lit'
Strophe.getResourceFromJid('darcy@pemberley.lit / library'); // 'library'
Strophe.getBareJidFromJid('darcy@pemberley.lit / library'); // 'darcy@pemberley.lit'
