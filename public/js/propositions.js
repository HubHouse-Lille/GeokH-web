$(document).ready(function(){

    var i = $("#propsrep div").length;
    var j = $("#retours div").length;
    var type = $('#type').val();

    if(type == 'QCU'){
        $('.checkqcm').hide();
        $('.radioqcu').show();
    }else{
        $('.checkqcm').show();
        $('.radioqcu').hide();
    }

    $("#newTheme").hide();

    // QUESTION MYSTERE
    $("#plusProps").prop('disabled', false);
    $("#moinsProps").prop('disabled', false);
    $("#e0a").hide();

    // Question secrete
    $("#typeq").change(function(){
        var typed = $("input[name='typeq']:checked").val();
        if(typed == 0){
            $("#type").append($("<option />").val('QCM').text("Question a choix multiple"));
            $("#e0a").hide();
            $("#plusProps").prop('disabled', false);
            $("#moinsProps").prop('disabled', false);
            $("#propsrep").empty();
            i = 0;
        }else{
            // QUESTION MYSTRERE
            $("#propsrep").empty();
            i = 0;
            $("#type option[value='QCM']").remove();
            $("#e0a").show();
            // récupération des parcours
            $("#optqm").empty();
            $.getJSON("/api/parcours/question_mystere", function(result) {
                var options = $("#optqm");
                $.each(result, function(item) {
                    options.append($("<option />").val(result[item].id).text(result[item].nom));
                });
            }).done(function( data ) {
                 var o = $("#optqm option:selected").val();
                 $("#propsrep").empty();
                 $.getJSON("/api/ptoes/parcour/"+o, function(result) {
                     $.each(result, function(item) {
                         $("#propsrep").append("" +
                             "<div id='pr"+result[item].Entrepreneur.id+"' class='input-lg-8 input-lg'>" +
                                 "<input type='text' class='form-control' name='props' required  value='"+result[item].Entrepreneur.id+" - "+result[item].Entrepreneur.nom+" "+result[item].Entrepreneur.prenom+"' readonly='' />" +
                             "</div>")
                         i++
                     });
                 });
            });

            $("#plusProps").prop('disabled', true);
            $("#moinsProps").prop('disabled', true);

            $("#optqm").unbind('change').change(function(e){
                var o = $("#optqm option:selected").val();
                $("#propsrep").empty();
                i = 0;
                    $.getJSON("/api/ptoes/parcour/"+o, function(result) {
                         $.each(result, function(item) {
                             $("#propsrep").append("" +
                                 "<div id='pr"+result[item].Entrepreneur.id+"' class='input-lg-8 input-lg'>" +
                                     "<input type='text' class='form-control' name='props' required  value='"+result[item].Entrepreneur.id+" - "+result[item].Entrepreneur.nom+" "+result[item].Entrepreneur.prenom+"' readonly='' />" +
                                 "</div>")
                             i++
                         });
                     });
                e.preventDefault();
            });

        }
    });

    // Check du form
    $('form').submit(function(){
        for(var i=0;i< $("#selectTheme option").size();i++) {
            if(document.getElementById("selectTheme").options[i].text.toLowerCase() == $("#inputNewTheme").val().toLowerCase() &&
                $("#inputNewTheme").val().toLowerCase() != "") {
                    alert("Ce thème existe déjà");
                    return false;
            }
        }
        $("#propsrep").append("<input name='nbpropositions' type='hidden' value='"+i+"'/>");
        $("#retours").append("<input name='nbretours' type='hidden' value='"+j+"'/>");
         if(type == 'QCM'){
                $('.radioqcu').remove();
         }else{
                $('.checkqcm').remove();
         }

    });

    // Ajout du theme
    $("#addTheme").click(function() {

        if($("#newTheme").is(":hidden")) {
            $("#newTheme").show();
            $("#selectTheme").attr('disabled', 'disabled');
        } else {
            $("#newTheme").hide();
            $("#selectTheme").removeAttr('disabled');
            $("#inputNewTheme").val("");
        }
    });

    $('#type').change(function(){
        type = $('#type').val();
        if(type == 'QCM') {
            $('.checkqcm').show();
            $('.radioqcu').hide();
        } else {
            $('.checkqcm').hide();
            $('.radioqcu').show();
        }
    });

    $("#plusProps").click(function(){
        i++;
        $("#propsrep").append("" +
        "<div id='pr"+i+"' class='input-lg-8 input-lg'>" +
            "<input type='text' class='form-control' name='props' required />" +
            "<input class='checkqcm' type='checkbox' name='rqcm' value='"+i+"'/>" +
            "<input class='radioqcu' type='radio' name='rqcu' value='"+i+"' />"+
        "</div>");
        if(type == 'QCM'){
            $('.checkqcm').show();
            $('.radioqcu').hide();
        }else{
             $('.checkqcm').hide();
             $('.radioqcu').show();
        }
  });

    $("#moinsProps").click(function(){
        if(i>0){
          $("#pr"+i+"").remove();
          i--;
        }
    });

    $("#plusRet").click(function(){
        j++;
        $("#retours").append("" +
        "<div id='ret"+j+"' class='iinput-lg-8 input-lg' >" +
            "<input type='text' class='form-control' name='retour' required />" +
        "</div>");
    });

    $("#moinsRet").click(function(){
        if(j>0){
          $("#ret"+j+"").remove();
          j--;
        }
    });

});