/**
 * Created by Charlie on 01/05/2016.
 */
$(document).ready(function(){
    // Initialisation des scores
    var t = $('tbody');
    var pid = 0;
    $.each(t, function(item){

        // test si id
        var id = t[item].id;
        if(id != ""){
            // Numéro du parcours
            pid = id;
        }else{
            // Récupérer la ligne
            var a = $('tbody:eq('+item+')').html();
            // Ajouter au tableau
            $("#"+pid).append(a);
        }
    });
    $(".temp").remove();

    var tabSuppression = [];

    // Suppression d'un score
    $('input[name=supone]').click(function(){
        if(!$.inArray($(this).attr('id'), tabSuppression)){
            // Do nothing
        }else{
            tabSuppression.push($(this).attr('id'));
        }
        // suprimer la ligne
        $(this).parent("td").parent('tr').remove();
    });

    // Suppression de tous les scores
    $('input[name=supall]').click(function(){
        var id = $(this).attr('id');
        id = id.substr(1, id.size);
        var c = $('tbody#'+id).children('tr');
        $.each(c, function(i){
            var idparcours = $('tbody#'+id).children('tr:eq('+i+')').children('td:eq(0)').text();
            if(!$.inArray($(this).attr('id'), tabSuppression)){
                // Do nothing
            }else{
                tabSuppression.push(idparcours);
            }
        });
        // supprimer tableau
        $('#parcours'+id).remove();
    });

    $('form').submit(function(){
        $.each(tabSuppression, function(i){
            alert(tabSuppression[i]);
            $('form:eq(0)').append("<input type='hidden' name='score' value='"+tabSuppression[i]+"' >");
        });
    });

});