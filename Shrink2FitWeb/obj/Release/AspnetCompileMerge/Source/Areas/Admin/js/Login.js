$(function () {
    $('input').keypress(function (e) {
        if (e.which == 13) {
            $('form').submit();
        }
        
    });

    $('#button').click(function () {
        $('form').submit();
    });

    $('form').submit(function () {
        var postData = $(this).serializeArray();
        $.ajax({
            url: "/admin/account/login",
            type: "POST",
            data: postData,
            success: function (data) {
                if (data.message == 'ok') {
                    window.location.href = "/admin/home/index";
                }
                else {
                    $('#message').text(data.message);
                }
            }
        });
        return false;
    });
});