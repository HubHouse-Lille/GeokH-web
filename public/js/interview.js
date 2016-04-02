$(document).ready(function(){
    var i = $("#interview div.panel-primary").length;
    var j = $("#indice div.panel-primary").length;;

  $("#plusIqr").click(function(){
        i++;
        $("#interview").append("" +
        "<div id='iqr"+i+"' class='panel panel-primary'>" +
            "<div class='panel-heading'>" +
                "<p>Question "+i+" :</p>" +
            "</div>" +
            "<div class='panel-body'>" +
                // Question :
                "<input class='form-control' type='text' name='q"+i+"' placeholder='Question' required/>" +
                // Réponse :
                "<input class='form-control' type='text' name='r"+i+"' placeholder='Reponse' required/>" +
            "</div>" +
        "</div>");
  });

   $("#moinsIqr").click(function(){
          $("#iqr"+i+"").remove();
          i--;
    });

    $("#plusInd").click(function(){
            j++;
            $("#indice").append("" +
            "<div id='iind"+j+"' class='panel panel-primary'>" +
                "<div class='panel-heading'>" +
                    "<p> Indice "+j+" : </p>" +
                "</div>" +
                "<div class='panel-body'>" +
                    // Question :
                    "<input class='form-control' type='text' name='ind"+j+"' placeholder='Indice' required/>" +
                "</div>" +
            "</div>");
      });

      $("#moinsInd").click(function(){
            $("#iind"+j+"").remove();
            // Augmentation si plusieurs questions
            j--;
      });

      $('#form-e').submit(function(){
            $("#interview").append("<input name='nbquestion' type='hidden' value="+i+"/>");
            $("#indice").append("<input name='nbindice' type='hidden' value="+j+"/>");
      });

});