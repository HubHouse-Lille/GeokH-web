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

    opt = document.getElementById('parcourEntTable');
    if (opt !== null) {

        // FOR EACH PTOE
        $.getJSON("/api/ptoes/parcour/"+globalParcourId, function(resultptoe) {
            $.each(resultptoe, function(ptoe) {

                if (editable) {
                    $('#parcourEntTable tr:last').after('<tr><td>'+ptoe+'</td>'
                        +'<td><a href="/entrepreneurs/view/'+resultptoe[ptoe].Entrepreneur.id+'">'+resultptoe[ptoe].Entrepreneur.prenom+' '+resultptoe[ptoe].Entrepreneur.nom+'</a></td>'
                        +'<td><a href="/dal/ptoes/'+globalParcourId+'/destroy/'+resultptoe[ptoe].Entrepreneur.id+'">supprimer</a></td></tr>')
                } else {
                    $('#parcourEntTable tr:last').after('<tr><td>'+ptoe+'</td>'
                        +'<td><a href="/entrepreneurs/view/'+resultptoe[ptoe].Entrepreneur.id+'">'+resultptoe[ptoe].Entrepreneur.prenom+' '+resultptoe[ptoe].Entrepreneur.nom+'</a></td></tr>')
                }
            });
        });

    }

});