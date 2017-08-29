$(function () {
    $('#search-offer').click(function () {
        var id = $(this).closest('tr').find('#orderid').val();
        $.ajax({
            url: '/admin/offers/offerslist',
            type: 'POST',
            data: { orderlabel: id },
            success: function (data) {
                $('#accordion').html(data);
            }
        });
    });
});