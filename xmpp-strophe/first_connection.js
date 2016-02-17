/**
 * Espace de nom de l'application, pour éviter au maximum l'usage de variables globales
 * 
 */
var Application = {
    /*
     * Url de connexion au service
     */
    serviceUrl: "http://localhost:7070/http-bind/",
    /*
     * Référence vers la connexion
     */
    connection: null,
    /*
     * Utilitaire de log
     */
    log: function (msg) {
        $("#log").append("<p>" + msg + "</p>");
    },
    /*
     * Envoyer un ping
     */
    send_ping: function (to) {
        var ping = $iq({
            to: to,
            type: 'get',
            id: 'ping1'}).c('ping', {xmlns: 'urn:xmpp:ping'});

        Application.log("Sending ping to: " + to);
        Application.start_time = (new Date()).getTime();

        Application.connection.send(ping);

    },
    start_time: null,
    handle_pong: function (iq) {
        var elapsed = (new Date()).getTime() - Application.start_time;
        Application.log('Received pong from server in ' + elapsed + 'ms');
        Application.connection.disconnect();
        return false;
    }
};

/*
 * Lancé au chargement du document
 */
$(document).ready(function () {

    $('#login_dialog').dialog({
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


});

/*
 * Observer l'evenement personnalisé "connecte-toi" 
 */
$(document).bind('connect', function (ev, data) {

    var conn = new Strophe.Connection(
            Application.serviceUrl);

    conn.connect(data.jid, data.password, function (status) {
        if (status === Strophe.Status.CONNECTED) {
            $(document).trigger('connected');
        } else if (status === Strophe.Status.DISCONNECTED) {
            $(document).trigger('disconnected');
        }
    });

    Application.connection = conn;

});

/*
 * Observer l'evenement personnalisé "connecté" 
 */
$(document).bind('connected', function () {
    Application.log("Connected");

    // ajouter un handler de pong
    Application.connection.addHandler(Application.handle_pong, null, "iq", null, "ping1");

    // envoyer un ping
    var domain = Strophe.getDomainFromJid(Application.connection.jid);
    Application.send_ping(domain);


});

/*
 * Observer l'evenement personnalisé "deconnexion" 
 */
$(document).bind('disconnected', function () {
    Application.log("Disconnected");
    Application.connection = null;
});
