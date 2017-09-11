$(function () {
    

    $(document).on('click', '#submit-message', function () {
        var toSend = { Name: $('#fullname').val(), EmailAddress: $('#email').val(), Subject: $('#subject').val(), Message: $('#message').val() };

        if (!IsEmail(toSend.EmailAddress)) {
            alert('מייל לא תקין');
            
        }
        else {
            $.ajax({
                type: 'POST',
                data: toSend,
                url: '/home/RecieveMessage',
                success: function (data) {
                    if (data.success) {
                        $('#contact h1').text('הודעתך התקבלה');
                        $('#contact h2').text('אנחנו ניצור איתך קשר בהקדם');
                        $('#form-div').slideUp('slow', function () {
                            setTimeout(function(){
                                closePopup();
                            }, 2500);
                        });
                    }
                    else {
                        $('#contact h1').text('תקלה בשליחת ההודעה').css('color','red');
                        $('#contact h2').text('נא נסה שוב מאוחר יותר');
                        $('#form-div').slideUp('slow', function () {
                            setTimeout(function () {
                                closePopup();
                            }, 1500);
                        });
                    }
                }

            });
        }
    });
});