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



});