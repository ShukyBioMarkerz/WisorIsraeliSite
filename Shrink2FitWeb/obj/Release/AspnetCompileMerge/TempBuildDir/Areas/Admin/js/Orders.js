$(function () {
    

    $('.show-list').click(function () {
        var orderid = $(this).closest('tr').data('id');
        var url = $(this).attr('href');
        var request = '?id=' + orderid
        
        if ($(this).data('var')) {
            request += '&' + $(this).data('var');
        }
       
        var title = $(this).data('title');
        $.ajax({
            url: url + request,
            type: 'POST',
            success: function (data) {
                bootbox.dialog({
                    message: data,
                    title: title
                });
            }

        });
        return false;
    });

    $('#table').dataTable();
});