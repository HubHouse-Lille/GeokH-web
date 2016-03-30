$(document).ready(function(){
    var i = 0;
    var j = 0;

  $("#plusIqr").click(function(){
        i++;
        $("#interview").append("" +
        "<br>" +
        "<div id='iqr"+i+"' class='panel panel-primary'>" +
            "<div class='panel-heading'>" +
                "Question "+i+" :" +
            "</div>" +
            "<div class='panel-body'>" +
                // Question :
                "<input class='form-control' type='text' name='q"+i+"' placeholder='Question'/>" +
                // Réponse :
                "<input class='form-control' type='text' name='r"+i+"' placeholder='Reponse'/>" +
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
            "<br>" +
            "<div id='iind"+j+"' class='panel panel-primary'>" +
                "<div class='panel-heading'>" +
                    "Indice "+j+" :" +
                "</div>" +
                "<div class='panel-body'>" +
                    // Question :
                    "<input class='form-control' type='text' name='ind"+j+"' placeholder='Indice'/>" +
                "</div>" +
            "</div>");
      });

      $("#moinsInd").click(function(){
            $("#iind"+j+"").remove();
            // Augmentation si plusieurs questions
            j--;
      });

      $('form').submit(function(){
            $("#interview").append("")
      });

});