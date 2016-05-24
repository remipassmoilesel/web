$('#connexionButton').click(function (e) {
    var jid = $('#jid').val();
    if (SERVER_CONFIG.domain && jid.indexOf('@') == -1)
         jid += "@" + SERVER_CONFIG.domain;
    var password = $('#password').val();

    if(typeof SERVER_CONFIG.wss === "undefined"){
        $("#errorMessage").html("Erreur de configuration. Voir le fichier dev_config.json");
        return;
    }
    var connURL = SERVER_CONFIG.wss;

    var transport;
    var wsURL = '';
    var boshURL = '';
    if (connURL.indexOf('http') === 0) {
        boshURL = connURL;
        transport = 'bosh';
    } else if (connURL.indexOf('ws') === 0) {
        wsURL = connURL;
        transport = 'websocket';
    }

    localStorage.config = JSON.stringify({
        jid: jid,
        server: jid.slice(jid.indexOf('@') + 1),
        wsURL: wsURL,
        boshURL: boshURL,
        transport: transport,
        credentials: {
            password: password
        }
    });

    window.location = '/';

    e.preventDefault();
    return false;
});
