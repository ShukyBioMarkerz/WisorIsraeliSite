
//************************
// account settings
// הגדרות חשבון באיזור האישי
//************************

function EditMainMail() {
	$("#MainMailEdit").fadeIn().css("display", "inline-block");
	$("#EditMainMailBtn").hide();
}

function UpdateMainMail() {
	var newval = $("#newMainMail").val();
	if (!IsEmail(newval) || newval == '') {
		$("#newMainMail").addClass('validate-error');
		$("#mainmailerror").text("נא להזין כתובת אי-מייל חוקית");
	}
	else {
		$.ajax({
			url: "/account/UpdateUserSettings",
			type: "POST",
			data: { fieldname: "Email", value: newval },
			dataType: 'json',
			success: function (data) {
				if (data.message == "ok") {
					//alert("עודכן בהצלחה");
					hideAddMainMail();
					$("#MainMail").text(newval);
					window.location.href = "/home/Index";
				}
				else {
					ShowMessages("עריכה נכשלה, נסה שנית במועד מאוחר יותר");
				}
			}
		});
	}
}

$(document).on("focusout", "#newMainMail", function () {
	$("#newMainMail").removeClass('validate-error');
	$("#mainmailerror").text("");
});

function hideAddMainMail() {
	$("#MainMailEdit").hide();
	$("#EditMainMailBtn").fadeIn().css("display", "inline-block");
}

function showAddSubMail() {
	$("#accountAddMailButton").hide();
	$('#secondaryExist').hide();
	$("#accountAddMail").fadeIn().css("display", "inline-block");
}
function hideAddSubMail() {
	$("#accountAddMail").hide(0);
	$("#accountAddMailButton").fadeIn(200);
	$("#secondaryExist").fadeIn().css("display", "inline");

	$("#accountAddMail input[type=text]").attr("placeholder", "");
}

function UpdateSecondaryMail() {
	var newmail = $("#accountAddMail input[type=text]").val();
	if (!IsEmail(newmail) || newmail == '') {
		$("#accountAddMail input[type=text]").addClass('validate-error');
		$("#secondarymailerror").text("נא להזין כתובת אי-מייל חוקית");		
		return false;
	}
	else {

		$.ajax({
			url: "/account/UpdateUserSettings",
			type: "POST",
			data: { fieldname: "SecondaryEmail", value: newmail },
			dataType: 'json',
			success: function (data) {
				if (data.message == "ok") {
					$("#accountAddMailButton").html("עריכה");
					hideAddSubMail();
					$("#secondaryExist").text(newmail);
					$("#secondarymailerror").text("");
				}
				else {
					ShowMessages("עריכה נכשלה, נסה שנית במועד מאוחר יותר");
				}
			}
		});
	}
}

$(document).on("focusout", "#newSubMail", function () {
	$("#newSubMail").removeClass('validate-error');
	$("#secondarymailerror").text("");
});

function showChangePass() {
	$("#changePassButton").hide();
	$("#accountChangePassword").fadeIn().css("display", "inline-block");
}
function hideChangePass() {
	$("#accountChangePassword").hide(0);
	$("#changePassButton").fadeIn(200);
}

var ispassformcalid = true;

$(document).on('submit', '#newpasswordform', function (e) {
	e.preventDefault();
	var postData = $(this).serializeArray();
	if (ispassformcalid) {
		$.ajax({
			url: "/account/UpdateUserSettings",
			type: "POST",
			data: { fieldname: "Password", value: $("#newpasswordform input[name=newPass]").val() },
			dataType: 'json',
			success: function (data) {
				if (data.message == "ok") {
					hideChangePass();
					Clearnewpasswordform();
					ShowMessages("סיסמתך עודכנה בהצלחה");
				}
				else {
					ShowMessages("עריכה נכשלה, נסה שנית במועד מאוחר יותר");
				}
			}
		});
	}
});
function Clearnewpasswordform() {
	$("#newpasswordform table :input").each(function () {
		$(this).val('');
	});
}

$(document).on("focusout", "#newpasswordform input[name=currentPass]", function () {
	var newval = $("#newpasswordform input[name=currentPass]").val();
	if (newval != '') {
		$.ajax({
			url: "/account/CheckCurrentPassword",
			type: "POST",
			data: { Password: newval },
			dataType: 'json',
			success: function (data) {
				if (data.message == "fail") {
					$("#currentPassError").text('נא להזין סיסמה נוכחית');
					ispassformcalid = false;
				}
				else {
					$("#currentPassError").text('');
					ispassformcalid = true;
				}
			}
		});
	}
});
$(document).on("focusout", "#newpasswordform input[name=newPass]", function () {
	// TODO CHECK ALPHANUMERIC
	var newval = $("#newpasswordform input[name=newPass]").val();
	if (newval != '') {
		if (newval.length <= 6 && newval.length >= 8) {
			$("#passlength").text("הסיסמה חייבת להיות בין 6 ל-8 תווים");
			ispassformcalid = false;
			return false;
		}
		else {
			ispassformcalid = true;
		}

	}
});
$(document).on("focusout", "#newpasswordform input[name=validPass]", function () {
	var newval = $("#newpasswordform input[name=validPass]").val();
	if (newval != '') {
		if (newval != $("#newpasswordform input[name=newPass]").val()) {
			$("#mismatch").text("הסיסמאות לא תואמות");
			ispassformcalid = false;
			return false;
		}
		else {
			ispassformcalid = true;
		}
	}
});

// user name

function showEditUserName() {
	$("#editUserName").hide();
	$("#accountEditUserName").fadeIn().css("display", "inline-block");
}

function hideUserName() {
	$("#accountEditUserName").hide(0);
	$("#editUserName").fadeIn(200);
}

function updateUserName() {

	var newval = $("#newUserName").val();

	if (ValidUserName()) {
		$.ajax({
			url: "/account/UpdateUserSettings",
			type: "POST",
			data: { fieldname: "Name", value: newval },
			dataType: 'json',
			success: function (data) {
				if (data.message == "ok") {
					hideUserName();
					$("#UserName").html(newval);
					ShowMessages("שם המשתמש עודכן בהצלחה");
				}
				else {
					ShowMessages("עריכה נכשלה, נסה שנית במועד מאוחר יותר");
				}
			}
		});
	}
}

function ValidUserName() {
	var newval = $("#newUserName").val();
	if (newval != '') {
		if (newval.length <= 2 && newval.length >= 15) {
			$("#namelength").text("שם המשתמש חייב להיות בין 2 ל-15 תווים");
			return false;
		}
		else {
			return true;
		}

	}
}