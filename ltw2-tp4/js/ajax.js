
// identifiant du champs de texte de recherche
var SEARCH_TXTFIELD_ID = "#searchTextField";
var HEADER_SPACE_ID = "#headerSpace";
var RESULT_SPACE_ID = "#resultsSpace";

$(function () {

    console.log("document ready");
    console.log(SEARCH_TXTFIELD_ID);

    // associer la frappe des touches avec la recherche
    $(SEARCH_TXTFIELD_ID).keypress(function () {

        console.log("keypressed: ");
        console.log();

        $req = $(SEARCH_TXTFIELD_ID).val();

        // changer l'espace d'affichage du logo
        if ($req != "") {
            // lancer une recherche
            searchAndShow($(SEARCH_TXTFIELD_ID).val());
        } 
        
        else {
            changeHeaderSpace();
        }


    });


});

function searchAndShow(req) {

    console.log("searchAndShow");
    console.log(req);

    $.ajax({
        url: 'php/searchEngine.php', // La ressource ciblée
        type: 'GET', // Le type de la requête HTTP.
        data: 'q=' + req,
        dataType: 'html',
        success: function (code_html, statut) {
            showInResultSpace(code_html);
        },
        error: function (code_html, statut) {
            showInResultSpace("Search engine not available.");
        }
    });

}

function showInResultSpace(code) {
    $(RESULT_SPACE_ID).html(code);
}

/**
 * Masquer le logo si necessaire
 * @returns {undefined}
 */
function changeHeaderSpace() {
    $(HEADER_SPACE_ID).html("<h1>Seach Engine</h1>");
}