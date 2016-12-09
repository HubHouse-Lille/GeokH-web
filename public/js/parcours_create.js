$( document ).ready(function() {
/////// TYPE DE REQUETE
    var detail = false;
    var edit = false;
    var create = false;
    // DETAIL
    if(document.location.href.indexOf("view")> -1)
        detail = true;
    // EDIT
    if(document.location.href.indexOf("edit")> -1)
        edit = true;
    // CREATE
    if(document.location.href.indexOf("create")> -1)
        create = true;

///////// MAP //////////////////
var neighborhoods = [
    ];


//////// TRAITEMENT DES DONNEES/////

    var nb_entrepreneur = 1;
    var nb_balise_question = 1;
    var entrepreneurs_add = [];
    var balise_add = [];
    var question_add = [];
    var idparcour;
    var entrepreneurs = null;

    if(detail || edit)
    {
        idparcour = $("#pId").val();
        // PTOES
        $.getJSON("/api/ptoes/parcour/"+idparcour, function(result) {
            $.each(result, function(item) {
                var t = ''+
                '<tr>'+
                '<td>'+nb_entrepreneur+' </td>' +
                '<td>'+
                '<a href="/entrepreneurs/view/'+result[item].Entrepreneur.id+'">'+result[item].Entrepreneur.nom+'</a>'+
                '<input type="hidden" name="entrepreneurId" value="'+result[item].Entrepreneur.id+'" />'+
                '</td>';
                if(edit)
                   t+= '<td><button type="button" name="supEnt" class="supEnt btn btn-default" id="supEnt'+result[item].Entrepreneur.id+'" value="supprimer">Supprimer</button></td>';
                t += '</tr>';
                $('#tabPtoe').append(t);
                 nb_entrepreneur++
            });
        }).done(function( data ){
            for(var i=0; i<data.length;i++){
                entrepreneurs_add.push(data[i].Entrepreneur.id)
            }
            // Suppression des lignes du tableau
            if(edit){
                $(".supEnt").click(function(e){
                    eventSupprimerEnt(e);
                });
            }
        });

        // PTOBQS
        $.getJSON("/api/ptobqs/parcour/"+idparcour, function(result) {
            $.each(result, function(item) {
                 var t = ''+
                 '<tr>'+
                 '<td>'+nb_balise_question+'</td>'+
                 '<td>'+
                 '<a href="/balises/view/'+result[item].Balise.id+'">'+result[item].Balise.nom+'</a><input type="hidden" name="baliseId" value="'+result[item].Balise.id+'"/>'+
                 '</td>'+
                 '<td>'+
                 '<a href="/questions/view/'+result[item].Question.id+'">'+result[item].Question.question+'</a><input type="hidden" name="questionId" value="'+result[item].Question.id+'"/>'+
                 '</td>'+
                 '<td>'+result[item].ordre +'<input type="hidden" name="ordre" value="'+result[item].ordre+'"/></td>';
                if(edit)
                    t+= '<td><button type="button" name="supBQ" class="supBQ btn btn-default" id="supBQ'+result[item].Balise.id+"-"+result[item].Question.id+'" value="supprimer">Supprimer</button></td>';
                t += '</tr>';
                 $('#tabPtobq').append(t);
                 nb_balise_question++
            });
        }).done(function( data ){
          for(var i=0; i<data.length;i++){
              balise_add.push(data[i].Balise.id)
              neighborhoods.push({lat:data[i].Balise.latitude, lng:data[i].Balise.longitude});
              question_add.push(data[i].Question.id)
          }
              // Suppression des lignes du tableau
          if(edit){
              $(".supBQ").click(function(e){
                  eventSupprimerBq(e);
              });
          }
        });;

    }
    if(create || edit)
    {
        // Chargement des données

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
                i++;
            });
        }).done(function( data ) {
            questions = data;
        });

        // Traitement des données
        $("#addEnt").click(function(){
            var ent = recupererEntrepreneur($("#optEnt").val());
            if(ent == null) {
                $("#paraModal").text("L'entrepreneur utilise n'existe pas !");
                $("#myModalCaution").modal('show');
            } else if($.inArray(ent.id, entrepreneurs_add) == -1){

                var t = "" +
                "<tr >"+
                    "<td>"+ nb_entrepreneur +"</td>"  +
                    "<td>"+
                    "<a href='/entrepreneurs/view/"+ent.id+"'>" + ent.nom + "</a>"+
                    "<input type='hidden' name='entrepreneurId' value='"+ent.id+"'/>"+
                    '<td><button type="button" name="supEnt" class="supEnt btn btn-default" id="supEnt'+ent.id+'" value="supprimer">Supprimer</button></td>'+
                    "</td>"+
                "</tr>";
                $("#tabPtoe").append(t);
                nb_entrepreneur++;
                $("#supEnt"+ent.id).click(function(e){
                    eventSupprimerEnt(e);
                });
                entrepreneurs_add.push(ent.id);
            }else{
                $("#paraModal").text("Entrepreneur déjà présent dans le tableau !");
                $("#myModalCaution").modal('show');
            }
        });

        $('#addbq').click(function(){
            var b = recupererBalise($("#optb").val());
            var q = recupererQuestion($("#optq").val());
            var ordre = $("#ordre").val();

            if(b == null || q == null ) {
                $("#paraModal").text("La Balise ou Question utilisé n'existe pas !");
                $("#myModalCaution").modal('show');
                }
            else if($.inArray(b.id, balise_add) != -1) {
                $("#paraModal").text("Balise déjà utilisé !");
                $("#myModalCaution").modal('show');
                }
            else if($.inArray(q.id, question_add) != -1) {
                $("#paraModal").text("Question déjà utilisé !");
                $("#myModalCaution").modal('show');
                }
            else{
                $("#tabPtobq").append(""+
                "<tr>"+
                "<td>"+ nb_balise_question +"</td>" +
                "<td><a href='/balises/view/"+b.id+"'>"+b.nom+"</a><input type='hidden' name='baliseId' value='"+b.id+"'/></td>" +
                "<td><a href='/questions/view/"+q.id+"'>"+q.question+"</a><input type='hidden' name='questionId' value='"+q.id+"'/></td>" +
                "<td>"+ ordre +"<input type='hidden' name='ordre' value='"+ordre+"'/></td>" +
                "<td><button type='button' name='supBQ' class='supBQ btn btn-default' id='supBQ"+b.id+"-"+q.id+"' value='supprimer'>Supprimer</button></td>"+
                "</tr>"
                );
                nb_balise_question++;
                $("#supBQ"+b.id+"-"+q.id).click(function(e){
                    eventSupprimerBq(e);
                });
                balise_add.push(b.id);
                question_add.push(q.id);
            }
        });

        $('#filterbox').click(function() {
            var theme = $("#selectTheme option:selected" ).text();
            var input = $('filterbox');
            var options = $("#optq");
            options.empty();
            if ($('#filterbox').is(':checked'))
                $.each(questions, function(item) {
                    if (questions[item].Theme.nom === theme)
                        options.append($("<option />").val(questions[item].id).text(questions[item].question));
                });
            else 
                $.each(questions, function(item) {
                    options.append($("<option />").val(questions[item].id).text(questions[item].question));
                });

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

    function eventSupprimerEnt(e) {
           var ligneToDel = e.target.parentNode.parentNode;
           var el = ligneToDel.nextSibling;

           while (el) {
                el.firstChild.textContent = (parseInt(el.firstChild.textContent) - 1) + "";
                el = el.nextSibling;
           }
          for(var i=0;i < entrepreneurs_add.length;i++) {
                if(entrepreneurs_add[i] == e.target.parentNode.parentNode.firstChild.nextSibling.lastChild.value) {
                    entrepreneurs_add.splice(i, 1);
                }
          }
          ligneToDel.remove();
          nb_entrepreneur--;
    };

    function eventSupprimerBq(e) {
        var ligneToDel = e.target.parentNode.parentNode;
        var el = ligneToDel.nextSibling;

        while (el) {
                        el.firstChild.textContent = (parseInt(el.firstChild.textContent) - 1) + "";
                        el = el.nextSibling;
        }
        for(var i=0;i < balise_add.length;i++) {
            if(balise_add[i] == e.target.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling.value) {
                balise_add.splice(i, 1);
            }
        }
        for(var i=0;i < question_add.length;i++) {
            if(question_add[i] == e.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.firstChild.nextSibling.value) {
                question_add.splice(i, 1);
            }
        }
        ligneToDel.remove();
        nb_balise_question--;

    };
    // Map detail parcours
    var markers = [];
    var map;

    $("#map").hide();
    $("#affParcours").click(function(){
        centerPoint();
        $("#affParcours").hide();
    });

    function centerPoint(){

        var lt = 0;
        var lg = 0;
        for (var i = 0; i < neighborhoods.length; i++) {
            lt += neighborhoods[i].lat;
            lg += neighborhoods[i].lng;
        }
        var mlt = lt / neighborhoods.length;
        var mlg = lg / neighborhoods.length;

        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: {lat: mlt, lng: mlg}
        });

        $("#map").show();
        setTimeout(function(){drop()}, 3000);

    }

    function drop() {
      clearMarkers();
      for (var i = 0; i < neighborhoods.length; i++) {
        addMarkerWithTimeout(neighborhoods[i], i * 500);
      }
    }

    function addMarkerWithTimeout(position, timeout) {
      window.setTimeout(function() {
        markers.push(new google.maps.Marker({
          position: position,
          map: map,
          animation: google.maps.Animation.DROP
        }));
      }, timeout);
    }

    function clearMarkers() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

});
