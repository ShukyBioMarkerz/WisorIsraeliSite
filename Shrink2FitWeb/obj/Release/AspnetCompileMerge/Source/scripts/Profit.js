	
	function displayProfitAccordion(orderLabel, orderid) {

	    trackEvent("profitPage_showDetails_click");

		$.ajax({
			url: "/Personal/GetOrderTracks",
			type: "POST",
			data: { orderLabel: orderLabel, orderId: orderid },
			success: function (data) {
				if (data) {
					// yes, I know! ugly code. got anything better??
					if ($("#profit .accordion").length > 0) {
						$("#profit .accordion").remove();
					}
					$("#Tracks").after(data);
					$("#profit .accordion").show();
					accordionFuncs();
				}
				else {
					$("#Tracks").html("<h3>לא נמצאו נתונים</h3>");
				}
			}

		});

		//$("#profit .accordion").hide(0);

		//if (orderNumber == 2) {
		//	$("#item-shrink-to-fit").addClass("item-unabled");
		//}
	}

	function doPayment() {
		// send data to dbo.invoice 	
		var orderId = $("#currentId").val();

		$.ajax({
			url: "/Personal/SendInvoice",
			type: "POST",
			data: { OrderId: orderId },
			success: function (data) {
				if (data.message == "ok") {
					// remove orange button and show הרכב מכווץ div
				    $(".orange-big-button").hide();
				    $('#waiting-for-results').show();
					$("#Sent").css('visibility', 'visible').delay(2000).fadeOut();
					setTimeout(function () {
						closePopup();
						
						$("#item-shrink-to-fit").show();
					}, 1500);					
					
				}
				else {
					alert('לא ניתן לבצע תשלום כעת');
				}
			}

		});
	}

	// scrollable table plugin
	$(function () {
	    if ($(".mainProfitTable tr").length <= 5) {
	        $(".mainProfitTable").tableScroll({ height: 250, width: 810, headWidth: 793 });
	    }
	    else {
	        $(".mainProfitTable").tableScroll({ height: 250, width: 810, headWidth: 829 });
	    }
	    //$(".tablescroll_head").css('width','738px');
	});
	