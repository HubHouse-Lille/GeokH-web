$(document).ready(function(){
      var i = $("#propsrep div").length;
      var j = $("#retours div").length;
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

    $("#newTheme").hide();

    var type = $('#type').val();
    if(type == 'QCU'){
        $('.checkqcm').hide();
        $('.radioqcu').show();
    }else{
        $('.checkqcm').show();
        $('.radioqcu').hide();
    }
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