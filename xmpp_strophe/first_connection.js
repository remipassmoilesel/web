var Application = {
    connection: null,
    serviceUrl: "http://localhost:7070/http-bind/",
    log: function (msg) {
        $("#log").append("<p>" + msg + "</p>");
    }
};


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

$(document).bind('connected', function () {
    Application.log("Connected");
});
$(document).bind('disconnected', function () {
    Application.log("Disconnected");
});

