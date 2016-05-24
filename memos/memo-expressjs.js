
// Syntaxe générale
// app.METHOD(PATH, HANDLER)
// http://expressjs.com/en/starter/basic-routing.html

// Pour écouter 0.0.0.0 lancer le serveur avec droits root
    Error: listen EACCES 0.0.0.0:80
        at Object.exports._errnoException (util.js:949:11)
        at exports._exceptionWithHostPort (util.js:972:20)
        at Server._listen2 (net.js:1240:19)
        at listen (net.js:1289:10)
        at Server.listen (net.js:1385:5)
        at EventEmitter.listen (/home/remipassmoilesel/projects/www/docker-kaiwa/opt.kaiwa/node_modules/express/lib/application.js:617:24)
        at Object.<anonymous> (/home/remipassmoilesel/projects/www/docker-kaiwa/opt.kaiwa/server.js:417:5)
        at Module._compile (module.js:541:32)
        at Object.Module._extensions..js (module.js:550:10)
        at Module.load (module.js:456:32)


/**
 Formulaire de connexion
*/
app.get('/urlpath', function (req, res) {

    // req contient les informations de la requete
    // res permet d'y répondre


    // rendu d'une vue. Paramètres:
    // "login": nom de la vue
    // {}: variables locales
    res.render("login", {"config": config.server});


});