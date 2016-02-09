
/**
 * Constructeur d'anneau
 * 
 * @param {type} posx
 * @param {type} posy
 * @param {type} radius
 * @returns {Ring}
 */
function Ring(posx, posy, radius) {
    this.posx = posx;
    this.posy = posy;
    this.radius = radius;
}

/**
 * Dessiner un anneau. Prends un contexte graphique en argument.
 * 
 * @param {type} gctx
 * @returns {undefined}
 */
Ring.prototype.draw = function (gctx) {

    gctx.beginPath();

    // dessiner le fond
    gctx.arc(this.posx, this.posy, this.radius, 0, 2 * Math.PI);
    gctx.fillStyle = "#FFFFFF";
    gctx.fill();

    // dessiner le trait
    gctx.strokeStyle = "#000000";
    gctx.arc(this.posx, this.posy, this.radius, 0, 2 * Math.PI);
    gctx.stroke();

};

/**
 * Tête de la chenille.
 * @param {type} posx
 * @param {type} posy
 * @param {type} radius
 * @param {type} cap
 * @returns {Head}
 */
function Head(posx, posy, radius, cap) {

    //console.log("Head:");
    //console.log("posx:" + posx);
    // console.log("posy:" + posy);
    //console.log("radius:" + radius);
    //console.log("cap:" + cap);

    this.posx = posx;
    this.posy = posy;
    this.radius = radius;
    this.cap = cap;
}

/**
 * Dessiner une tête. Prends un contexte graphique en argument.
 * 
 * @param {type} gctx
 * @returns {undefined}
 */
Head.prototype.draw = function (gctx) {
    gctx.beginPath();
    gctx.fillStyle = "#000000";
    gctx.arc(this.posx, this.posy, this.radius, 0, 2 * Math.PI);
    gctx.fill();
};

/**
 * Change le cap de la chenille.
 * @param {type} cap
 * @returns {undefined}
 */
Head.prototype.setCap = function (cap) {
    this.cap = cap;
};

/**
 * Déplace la tête
 * @returns {undefined}
 */
Head.prototype.move = function () {
    //x' = x + R * cos(cap) et y' = y + R * sin(cap)

    // console.log("move:");
    //console.log("computeNewPosition():" + this.computeNewPosition());

    var pos = this.computeNewPosition();

    this.posx = pos[0];
    this.posy = pos[1];

};

/**
 * Calculer et retourne la nouvelle position de la chenille selon cap. 0: x, 1: y
 * @returns {Array}
 */
Head.prototype.computeNewPosition = function () {

    var rslt = [];

    //console.log("computeNewPosition:");

    rslt[0] = this.posx + this.radius * Math.cos(this.cap * (Math.PI / 180));
    rslt[1] = this.posy + this.radius * Math.sin(this.cap * (Math.PI / 180));

    //console.log(rslt);

    return rslt;
};

/**
 * Retourne vrai si le prochain déplacement est à l'intérieur du canvas passé en argument.
 * @param {type} canvas
 * @returns {Boolean}
 */
Head.prototype.isCapOk = function (canvas) {
    // (x' = x + R * cos(cap) et y' = y + R * sin(cap)) >= R
    // calculer la position future
    var pos = this.computeNewPosition();

    var xd = canvas.width - pos[0];
    var yd = canvas.height - pos[1];

    //console.log("xd: " + xd);
    // console.log("xd: " + (xd >= this.radius));
    //console.log("yd: " + yd);
    // console.log("xd: " + (yd >= this.radius));

    // verifier la position par rapport au canvas
    return pos[0] - this.radius > 0 && pos[1] - this.radius > 0 && xd >= this.radius && yd >= this.radius;
};

function Chenille(canvas, ringsNbr, radius) {

    // conserver le rayon et le canvas
    this.canvas = canvas;
    this.radius = radius;

    // calculer la premiere position de la tete
    var fx = canvas.width / 2;
    var fy = canvas.height / 2;

    // créer la tête
    this.head = new Head(fx, fy, radius, 90);

    // créer les anneaux et les positionner
    this.rings = [];
    for (var i = 0; i < ringsNbr; i++) {

        // calculer la position des anneaux
        fx -= radius;

        this.rings[i] = new Ring(fx, fy, radius);
    }

}

/**
 * Dessiner la chenille à sa position actuelle
 * @returns {undefined}
 */
Chenille.prototype.draw = function () {

    // récupérer le contexte graphique
    var gcxt = this.canvas.getContext("2d");

    // dessiner les anneaux
    for (var i = this.rings.length - 1; i >= 0; i--) {
        this.rings[i].draw(gcxt);
    }

    // dessiner la tete
    this.head.draw(gcxt);

};

/**
 * Faire avancer la chenille dans un cap aléatoire
 * @returns {undefined}
 */
Chenille.prototype.moveRandomCap = function () {

    // trouver un cap aléatoire
    var cap = Math.floor((Math.random() * 60) + 1) - 30;
    this.head.setCap(cap);

    while (this.head.isCapOk(this.canvas) === false) {
        cap += 5;
        this.head.setCap(cap);
    }

    this.move(cap);
};

/**
 * Faire avancer la chenille dans un cap déterminé. Nécéssite d'appeler draw() pour redessiner la chenille.
 * @param {type} ncap
 * @returns {undefined}
 */
Chenille.prototype.move = function (ncap) {

    console.log("Chenille.move: ");

    // déplacer les anneaux

    // conserver la position du premier anneau
    var nx = this.rings[0].posx;
    var ny = this.rings[0].posy;

    // déplacer le premier anneau
    this.rings[0].posx = this.head.posx;
    this.rings[0].posy = this.head.posy;

    // iterer les anneau
    for (var i = 1; i < this.rings.length; i++) {

        // stocker la position précédente de l'anneau courant
        var px = this.rings[i].posx;
        var py = this.rings[i].posy;

        //console.log("i: " + i);
        //console.log("px: " + px);
        //console.log("py: " + py);
        //console.log("nx: " + nx);
        //console.log("ny: " + ny);

        // affecter la nouvelle position
        this.rings[i].posx = nx;
        this.rings[i].posy = ny;

        // changer la position pour le suivant
        nx = px;
        ny = py;

    }

    // affecter le nouveau cap à la tete
    this.head.setCap(ncap);

    // bouger la tete et la redessiner
    this.head.move();

};

function init() {

    // identifiant du timer pour arret
    var timerId = 0;

    // espacement temporel entre les actions de dessin
    var timeLaps = 50;

    // le rayon des cercles des chenilles
    var radius = 20;

    // le nombre de chenilles
    var nbrChen = 5;

    // la taille des chenilles
    var chenLenght = 10;

    // le canvas ou decider
    var canvas = document.getElementById("myCanvas");

    // créer les chenilles et les afficher
    var chenilles = [];
    for (var i = 0; i < nbrChen; i++) {
        chenilles[i] = new Chenille(canvas, chenLenght, radius);
        chenilles[i].draw();
    }

    var ctxt = canvas.getContext("2d");

    // action du bouton start
    document.getElementById("startBtn").onclick = function () {
        document.getElementById("stopBtn").disabled = false;
        document.getElementById("startBtn").disabled = true;

        // lancer un timer
        timerId = setInterval(function () {

            // effacer le canvas
            ctxt.clearRect(0, 0, canvas.width, canvas.height);

            // redessiner les chenilles
            for (var i = 0; i < chenilles.length; i++) {
                chenilles[i].moveRandomCap();
                chenilles[i].draw();
            }

        }, timeLaps);
    };

    // action du bouton stop
    document.getElementById("stopBtn").onclick = function () {
        document.getElementById("stopBtn").disabled = true;
        document.getElementById("startBtn").disabled = false;
        clearInterval(timerId);
    };


}