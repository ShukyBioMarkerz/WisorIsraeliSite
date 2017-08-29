function ShowMessages(text) {
	$("#messages").text(text);
	$("#messages").css("visibility", "visible");
	$("#messages").show().delay(5000).fadeOut();
}