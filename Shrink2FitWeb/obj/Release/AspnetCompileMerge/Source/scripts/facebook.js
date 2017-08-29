$(function () {

   

    window.fbAsyncInit = function () {
        FB.init({
            appId: '680037215448303',
            xfbml: true,
            version: 'v2.1'
        });


    };

    

   

    $(document).on('click', '.facebook-login', function () {
        var token = '';
        if ($(this).attr('id') == "sign-up-button") {
            if ($('input[name="agree"]:checked').val() != "on") {
                alert("יש להסכים תחילה לתנאי השימוש");
                return;
            }
        }
        FB.getLoginStatus(function (response) {
            if (response.status == "unknown") {
                FBLogin({scope: 'email'});
            }
            else if (response.status == "connected") {
                token = response.authResponse.accessToken;
                FBSignIn(token);
            }
            
        });
    });
});

function FBLogin() {
    FB.login(function () {
        FB.getLoginStatus(function (response) {
            token = response.authResponse.accessToken;
            FBSignIn(token);
        });
    }, { scope: 'email' });
}

function FBSignIn(token) {
    $.ajax({
        type: 'POST',
        data: { accesstoken: token },
        url: '/account/facebooklogin',
        success: function (data) {
            if (data.ok) {
                window.location.href = "/Personal/Index";
            }
        }

    });
}



