$( document ).ready(function() {

    $('#myModal').on('show', function() {
        var id = $(this).data('id'),
            removeBtn = $(this).find('.danger');
    })

    $('.confirm-delete').on('click', function(e) {
        e.preventDefault();

        var id = $(this).data('id');
        $('#myModal').data('id', id).modal('show');
    });

    $('#btnYes').click(function() {
        // handle deletion here
        alert("do delete");
        //var id = $('#myModal').data('id');
        //$('[data-id='+id+']').remove();
        //$('#myModal').modal('hide');
    });
});
