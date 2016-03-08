/**_________________________________________________________________________________________________________________________________ 
 * Get external libraries ---------------------------------------------------------------------------------------------------------
 **/
var fs = require('fs-extra')				// Access files
        , express = require('express')				// Framework to implement HTTP server
        , bodyParser = require("body-parser")			// plugin for parsing HTTP requests
        , myDOMParser = require('xmldom').DOMParser		// DOM parser 	  (string -> DOM)
        , XMLSerializer = require('xmldom').XMLSerializer	// DOM serializer (DOM -> string)
        , multer = require('multer')					// plugin for transmiting file via HTTP
        , request = require('request')				// send HTTP queries
        , staticGzip = require('http-static-gzip-regexp')
        , libXML = null //require("libxmljs")				// used to verify XML database with respect to a schema
        , xmlSerializer = null
        , domParser = null
        ;

/**_________________________________________________________________________________________________________________________________ 
 * Save the XML into a file, file acces is asynchronous ----------------------------------------------------------------------------
 *   - doc : the document containing the XML ---------------------------------------------------------------------------------------
 *   - res : the result stream of a client HTTP request ----------------------------------------------------------------------------
 **/
function saveXML(doc, res) {
    fs.writeFile('./data/cabinetInfirmier.xml'
            , xmlSerializer.serializeToString(doc)
            , function (err) { // callback
                if (err) {
                    console.error("Error writing ./data/cabinetInfirmier.xml:\n", err);
                    res.writeHead(500);
                    res.write("Error writing ./data/cabinetInfirmier.xml:\n", err);
                } else {
                    res.writeHead(200);
                }
                res.end();
            }
    );
}

/**_________________________________________________________________________________________________________________________________ 
 * Returns DOM node of patient identified by numlber in document doc or null if there is no such patient ---------------------------
 **/
function getPatient(doc, number) {
    var L = doc.getElementsByTagName('patient')
            , num_node;
    for (var i = 0; i < L.length; i++) {
        num_node = L[i].getElementsByTagName('numero')[0];
        if (num_node.textContent === number) {
            return L[i];
        }
    }
    return null;
}


/**_________________________________________________________________________________________________________________________________
 * Define HTTP server, implement some ressources -----------------------------------------------------------------------------------
 *   - port : the TCP port on which the HTTP server will be listening --------------------------------------------------------------
 **/
function init(port, applicationServerIP, applicationServerPort) {
    domParser = new myDOMParser()				// an instance of DOM parser     (string -> DOM)
    xmlSerializer = new XMLSerializer()			// an instance of DOM serializer (DOM -> string)
    var doc											// will reference the document representing the XML structure
            , app											// will reference the HTTP server
            , applicationServer = {ip: applicationServerIP, port: applicationServerPort}	// Application server IP and port that is in charge of optimizing nurses' travels, by default, this server
    ;

    // Read and parse the XML file containing the data
    fs.readFile(__dirname + '/data/cabinetInfirmier.xml'
            , function (err, dataObj) {
                if (err) {
                    console.error("Problem reading file /data/cabinetInfirmier.xml", err);
                } else {
                    try {
                        var data = ""; //new String();
                        data = data.concat(dataObj);
                        doc = domParser.parseFromString(data, 'text/xml');
                        console.log("/data/cabinetInfirmier.xml successfully parsed !");
                    } catch (err2) {
                        console.error('Problem parsing /data/cabinetInfirmier.xml', err2);
                    }
                }
            }
    );

    // Initialize the HTTP server
    app = express();
    app.use(staticGzip(/^\/?dist\/.*(\.js|\.css)$/));
    app.use(express.static(__dirname))						// Associate ressources for accessing local files
            .use(bodyParser.urlencoded({extended: false}))		// Add a parser for urlencoded HTTP requests
            .use(bodyParser.json())								// Add a parser for json HTTP request
            .use(multer({dest: './uploads/'}).array())					// Add a parser for file transmission
            .listen(port);											// HTTP server listen to this TCP port


    app.disable('etag');
    // Define HTTP ressource GET /
    app.get('/'
            , function (req, res) {											// req contains the HTTP request, res is the response stream
                // console.log('Getting /');
                fs.readFile(__dirname + '/start.html'
                        , function (err, data) {
                            if (err) {
                                res.writeHead(500);
                                return res.end('Error loading start.html : ' + err);
                            }
                            // Parse it so that we can add secretary and all nurses
                            var docHTML = domParser.parseFromString(data.toString());
                            var datalist = docHTML.getElementById('logins');
                            var L_nurses = doc.getElementsByTagName('infirmier'), nurse;
                            console.log(L_nurses.length);
                            for (var i = 0; i < L_nurses.length; i++) {
                                nurse = L_nurses[i];
                                var option = docHTML.createElement('option');
                                option.setAttribute('value', nurse.getAttribute('id'));
                                option.textContent = nurse.getElementsByTagName('prenom')[0].textContent
                                        + ' '
                                        + nurse.getElementsByTagName('nom')[0].textContent
                                        ;
                                datalist.appendChild(option);
                            }
                            res.writeHead(200);
                            res.write(xmlSerializer.serializeToString(docHTML));
                            res.end();
                        });
            }
    );

    // Define HTTP ressource POST /, contains a login that identify the secretary or one nurse
    app.post('/'
            , function (req, res) {
                switch (req.body.login) {
                    case 'Secretaire':
                        fs.readFile(__dirname + '/secretary.html',
                                function (err, data) {
                                    if (err) {
                                        res.writeHead(500);
                                        return res.end('Error loading secretary.html : ', err);
                                    }
                                    res.writeHead(200);
                                    res.write(data.toString());
                                    res.end();
                                });
                        break;
                    default: // Is it a nurse ?
                        res.writeHead(200);
                        res.write("Unsupported login : " + req.body.login);
                        res.end();
                }
            }
    );

    // Define HTTP ressource PORT /addPatient, may contains new patient information
    app.post('/addPatient'
            , function (req, res) {
                console.log("/addPatient, \nreq.body:\n\t", req.body, "\n_______________________");
                req.body.patientName = req.body.patientName || '';
                req.body.patientForname = req.body.patientForname || '';
                req.body.patientNumber = req.body.patientNumber || '';
                req.body.patientSex = req.body.patientSex || '';
                req.body.patientBirthday = req.body.patientBirthday || '';
                req.body.patientFloor = req.body.patientFloor || '';
                req.body.patientStreet = req.body.patientStreet || '';
                req.body.patientPostalCode = req.body.patientPostalCode || '';
                req.body.patientCity = req.body.patientCity || '';

                var patients = doc.getElementsByTagName('patients')[0];
                // Is it a new patient or not ?
                var newPatient = getPatient(doc, req.body.patientNumber);
                if (newPatient === null) {
                    newPatient = doc.createElement('patient');
                    patients.appendChild(newPatient);
                } else {// Erase subtree
                    while (newPatient.childNodes.length) {
                        newPatient.removeChild(newPatient.childNodes[0]);
                    }
                }
                // Name
                var nom = doc.createElement('nom');
                nom.appendChild(doc.createTextNode(req.body.patientName));
                newPatient.appendChild(nom);
                // Forname
                var prenom = doc.createElement('prenom');
                prenom.appendChild(doc.createTextNode(req.body.patientForname));
                newPatient.appendChild(prenom);
                // Social security number
                var numero = doc.createElement('numero');
                numero.appendChild(doc.createTextNode(req.body.patientNumber));
                newPatient.appendChild(numero);
                // Sex
                var sexe = doc.createElement('sexe');
                sexe.appendChild(doc.createTextNode(req.body.patientSex));
                newPatient.appendChild(sexe);
                // Birthday
                var naissance = doc.createElement('naissance');
                naissance.appendChild(doc.createTextNode(req.body.patientBirthday));
                newPatient.appendChild(naissance);
                // Visites
                var visite = doc.createElement('visite');
                visite.setAttribute('date', "2014-12-08");
                newPatient.appendChild(visite);
                // Adress
                var adresse = doc.createElement('adresse');
                newPatient.appendChild(adresse);
                var etage = doc.createElement('etage');
                etage.appendChild(doc.createTextNode(req.body.patientFloor));
                adresse.appendChild(etage);
                var numAdress = doc.createElement('numero');
                numAdress.appendChild(doc.createTextNode(req.body.patientFloor));
                adresse.appendChild(numAdress);
                var rue = doc.createElement('rue');
                rue.appendChild(doc.createTextNode(req.body.patientStreet));
                adresse.appendChild(rue);
                var ville = doc.createElement('ville');
                ville.appendChild(doc.createTextNode(req.body.patientCity));
                adresse.appendChild(ville);
                var codePostal = doc.createElement('codePostal');
                codePostal.appendChild(doc.createTextNode(req.body.patientPostalCode));
                adresse.appendChild(codePostal);

                console.log(xmlSerializer.serializeToString(newPatient));
                saveXML(doc, res);
            }
    );

    // Define HTTP ressource POST /affectation, associate a patient with a nurse
    app.post('/affectation'
            , function (req, res) {
                if (typeof req.body.infirmier === 'undefined'
                        || typeof req.body.patient === 'undefined') {
                    res.writeHead(500);
                    res.end("You should specify 'infirmier' with her id and 'patient' with her social security number in your request.");
                } else {// Get node corresponding to the nurse
                    var nurse = doc.getElementById(req.body.infirmier);
                    if (nurse || req.body.infirmier === 'none') {
                        // Get node corresponding to the patient
                        var LP = doc.getElementsByTagName('patient')
                                , node_num;
                        for (var i = 0; i < LP.length; i++) {
                            node_num = LP[i].getElementsByTagName('numero')[0];
                            if (node_num.textContent === req.body.patient) {
                                if (req.body.infirmier === 'none') {
                                    req.body.infirmier = '';
                                }
                                LP[i].getElementsByTagName('visite')[0].setAttribute('intervenant', req.body.infirmier);
                                saveXML(doc, res);
                                break;
                            }
                        }
                    } else {
                        res.writeHead(500);
                        res.end("There is no nurse identified by id", req.body.infirmier);
                    }
                }
            }
    );

    // Define HTTP ressource POST /INFIRMIERE
    app.post('/INFIRMIERE'
            , function (req, res) {
                res.end("INFIRMIERE " + req.body.id + ". WARNING: You should configure the optimization application server IP and port. //By default, the optimization application server is configured to be the HCI one.");
            }
    );
    app.post('/infirmiereLocale'
            , function (req, res) {
                var form = {id: req.body.id
                    , xml: xmlSerializer.serializeToString(doc)
                }
                , url = 'http://' + applicationServer.ip + ':' + applicationServer.port + '/INFIRMIERE'
                        ;
                console.log("Contacting", url);
                request.post({url: url
                    , form: form}
                , function (err, httpResponse, body) {
                    if (err) {
                        res.writeHead(400);
                        res.write("Error on the optimization application server: ");
                        res.end( );
                    } else {//console.log("we got a body!");
                        res.end(body);
                    }
                }
                );
            }
    );

    app.get('/check'
            , function (req, res) {
                var str_xml, str_xsd;
                var P_xml = new Promise(function (resolve, reject) {
                    fs.readFile(__dirname + '/data/cabinetInfirmier.xml'
                            , function (err, dataObj) {
                                if (err) {
                                    reject();
                                } else {
                                    str_xml = "".concat(dataObj);
                                    resolve();
                                }
                            }
                    );
                }
                )
                        , P_xsd = new Promise(function (resolve, reject) {
                            fs.readFile(__dirname + '/data/cabinet.xsd'
                                    , function (err, dataObj) {
                                        if (err) {
                                            reject();
                                        } else {
                                            str_xsd = "".concat(dataObj);
                                            resolve();
                                        }
                                    }
                            );
                        }
                        )
                        , P_all = Promise.all([P_xml, P_xsd])
                        ; // End of promises

                P_all.then(function () { // If resolved
                    // Check xml / xsd
                    console.log('./data/cabinet.xsd');
                    var xsdDoc = libXML.parseXml(str_xsd);
                    console.log(1);
                    var xmlDoc = libXML.parseXml(str_xml);
                    console.log(2);
                    xmlDoc.validate(xsdDoc);
                    console.log(3);
                    console.log(xmlDoc.validationErrors);
                    res.end(JSON.stringify(xmlDoc.validationErrors));
                }
                , function () { // If rejected
                    res.end("Error, promises rejected");
                }
                );

            }
    );
}


/**_________________________________________________________________________________________________________________________________ 
 * Parse command line parameters and initialize everything ------------------------------------------------------------------------
 **/
var params = {}, p;
for (var i = 2; i < process.argv.length; i++) {
    p = process.argv[i].split(':');
    params[p[0]] = p[1];
}

var port = params.port || "8080"
        , applicationServerIP = params.applicationServerIP || '127.0.0.1'
        , applicationServerPort = params.applicationServerPort || port
        ;
console.log("Usage :\n\tnode staticServeur.js [port:PORT] [applicationServerIP:IP] [applicationServerPort:PORT]\n\tDefault port is 8080.\n\tDefault applicationServerIP is 127.0.0.1.\n\tDefault applicationServerPort is the same port than the one used by this HTTP server.");
console.log("HTTP server listening on port " + port);
init(port, applicationServerIP, applicationServerPort);
