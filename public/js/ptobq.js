$( document ).ready(function() {

    var opt = document.getElementById('optionsBalise');
    if (opt !== null) {

        $.getJSON("/api/balises/", function(result) {
            var options = $("#optionsBalise");
            //don't forget error handling!
            $.each(result, function(item) {
                options.append($("<option />").val(result[item].id).text(result[item].nom));
            });
        });
    }

    opt = null;
    opt = document.getElementById('optionsQuestion');
    if (opt !== null) {

        $.getJSON("/api/questions/", function(result) {
            var options = $("#optionsQuestion");
            //don't forget error handling!
            $.each(result, function(item) {
                options.append($("<option />").val(result[item].id).text(result[item].question));
            });
        });
    }


    opt = document.getElementById('parcourBalQuestTable');
    if (opt !== null) {

        // FOR EACH PTOE
        $.getJSON("/api/ptobqs/parcour/"+globalParcourId, function(resultptobq) {
            $.each(resultptobq, function(item) {

                // nom balise ; question ; action
                if (editable) {
                $('#parcourBalQuestTable tr:last').after('<tr><td>'+item+'</td>'
                    +'<td><a href="/balises/view/'+resultptobq[item].Balise.id+'">'+resultptobq[item].Balise.nom+'</a></td>'
                    +'<td><a href="/questions/view/'+resultptobq[item].Question.id+'">'+resultptobq[item].Question.question+'</a></td>'
                    +'<td>'+resultptobq[item].ordre+'</td>'
                    +'<td><a href="/dal/ptobqs/'+globalParcourId+'/destroy/'+resultptobq[item].Balise.id+'/'+resultptobq[item].Question.id+'">supprimer</a></td></tr>')
                } else {
                $('#parcourBalQuestTable tr:last').after('<tr><td>'+item+'</td>'
                    +'<td><a href="/balises/view/'+resultptobq[item].Balise.id+'">'+resultptobq[item].Balise.nom+'</a></td>'
                    +'<td>'+resultptobq[item].ordre+'</td>'
                    +'<td><a href="/questions/view/'+resultptobq[item].Question.id+'">'+resultptobq[item].Question.question+'</a></td></tr>')
                }


            });
        });

    }


});