$(document).on("click", "#popups > #sign-in-up > #tabs > div", function () {	
	var id = $(this).attr("id");
	$("#popups > #sign-in-up").removeClass().addClass(id.substr(0, id.length - 4) + "-active");
	if (id == "sign-in-tab") {
		$("#menu-login").addClass("current-page").siblings().removeClass("current-page");
		$("#header > #top-header #menu > ul").data('active', $("#menu-login")).lavalamp("update");
	}
	else if (id == "sign-up-tab") {
		$("#menu-register").addClass("current-page").siblings().removeClass("current-page");
		$("#header > #top-header #menu > ul").data('active', $("#menu-register")).lavalamp("update");
	}
});
    
$(document).on('submit', '#sign-in-form', function () {

    trackEvent("loginPopup_login_click");

	var currentpath = window.location.pathname;

	var postData = $(this).serializeArray();

	if (ValidateSingIn(postData)) {

		$.ajax({
			url: "/account/SignIn",
			type: "POST",
			data: postData,
			success: function (data) {

			    if (data.message == 'ok') {
			        // afterLoginAnalyticsHandler(data.email, data.userId);
				    window.location.href = "/Personal/Index";
				}
				if (data.message == 'Incorrect Email')
				{
					alert('כתובת מייל לא תקינה');
				}
				if (data.message == "Incorrect password")
				{
					alert('סיסמה לא תקינה');
				}
				if (data.message == "not verified")
				{
				    $('#verification').show();
				    $('.facebook-login').hide();

				    //$('#verification a').attr('href', $('#verification a').attr('href') + '?id=' + data.id);
				    //alert("עלייך לאמת את המייל שלך ");
				}
			}
		});
	}
	return false;
});

function ValidateSingIn(postData)
{
	if (!IsEmail(postData[0].value) || postData[0].value == '') {
		$("#sign-in form input[name=email]").addClass('validate-error');
		return false;
	}

	$("#sign-in form").children('input').each(function () {
		if ($(this).attr('type') != "image") {
			if ($(this).val() == "") {
				$(this).addClass('validate-error');
				return false;
			}
		}
	});

	return true;
}

$(document).on('click', '#verification a', function () {
    $.ajax({
        url: 'account/sendVerificationMail',
        type: 'POST',
        data: {email : $("#sign-in-form input[name='email']").val()},
        success: function (data) {
            if (data.message == "ok") {
                $('#verification').text("מייל אימות נשלח לכתובת");
            }
            else {
                alert("תקלה בשליחת מייל");
            }
        }
    });
});

$(document).on('submit', '#register-form', function (e) {
    e.preventDefault();

    trackEvent("loginPopup_register_click");


	var postData = $(this).serializeArray();
		
	// validate user input check user name is availbe

	if (validateForm(postData)) {
		$.ajax({
			url: "/account/IsUserAvialble",
			type: "POST",
			data: postData[0],
			success: function (isnamevalid) {				
				if (isnamevalid == "True") {
				    var currentpath = window.location.pathname;
				    $('input.register-button').hide();
					$.ajax({
						url: "/account/RegisterNewUser",
						type: "POST",
						data: postData,
						success: function (data) {
							
							if (data.message == 'Email exist') {
							    showError('כתובת הדואל קיימת במערכת!');
							    $('input.register-button').show();
							}
							else if (data.message == 'Email not legit') {
							    showError('כתובת הדואל אינה חוקית!');
                            }
							else {
								if (data.message == 'ok') {
								    afterRegisterAnalyticsHandler(data.email, data.userId);

									//alert("נרשמת בהצלחה! כעת ניתן להכנס למערכת");
								    window.location.href = "/personal/Index";
								    
								    // $('.verify-sent').show();
								}
								else {
									showError('הוספת המשתמש נכשלה');
								}
							}
						}
					});					
				}
				else {
					
					showError('שם המשתמש תפוס');
					return false;
				}
			}
		});
	}
	else {
		console.log('5');
		return false;
	}

	return false;
});

$(document).on("click", "#lost-password-text > a", function (e) {

    trackEvent("loginPopup_lostPassword_click");

	e.preventDefault();
	e.stopImmediatePropagation();
	$("#lost-password > form > input[type='submit']").css({
		"visibility": "visible",
		"opacity": 1
	}).siblings("p").css("opacity", "0");
	/* $("#popups > #sign-in-up").fadeOut(750, function() { */
	/* openPopup("sign-in-up"); */
	$("#sign-in-up").removeClass().addClass("lost-password-active");
	/* }); */
});
$(document).on("submit","#lost-password > form", function (e) {
    e.preventDefault();

    trackEvent("lostPasswordView_sendButton_click");


	var postData = $(this).serializeArray();
																		
	if (!IsEmail(postData[0].value) || postData[0].value == '') {
		$("#lost-password input[name=email]").addClass('validate-error');
		return false;
	}

	var obj = this;

	$.ajax({
		url: "/account/SendPassword",
		type: "POST",
		data: postData,
		success: function (data) {
			if (data.message == 'no') {
				$("#lost-password input[name=email]").addClass('validate-error');
				alert('כתובת הדואל לא קיימת במערכת');
			}
			if (data.message == 'ok') {
				$(obj).children("input[type='submit']").fadeTo(750, 0, "linear", function () {
					$(obj).css("visibility", "none");
					closePopupTimeout = setTimeout(function () {
						$("#sign-in-up").removeClass().addClass("sign-in-active");
					}, 500)
				}).siblings("p").fadeTo(750, 1, "linear");
			}			
		}
	});
});

//*********
// helpers
//*********

function IsEmail(email) {
	var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
	return pattern.test(email);
}

function validateForm(postData) {
	if (!IsEmail(postData[0].value) || postData[0].value == '') {
		$('input[name=email]').addClass('validate-error');
		//alert('Problem with email');
		showError('כתובת דואר אלקטרוני לא תקינה');
		return false;
	}

	if (postData[1].value != postData[2].value || postData[1].value == '' || postData[2].value == '') {

		$("#passwords").children('input').each(function () {
			$(this).addClass('validate-error');
		});

		//alert('Password must be between 6 to 8 characters.');
		showError('הסיסמאות לא תואמות');
		return false;
	}

	if (postData[2].value.length < 6 || postData[2].value.length > 8) {
		$("#passwords").children('input').each(function () {
			$(this).addClass('validate-error');
		});
		
		showError('סיסמה חייבת להכיל בין 6 ל 8 תוים');
		return false;
	}

	if (!$('#agree').is(':checked')) {
		$('#agree-wrap').addClass('validate-error');
		showError('נא לאשר את התקנון ותנאי השימוש');
		return false;
	}

	return true;
}

$(document).on('focus', '#passwords', function () {
	clearError();
	$("#passwords").children('input').each(function () {
		$(this).removeClass('validate-error');
	});
});

$(document).on('focus', '#register-form input[name=email]', function () {
	clearError();
	$(this).removeClass('validate-error');
});

$(document).on('change', '#agree', function () {
	clearError();
	$('#agree-wrap').removeClass('validate-error');
});

$(document).on('focus', '#lost-password input[name=email]', function () {
	$(this).removeClass('validate-error');
});

// clear sign in inputs when focus-------------

$(document).on('focus', '#sign-in-form input[name=email]', function () {	
	$(this).removeClass('validate-error');
});

$(document).on('focus', '#sign-in-form input[name=password]', function () {	
	$(this).removeClass('validate-error');
});

// errors
function showError(text) {
	$('#errors').html('');
	$('#errors').append(text);
}
function clearError() {
	$('#errors').html('');
}



