$( document ).ready(function() {

    var opt = document.getElementById('optionsEntrepreneurs');
    if (opt !== null) {

        $.getJSON("/api/entrepreneurs/", function(result) {
            var options = $("#optionsEntrepreneurs");
            //don't forget error handling!
            $.each(result, function(item) {
                options.append($("<option />").val(result[item].id).text(""+result[item].prenom + " " + result[item].nom));
            });
        });

    }

    /*opt = document.getElementById('listEntrepreneur');
    if (opt !== null) {

        // FOR EACH PTOE
        $.getJSON("/api/ptoe/"+globalParcourId, function(resultptoe) {
            var options = $("#optionsEntrepreneurs");
            //don't forget error handling!
            $.each(resultptoe, function(ptoe) {

                    // GET THE ENTREPRENEUR DETAILS
                    $.getJSON("/api/entrepreneurs/"+resultptoe[ptoe].EntrepreneurId, function(result) {
                        var options = $("#optionsEntrepreneurs");
                        //don't forget error handling!
                        $.each(result, function(item) {




                            options.append(
                            $("<option />").val(result[item].id).text(""+result[item].prenom + " " + result[item].nom)
                            $('#myTable tr:last').after('<tr><td>'+result[item].order+'</td>'
                                +'<td><a href="/entrepreneurs/view/'+result[item]+'</td></tr>')

                                                td #{balise.id}
                                                td
                                                    a(href="/balises/view/"+ balise.id) #{balise.nom}
                                                td
                                                    a(href="/balises/view/"+ balise.id) #{balise.nom}
                                                td
                                                    a(href="/dal/balises/destroy/"+ balise.id) Supprimer

                            );
                        });
                    });

                );
            });
        });

    }*/


});