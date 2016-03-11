// mécanisme de promesse
var promise = new Promise(function(resolve, rejected){
    console.log("Traitement numéro 1");
    resolve();
});

promise.then(function(){
    console.log("Traitement numéro 2");
});

promise.catch(function(){
    console.log("Promesse non tenue");
});

