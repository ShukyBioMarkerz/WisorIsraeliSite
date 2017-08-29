/// <reference path="AdminPagination.js" />

$(function () {
    $('#table').dataTable();
    $('.editable').editable({
        closeOnEnter: true,
        event : 'click',
        callback: function (data) {
            var elem = data.$el.attr('id');
            var val = data.$el.text();
            $.ajax({
                type: "POST",
                url: "/admin/users/updatefield",
                data: { field: elem, value: val },
                success: function (data) {
                }
            });
        }
    });

    $('#status').change(function () {
        var status = $(this).val();
        var id = $(this).closest('tr').data('id');
        $.ajax({
            type: "POST",
            url: "/admin/users/changestatus",
            data: { ID: id, Status: status },
            success: function (data) {
            }
        });
    });

    $('#newuser').click(function () {
        bootbox.dialog({
            message: $('#userform').html(),
            title: 'Add new user',
            buttons: {
                success: {
                    label: 'Add user',
                    className: 'submitnewuser',
                    callback: function () {
                        var form = $('.modal-dialog').find('form');
                        var email = form.find('input[name="email"]').val();
                        var password = form.find('input[name="password"]').val();
                        if (!IsEmail(email)) {
                            $('.modal-dialog').find('#email-error-msg').text('invalid email');
                        }
                        else {
                            $.ajax({
                                type: 'POST',
                                url: '/admin/users/adduser',
                                data: { Email: email, Password: password },
                                success: function (data) {
                                    if (data.ok) {
                                        var elem = $('.modal-dialog').find('.bootbox-body');
                                        elem.html("User added");

                                    }
                                    else {
                                        var elem = $('.modal-dialog').find('#user-error-msg').text(data.message);
                                    }
                                }
                            });
                        }
                        return false;
                    }
                }
            }
        });
    });

    
    //pagination.init("table", "/admin/Users/GetUsersPage");
    //pagination.getPage(1);
});

function IsEmail(email) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(email);
}