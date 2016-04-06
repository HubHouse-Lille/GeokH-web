$( document ).ready(function() {
    var detail = false;
    var edit = false;
    var create = false;
    // DETAIL
    var a = $("input").attr("readonly");
    if(a != undefined)
        detail = true;
    // EDIT
    var b = $("input").val()
    if(b != "" )
        edit = true;
    else
        create = true;

//////// TRAITEMENT DES DONNEES/////

    var nb_entrepreneur = 1;
    var nb_balise_question = 1;
    var entrepreneurs_add = [];
    var balise_add = [];
    var question_add = [];

    if(detail || edit)
    {

        var idparcour = $("#pId").val();
        // PTOES
        $.getJSON("/api/ptoes/parcour/"+idparcour, function(result) {
            $.each(result, function(item) {
                 $('#tabPtoe').append(''+
                 '<tr>'+
                 '<td>'+nb_entrepreneur+'</td>' +
                 '<td>'+
                 '<a href="/entrepreneurs/view/'+result[item].Entrepreneur.id+'">'+result[item].Entrepreneur.nom+'</a>'+
                 '</td>'+
                 '</tr>')
                 nb_entrepreneur++
            });
        }).done(function( data ){
            for(var i=0; i<data.length;i++){
                entrepreneurs_add.push(data[i].Entrepreneur.id)
            }
        });

        // PTOBQS
        $.getJSON("/api/ptobqs/parcour/"+idparcour, function(result) {
            $.each(result, function(item) {
                 $('#tabPtobq').append(''+
                 '<tr>'+
                 '<td>'+nb_balise_question+'</td>'+
                 '<td>'+
                 '<a href="/balises/view/'+result[item].Balise.id+'">'+result[item].Balise.nom+'</a>'+
                 '</td>'+
                 '<td>'+
                 '<a href="/questions/view/'+result[item].Question.id+'">'+result[item].Question.question+'</a>'+
                 '</td>'+
                 '<td>'+result[item].ordre+'</td></tr>')
                 nb_balise_question++
            });
        }).done(function( data ){
          for(var i=0; i<data.length;i++){
              balise_add.push(data[i].Balise.id)
              question_add.push(date[i].Question.id)
          }
        });;

    }
    if(create || edit)
    {
        // Chargement des données
        var entrepreneurs = null;
        $.getJSON("/api/entrepreneurs/", function(result) {
           var options = $("#optEnt");
           $.each(result, function(item) {
               options.append($("<option />").val(result[item].id).text(result[item].nom));
           });
        }).done(function( data ) {
            entrepreneurs = data
        });

        var balises = null;
        $.getJSON("/api/balises/", function(result) {
            var options = $("#optb");
            $.each(result, function(item) {
                options.append($("<option />").val(result[item].id).text(result[item].nom));
            });
        }).done(function( data ) {
            balises = data
        });

        var questions = null ;
        $.getJSON("/api/questions/", function(result) {
            var options = $("#optq");
            var ordre = $("#ordre");
            var i = 1;
            $.each(result, function(item) {
                options.append($("<option />").val(result[item].id).text(result[item].question));
                ordre.append($("<option />").val(i).text('Ordre ' + i));
                i++
            });
        }).done(function( data ) {
            questions = data
        });

        // Traitement des données
        $("#addEnt").click(function(){
            var ent = recupererEntrepreneur($("#optEnt").val());
            if(ent == null)
                alert("L'entrepreneur utilisé n'existe pas !");
            else if($.inArray(ent.id, entrepreneurs_add) == -1){
                $("#tabPtoe").append(""+
                "<tr >"+
                    "<td> "+ nb_entrepreneur +" <input type='hidden' name='entrepreneurId' value='"+ent.id+"' /> </td>"  +
                    "<td> "+
                    "<a href='/entrepreneurs/view/"+ent.id+"' >" + ent.nom + " </a> "+
                    "</td>" +
                "</tr>"
                );
                nb_entrepreneur++;
                entrepreneurs_add.push(ent.id);
            }else{
                alert("Entrepreneur déjà présent dans le tableau !");
            }
        });

        $('#addbq').click(function(){
            var b = recupererBalise($("#optb").val());
            var q = recupererQuestion($("#optq").val());
            var ordre = $("#ordre").val();

            if(b == null || q == null )
                alert("La Balise ou Question utilisé n'existe pas ! ");
            else if($.inArray(b.id, balise_add) != -1)
                alert("Balise déjà utilisé ! ");
            else if($.inArray(q.id, question_add) != -1)
                alert("Question déjà utilisé ! ");
            else{
                $("#tabPtobq").append(""+
                "<tr >"+
                "<td> "+ nb_balise_question +"</td>"  +
                "<td> <a href='/balises/view/"+b.id+"' >"+b.nom+"</a> <input type='hidden' name='baliseId' value='"+b.id+"' /> </td>" +
                "<td> <a href='/questions/view/"+q.id+"' >"+q.question+"</a> <input type='hidden' name='questionId' value='"+q.id+"' /> </td>" +
                "<td> "+ ordre +" <input type='hidden' name='ordre' value='"+ordre+"' /></td>" +
                "</tr>"
                );
                nb_balise_question++;
                balise_add.push(b.id);
                question_add.push(q.id);
            }
        });

        // Récupération des données déjà présentes

        function recupererEntrepreneur(id){
            for(var i= 0; i < entrepreneurs.length; i++)
            {
                if(entrepreneurs[i].id == id)
                    return entrepreneurs[i];
            }
            return null;
        }
        function recupererBalise(id){
            for(var i= 0; i < balises.length; i++)
            {
                if(balises[i].id == id)
                    return balises[i];
            }
            return null;
        }
        function recupererQuestion(id){
            for(var i= 0; i < questions.length; i++)
            {
                if(questions[i].id == id)
                    return questions[i];
            }
            return null;
        }
    }
});

