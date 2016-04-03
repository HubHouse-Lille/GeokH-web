$(document).ready(function(){
      var i = 0;
      var j = 0;
    // Check du form
    $('form').submit(function(){
        for(var i=0;i< $("#selectTheme option").size();i++) {
            if(document.getElementById("selectTheme").options[i].text.toLowerCase() == $("#inputNewTheme").val().toLowerCase()) {
                alert("Ce thème existe déjà");
                return false;
            }
        }
        $("#propsrep").append("<input name='nbproposition' type='hidden' value="+i+"/>");
        $("#retours").append("<input name='nbretours' type='hidden' value="+j+"/>");
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

    var type = 'QCU';
    $('#type').change(function(){
        type = $('#type').val();
        if($('#type').val() == 'QCM') {
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
        "<div id='pr"+i+"' >" +
            "<input type='text' name='props"+i+"' required />" +
            "<input class='checkqcm' type='checkbox' name='rqcm'"+i+"' value='"+i+"'/>" +
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
            "<div id='ret"+j+"' >" +
                "<input type='text' name='retour"+j+"' required />" +
            "</div>");
      });

       $("#moinsRet").click(function(){
            if(j>0){
              $("#ret"+j+"").remove();
              j--;
            }
        });

});