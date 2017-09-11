
var CANLEAVE = false;

// on first run, call the neworder html
$(function () {

	//$(".page").css("min-height", $(document).height() - ($("#top-header").height() + $("#footer").height()) - 100);

	accordionFuncs();
	CostumSelectPlaster();
	ShowHideSteps();
	
	$(window).on('beforeunload ', function () {
		//openPopup('calculate');
		if (!CANLEAVE) {
			if (Orderobj.data.Userid != "")
				return "רגע..... \n האם את/ה בטוח/ה שאת/ה רוצה לעזוב באמצע יצירת הזמנה?";
		}
	});

	$("#phase-chooseDealType").css("visibility", "hidden");

	


});


function ShowHideSteps() {
	var url = window.location.pathname.split('/');
	if (url[url.length - 1] == "NewOrder" || url[url.length - 1] == "Index") {
		$("#steps").css("display", "block");

	}
	else {
		$("#steps").css("display", "none");
	}
}
/*
$(document).on("click", ".page#personal #side-nav > ul > li > a", function (e) {
	
	e.preventDefault();
	e.stopImmediatePropagation();


	$("#inner-content").fadeOut(1000).promise().done(function () {
		// ajax call, append result to #inner-content, change #steps opacity accordingly
		$.ajax({
			url: url,
			type: "POST",
			success: function (data) {
				if (url == "/personal/NewOrder") {
					$("#steps").css("display", "block");
					
				}
				else {
					$("#steps").css("display", "none");
				}
				// change current-tab class to sender
				ClearSelectedTabs();
				$(sender).parent().addClass("current-tab");

				$("#inner-content").html(data);				

				

				$("#inner-content").fadeIn(1000);

				accordionFuncs();
				
			}
		});

	});
	
	var url = $(this).attr('url');
	
	var sender = this;

	if (url == "/personal/LogOut") {
		$.ajax({
			url: url,
			type: "GET",
			success: function (data) {
				window.location.href = "/home/Index";
			}
		});
		return;
	}	
	
});*/

// in first tab, hide next button until user checks cb's
$(document).on("change", ".deal-choice", function () {
    
    if (!$("#buy-property").is(":checked") && $('input[name="deal-type"]:checked').val() != "3") {
        $("#phase-chooseDealType").css("visibility", "hidden");
        $('input[name="deal-type"]:checked').prop('checked', false);
        $('#buy-first-hand-details').hide();
        return;
    }
    else {
        if ($("#buy-property").is(":checked")) {
            if ($('input[name="deal-type"]:checked').val() == "1" || $('input[name="deal-type"]:checked').val() == "2") {
                $("#phase-chooseDealType").css("visibility", "visible");
                return;
            }
        }
        else {
            $("#phase-chooseDealType").css("visibility", "visible");
            return;
        }
       
    }



    //if (!$("#buy-property").is(":checked") && $('input[name="deal-type"]:checked').val() != "3") {
    //    $("#phase-chooseDealType").hide();
    //    return;
    //}
    //if ($(this).attr("id") == "buy-property") {
	//	if ($("#buy-first-hand").is(":checked") || $("#buy-second-hand").is(":checked")) {
	//		$("#phase-chooseDealType").css("visibility", "visible");
	//	}
	//}
	//else if ($(this).attr("id") == "buy-first-hand" || $(this).attr("id") == "buy-second-hand") {
	//	if ( $("#buy-property").is(":checked")) {
	//		$("#phase-chooseDealType").css("visibility", "visible");
	//	}
	//}
	//else {
	//	$("#phase-chooseDealType").css("visibility", "visible");
	//}
	
});

$(document).on("change", "#num-of-borrowers", function () {
    if ($(this).val() != 1) {

        $('#relations').show(500);
    }
    else {
        $('#relations').hide(500);
    }
});
// why did I wraped the bloody thing? for it to work in the ajax callback!
function accordionFuncs() {

	// placed here to catch all input's
	$('input.number-input').number(true, 0);


	function accordionOpenItem(item) {
		item.siblings().removeClass('open').children('.item-title').css({
			'borderBottomWidth': "2px"
		}).siblings('.item-content').slideUp(750, function () {
			$(this).css("display", "none").siblings('.item-title').removeAttr('style');
		});
		if (item.hasClass('open')) {
			item.removeClass('open').children('.item-title').css({
				'borderBottomWidth': "2px"
			}).siblings('.item-content').slideUp(750, function () {
				$(this).css("display", "none").siblings('.item-title').removeAttr('style');
			});
		}
		else {
			item.addClass('open').children('.item-content').slideDown(750, function () {
				$(this).css("display", "block");
				if (item.closest('.page#personal').is('*')) {
					var viewHeight = $(window).height() - $("#top-header").height(),
						itemOffsetTop = item.offset().top - $("#top-header").height() - $("body").scrollTop(),
						itemHeight = item.height();
					if (itemOffsetTop + itemHeight > viewHeight) {
						if (item.hasClass("item-summary")) {
							// var scrollTo = itemOffsetTop; COMMENTED BY EHUD - PREVENT CLOSING THE ACCORDIONS
						}
						else
							var scrollTo = Math.min(itemOffsetTop + itemHeight - viewHeight + 50, itemOffsetTop);
						$("html, body").scrollTo(scrollTo + $("body").scrollTop(), {
							"easing": "easeInOutCubic",
							"axis": "y",
							"duration": 200,
							"onAfter": function () {
								enable_scroll();
							}
						});
					}
				}
			});

		}
		if (item.hasClass('item-shrink-to-fit') || item.hasClass('item-compare')) {

		}
		else {
		    $('.item:not(.open)').addClass('item-unabled');
		}
	}

	//*********
	// this is used only to validate and go through each order step. 
	// Using PersonalValidate.js. data gatherd by Orderobj
	//*********
	$(".accordion > .item .next-item").on("click", function () {

		var currentWindowCheck = $(this).closest(".item").attr('id');
		var flag = true;
		var errorLog = "";
		trackEvent("newOrder_accordionNextItem_click", { item: currentWindowCheck });

		switch (currentWindowCheck) {
			//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
			case "item-deal-type":
				
				if ($('input[name="deal-type"]:checked').val() == 3) {

					$('#item-recycle-check').removeClass("item-no-show");					
					$("#contain-buy-loan-details").css("display", "none");
					$("#contain-recycle-loan-details").css("display", "block");
					
				}
				else {

					flag = PersonalValidate.DealType();

					$('#item-recycle-check').addClass("item-no-show");					
					$("#contain-recycle-loan-details").css("display", "none");
					$("#contain-buy-loan-details").css("display", "block");
					
				}				

				$('#item-borrowers-details').removeClass("item-unabled");

				Orderobj.phase1();

				break;
				//BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
			case "item-borrowers-details":
				
				flag = PersonalValidate.BorrowersDetails();

				if (flag) {
					
					$('#item-loan-details').removeClass("item-unabled");
					//plaster for UI stuff			
					$("#item-borrowers-details .item-content").removeClass("item-borrowers-details-plaster");

				}

				Orderobj.phase2();

				break;
				//CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
			case "item-loan-details":

				if (Orderobj.data.DealType.Type == 3) {
					
					flag = PersonalValidate.RecycleDeal();

					if (flag) {

						$('#item-confirmation').removeClass("item-unabled");

						$("#cubes, #cubes + p").animate({
							"opacity": 1
						}, 750);
						$this = $(this);

					//	if ($this.closest('.item').nextAll(".item").not(".item-no-show").first().hasClass('item-unabled') == false)
					//		accordionOpenItem($this.closest('.item').nextAll(".item").not(".item-no-show").first());

						//setTimeout(function () {
						//	//accordionOpenItem($this.closest('.item').next());
						//	if ($this.closest('.item').nextAll(".item").not(".item-no-show").first().hasClass('item-unabled') == false)
						//		accordionOpenItem($this.closest('.item').nextAll(".item").not(".item-no-show").first());
						//	$("#cubes, #cubes + p").animate({
						//		"opacity": 0
						//	}, 0);
						//}, 3500);

						// gether data
						Orderobj.phase3();

						//return;
					}


				}
				else {

					flag = PersonalValidate.BuyDeal();					

					if (flag) {
						
						$('#item-confirmation').removeClass("item-unabled");
						$("#cubes, #cubes + p").animate({
							"opacity": 1
						}, 750);
						$this = $(this);

					//	accordionOpenItem($this.closest('.item').nextAll(".item").not(".item-no-show").first());

						/*	animation
												setTimeout(function () {
													//accordionOpenItem($this.closest('.item').next());
													if ($this.closest('.item').nextAll(".item").not(".item-no-show").first().hasClass('item-unabled') == false)
														accordionOpenItem($this.closest('.item').nextAll(".item").not(".item-no-show").first());
													$("#cubes, #cubes + p").animate({
														"opacity": 0
													}, 0);
												}, 3500);
						*/
						// gether data
						Orderobj.phase3();

						//return;
					}

				}

				break;
				//DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
			case "item-recycle-check":

				flag = PersonalValidate.RecycleCheck();

				if (flag) {					
					$('#item-confirmation').removeClass("item-unabled");					
				}

				// gether data
				Orderobj.phase3_5();

				break;
			case "item-confirmation":
				//EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE

				flag = PersonalValidate.Confirmation();

				if (flag) {					
					$('#item-offers').removeClass("item-unabled");	
				}
				// gether data
				Orderobj.phase4();

				break;
			case "item-offers":
				//FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF

				flag = PersonalValidate.Offers();
				
				if (flag) {					
					$('#item-adaptations').removeClass("item-unabled");
				}

				// gether data
				Orderobj.phase5();
				break;
			case "item-adaptations":
				//GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
				
			    flag = PersonalValidate.Adaptations();

				if (flag) {					
					$('#item-summary').removeClass("item-unabled");
				}

				// gether data
				Orderobj.phase6();

			    // Shuky - probably the place to check the if the new loan parameters are legal / logic
				CalculateLoan();

				break;
			default:
				return;
				break;

		}
		if (!flag) {
		    trackEvent("newOrder_accordionItem_error", { item: currentWindowCheck });
		    alert(PersonalValidate.errorLog);

		}
		else if ($(this).closest('.item').nextAll(".item").not(".item-no-show").first().hasClass('item-unabled') == false) {

		    trackEvent("newOrder_accordionItem_view", { item: currentWindowCheck });

			var elem = $(this).closest('.item').nextAll(".item").not(".item-no-show").first();
			if ($(elem).hasClass("item-summary")) {
				//Orderobj.submit(elem); !!! submit is in script.js openpopup if calculate
				Orderobj.GetLabel();
			}
			else {
				accordionOpenItem(elem);
			}
		}

		// aborted - data is taken in getOrder.js
		//updateOrderDetails();
	});
	$(".accordion > .item .prev-item").on("click", function () {
	    accordionOpenItem($(this).closest('.item').prev());

	    var currentWindowCheck = $(this).closest(".item").attr('id');
	    trackEvent("newOrder_accordionItem_back", { item: currentWindowCheck });

		/*
		// if tab בדיקת כדאיות מחזור is hidden
		if ($(this).closest('.item').attr('class') == "item item-confirmation open") {
			if (Orderobj.data.DealType.Type == "recycle" && Orderobj.data.DealType.WithTest == "true") {
				accordionOpenItem($(this).closest('.item').prev());
			}
			else {
				accordionOpenItem($(this).closest('.item').prev().prev());
			}
		}
		else {
			accordionOpenItem($(this).closest('.item').prev());
		}*/
	});

	//******************
	// בחר סוג עסקה
	//******************
	$(".item-deal-type > .item-content > input[type='radio']").on("change", function () {
		if ($(".item-deal-type #recycle").is(":checked")) {
			$(".item-deal-type #recycle-checked").css('opacity', 0)
                .slideDown('slow')
                .animate(
                { opacity: 1 },
                { queue: false, duration: 'slow' }
            );
		}
		else {
			$(".item-deal-type #recycle-checked").css('opacity', 1)
                .slideUp('slow')
                .animate(
                { opacity: 0 },
                { queue: false, duration: 'slow' }
            );
		}
	});


	$("#buy-first-hand-details-hasrent").on("change", function () {
		if ($(this).is(":checked")) {
			$("#buy-first-hand-details-currentrent").attr("disabled", "disabled");
			$("#buy-first-hand-details-currentrent").val(0);
		}
		else {
			$("#buy-first-hand-details-currentrent").removeAttr("disabled");
		}
	});

	$("#buy-first-hand-details-currentrent").number(true, 0);


	// at השלמת פרטי הלוואה' check if the fields were changed after a test was made	
	$(document).on("keyup", "#property-value-buy, #loan-desire, #wanted-return-buy, #property-value-recycle, #loan-left, #wanted-return-recycle", function () {

		$("#continue-checked").hide();

		$("#check-ratio").show();
		
	});




	//******************
	// pre define actions
	//******************
	$(".accordion > .item.open").children(".item-content").css("display", "block");
	$(".accordion > .item:not(.open)").children(".item-content").css("display", "none");

	$(".accordion > .item > .item-title").on("click", function () {
	    if ($(this).parent().hasClass('item-unabled') == false && $(this).parent().hasClass('open') == false) {

			// silly code to handle div jumping on selected index changed
			if ($(this).html() != "השלמת פרטי לווים") {
				// plaster for next section
				$("#item-borrowers-details .item-content").removeClass("item-borrowers-details-plaster");
			}

			accordionOpenItem($(this).parent());
		}
	});
	//------------------

	// this is here for mystical reasons - don't touch or the world would collapse!
	$(".table-after-checkbox select").removeAttr("style").customSelect();
	// generic, just make sure the 'yes' cb has class="ShowCb" data-attr="CONTAINER"
	$(".ShowCb").change(function () {
		var tablename = $(this).attr("data-attr");
		if (tablename == 'loan-details') {
			$('#has-loan-check').val('true');
		}
		var $elem = $("#" + tablename);

		$elem.css('opacity', 0)
                .slideDown('slow', function () {
                	if ($elem.closest('.page#personal').is('*')) {
                		var viewHeight = $(window).height() - $("#top-header").height(),
							itemOffsetTop = $elem.offset().top - $("#top-header").height() - $("body").scrollTop(),
							itemHeight = $elem.height();
                		if (itemOffsetTop + itemHeight > viewHeight) {
                			var scrollTo = Math.min(itemOffsetTop + itemHeight - viewHeight + 50, itemOffsetTop);
                			$("html, body").scrollTo(scrollTo + $("body").scrollTop(), {
                				"easing": "easeInOutCubic",
                				"axis": "y",
                				"duration": 0,
                				"onAfter": function () {
                					enable_scroll();
                				}
                			});
                		}
                	}
                })
                .animate(
                { opacity: 1 },
                { queue: false, duration: 'slow' });

	});
	// generic, just make sure the 'no' cb has class="HideCb" data-attr="CONTAINER"
	$(".HideCb").change(function () {
	    var tablename = $(this).attr("data-attr");
	    if (tablename == 'buy-hand') {
	        $('#buy-property').removeAttr('checked');
	    }
		if (tablename == 'loan-details') {
			$('#has-loan-check').val('false');
		}
		var $elem = $("#" + tablename);

		$elem.css('opacity', 1)
			   .slideUp('slow')
			   .animate(
			   { opacity: 0 },
			   { queue: false, duration: 'slow' }
		   );

	});

	$('input[name=deal-type]').change(function () {
	    if ($('input[name="deal-type"]:checked').val()) {
	        $("#phase-chooseDealType").show();
	    }
	    else {
	        $("#phase-chooseDealType").hide();
	    }
	});

	$('input[name=deal-hand]').change(function () {
	    if ($('#buy-property').is(':checked')) {
	        $('#recycle').removeAttr('checked');
	        $("#phase-chooseDealType").hide();
	    }
	    else {
	        var tablename = $(this).attr("data-attr");
	        if (tablename == 'loan-details') {
	            $('#has-loan-check').val('false');
	        }
	        var $elem = $("#" + tablename);

	        $elem.css('opacity', 1)
                   .slideUp('slow')
                   .animate(
                   { opacity: 0 },
                   { queue: false, duration: 'slow' }
               );
	    }
	});

	$(document).on("click", ".removeMustTr, .removeReleaseTr ,.removeSavingsTr, .removeBankBidTr", function () {

	    if ($(this).attr('class') == "removeBankBidTr") {
	        $table = $(this).parent().parent().parent().parent();
	        $(this).parent().parent().remove();

	        var trClass = $(this).closest("tr").attr("class");

	        var thisClass = $(this).attr("class");

	        if ($($table).find("." + thisClass).length == 1) {
	            $($table).find("." + thisClass).hide();
	        }
	    }

	    else {
	        $(this).closest("tr").remove();

	        var trClass = $(this).closest("tr").attr("class");

	        var thisClass = $(this).attr("class");

	        if ($("." + thisClass).length == 1) {
	            $("." + thisClass).hide();
	        }

	    }
	});

	// in the second part of the accordinon השלמת פרטי לווים' pre set the drop downs

	if (document.getElementById("youngest-borrower") != null) {
		document.getElementById("youngest-borrower").selectedIndex = -1;
	}
	if (document.getElementById("num-of-borrowers") != null) {
		document.getElementById("num-of-borrowers").selectedIndex = -1;
	}

	//$("#num-of-borrowers").customSelect();
	//$("#youngest-borrower").customSelect();
	//$("#bank-name-recycle").customSelect();
	//$("#loaners-relation").customSelect();
	//$("#agree-secondary-account-bank").customSelect();
	//$("#agree-main-account-bank").customSelect();

	//$("#buy-first-hand-details-selectYear").customSelect();	
	//$("#buy-first-hand-details-selectMonth").customSelect();
	
	//$(document).on("focusout", ".avarageIncome", function () {
	//	var num = $(this).val();
	//	$(this).val(parseFloat(num).toFixed(2) + "%");

	//});

    // this should catch new dom elements
	$(document).on('click', '.bank-account-management', function () {
	    if ($(this).is(':checked')) {
	        $('#' + $(this).attr('id') + '-bank').removeAttr('disabled')
	    }
	    else {
	        $('#' + $(this).attr('id') + '-bank').attr('disabled','disabled');
	    }
	});

	$(document).on("focusout", ".percentage", function () {
	    if (!$(this).val() == "" && !(parseFloat($(this).val()).toFixed(2) == 'NaN')) {


	        var num = $(this).val();
	        $(this).val(parseFloat(num).toFixed(2) + "%");
	    }
	    else {
	        $(this).val('');
	    }

	});

	$("#buy-hand-year").customSelect();
	$("#buy-hand-month").customSelect();

    // for the current year display only from the current month and on. For the future year - show all months
	$("#buy-first-hand-details-selectYear").on("change", function () {
	    var months = [ "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר" ];
	    var selectedYear = $("#buy-first-hand-details-selectYear").val();
	    var fromMonth = 0;
	    var currentTime = new Date();
	    // alert("select year changed: " + selectedYear + ", getFullYear: " + currentTime.getFullYear() + ", month: " + currentTime.getMonth() + 1);
	    if (selectedYear == currentTime.getFullYear() /*DateTime.Now.Year*/) {
	        fromMonth = currentTime.getMonth() + 1 /*DateTime.Now.Month*/;
	    }

	    $("#buy-first-hand-details-selectMonth").empty();
	    for (var i = fromMonth; i < 12; i++)
	    {
	        $("#buy-first-hand-details-selectMonth").append("<option value=" + i + ">" + months[i] + "</option>");
	    }
	    $("buy-first-hand-details-selectMonth select").val(months[fromMonth]).change();
	    $("buy-first-hand-details-selectMonth").val(fromMonth.toString()).change();
	});

	


	//this piece of strange code, is to prevent a mysterios bug that reduce the height of the containing div.
	$("#num-of-borrowers").on("change", function () {
		$("#item-borrowers-details .item-content").addClass("item-borrowers-details-plaster");

	});
	$("#youngest-borrower").on("change", function () {
		$("#item-borrowers-details .item-content").addClass("item-borrowers-details-plaster");
	});
	$("#loaners-relation").on("change", function () {
		$("#item-borrowers-details .item-content").addClass("item-borrowers-details-plaster");
	});
	// end of strange code!

	//$("#monthlyReturnTime").customSelect();	
	//$("#fullOutTime").customSelect();

	$(".item-confirmation #agree-confirmation").on("change", function () {
		if ($(this).is(":checked")) {
			$(this).siblings("#checkboxes").css('opacity', 0)
                .slideDown('slow')
                .animate(
                { opacity: 1 },
                { queue: false, duration: 'slow' }
            );
		}
		else {
			$(this).siblings("#checkboxes").css('opacity', 1)
                .slideUp('slow')
                .animate(
                { opacity: 0 },
                { queue: false, duration: 'slow' }
            );
		}
	});
	$('#loan-details select').customSelect();
	//בדיקת כדאיות מחזור
	var countLoanRoutes = 1;
	// here to connect the costum select design
	$("#item-recycle-check table select").removeAttr("style").customSelect();
	// at first there's only one row - Ruslan is here. 
	$(".removeRecycleTr").hide();

	$(document).on("click", "#addLoanRoute", function () {
	    if (countLoanRoutes < 8 && PersonalValidate.AddRowCheck($("#allLoansTable"))) {
            var $table = $(this).prev("table");
	        var elem = $table.find("tr:last-of-type").clone().appendTo($table);
	        elem.find('input').val('');
	        elem.find('select.track-period').html('');
	        countLoanRoutes++;
	        $('input.number-input').number(true, 0);
	        $("table .customSelect").remove();
	        $("table select").removeAttr("style").customSelect();

	        $(".removeRecycleTr").show();
            
	    }
	    else {
	        if (!PersonalValidate.Validate()) {
	            alert(PersonalValidate.errorLog);
	        }
	        else {
	            alert("ניתן להוסיף רק עד 8 מסלולים");
	        }
	    }
	});

	$(document).on("click", ".removeRecycleTr", function () {
		countLoanRoutes--;

		$(this).closest("tr").remove();

		if (countLoanRoutes == 1) {
			$(".removeRecycleTr").hide();
		}
	});

	// for הצעות מחיר בנקים למשכנתאות section in accordioin

	$("#doesnt-have-offers").on("click", function () {
		$elem = $("#banksContainer");
		$elem.css('opacity', 1)
			.slideUp('slow')
			.animate(
			{ opacity: 0 },
			{ queue: false, duration: 'slow' }
			);
	});
	$("#has-offers").on("click", function () {
		$elem = $("#banksContainer");
		$elem.css('opacity', 0)
			.slideDown('slow', function () {
				if ($elem.closest('.page#personal').is('*')) {
					var viewHeight = $(window).height() - $("#top-header").height(),
						itemOffsetTop = $elem.offset().top - $("#top-header").height() - $("body").scrollTop(),
						itemHeight = $elem.height();
					if (itemOffsetTop + itemHeight > viewHeight) {
						var scrollTo = Math.min(itemOffsetTop + itemHeight - viewHeight + 50, itemOffsetTop);
						$("html, body").scrollTo(scrollTo + $("body").scrollTop(), {
							"easing": "easeInOutCubic",
							"axis": "y",
							"duration": 0,
							"onAfter": function () {
								enable_scroll();
							}
						});
					}
				}
			})
			.animate(
			{ opacity: 1 },
			{ queue: false, duration: 'slow' });
	});
	//-----

	// התאמות והעדפות אישיות
	$(".item-adaptations #has-changes, .item-adaptations #doesnt-have-changes").on("change", function () {
		if ($(".item-adaptations #has-changes").is(":checked")) {
			$(".item-adaptations #has-changes-checked").css('opacity', 0)
                .slideDown('slow', function () {
                	$elem = $(this);
                	if ($elem.closest('.page#personal').is('*')) {
                		var viewHeight = $(window).height() - $("#top-header").height(),
							itemOffsetTop = $elem.offset().top - $("#top-header").height() - $("body").scrollTop(),
							itemHeight = $elem.height();
                		//alert(itemOffsetTop +" -> "+itemHeight+" -> "+viewHeight);
                		if (itemOffsetTop + itemHeight > viewHeight) {
                			var scrollTo = Math.min(itemOffsetTop + itemHeight - viewHeight + 50, itemOffsetTop);
                			$("html, body").scrollTo(scrollTo + $("body").scrollTop(), {
                				"easing": "easeInOutCubic",
                				"axis": "y",
                				"duration": 0,
                				"onAfter": function () {
                					enable_scroll();
                				}
                			});
                		}
                	}
                })
                .animate(
                { opacity: 1 },
                { queue: false, duration: 'slow' }
            );

			$("#fullOutTime").prop('disabled', false);

			$("#monthlyReturnSum").prop('disabled', true);
			$("#monthlyReturnTime").prop('disabled', true);
		}
		else {
			$(".item-adaptations #has-changes-checked").css('opacity', 1)
                .slideUp('slow')
                .animate(
                { opacity: 0 },
                { queue: false, duration: 'slow' }
            );
		}
	});

	$('#has-changes-checked label[for="changes-quite"], #has-changes-checked label[for="changes-danger"]').on("click", function (e) {
		if ($(e.target).is("select")) e.preventDefault();
	});

	$('#changes-quite').click(function () {
		$("#fullOutTime").prop('disabled', true);

		$("#monthlyReturnSum").prop('disabled', false);
		$("#monthlyReturnTime").prop('disabled', false);
	});

	$('#changes-danger').click(function () {
		$("#fullOutTime").prop('disabled', false);

		$("#monthlyReturnSum").prop('disabled', true);
		$("#monthlyReturnTime").prop('disabled', true);
	});

	//
	//קיום אישור עקרוני
	$(".item-confirmation #bank-other").on("change", function () {
		$(this).siblings("label[for='bank-other']").children("input").prop("disabled", !$(this).is(":checked"));
	});

	$(".removeBankBidTr").hide();



	$(".removeaddBank").hide();
}

//accordionFuncs();


//*********************
// general function to gather data etc
//*********************

function numberWithCommas(x) {
	if (typeof x != 'undefined') {
		var parts = x.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return parts.join(".");
	}
}
function getNamePval(pVal) {
	switch (pVal) {
		case "dealType":
			if (params.dealType == "buy-property")
				return "רכישת נכס";
			else
				if (params.isRecycleCheck == "1")
					return "מיחזור הלוואה עם בדיקת כדאיות מיחזור";
				else
					return "מיחזור הלוואה ללא בדיקת כדאיות מיחזור";
			break;
		case "propertyValue":
			return numberWithCommas(params.propertyValue);
			break;
		case "loanSum":
			if (params.dealType == "buy-property")
				return numberWithCommas(params.loanDesire);
			else
				return numberWithCommas(params.loanLeft);
			break;
		case "wantedReturn":
			return numberWithCommas(params.wantedReturn);
			break;
		case "netoSum":
			return numberWithCommas(params.netoSum);
			break;
		case "isDebts":
			if (params.isDebts == "1")
				return "יש";
			else
				return "אין";
			break;
		case "isRelease":
			if (params.isRelease == "1")
				return "יש";
			else
				return "אין";
			break;
		case "bankAuth":

			BanksNamesList = {};
			BanksNamesList["bank-leumi"] = "בנק לאומי";
			BanksNamesList["bank-soldier"] = "בנק אוצר החייל";
			BanksNamesList["bank-mizrahi"] = "בנק מזרחי - טפחות";
			BanksNamesList["bank-international"] = 'הבנק הבינ"ל הראשון';
			BanksNamesList["bank-apoalim"] = "בנק הפועלים";
			BanksNamesList["bank-yahav"] = "בנק יהב";
			BanksNamesList["bank-discount"] = "בנק דיסקונט";
			var allBanksString = BanksNamesList[params.banksAuth[0]];

			for (var i = 1; i < params.banksAuth.length; i++) {
				allBanksString += ", " + BanksNamesList[params.banksAuth[i]];
			}
			return allBanksString;
			break;
		case "loanPercent":
			if (params.dealType == "buy-property")
				return parseInt(parseInt(params.loanDesire) * 100.0 / parseInt(params.propertyValue));
			else
				return parseInt(parseInt(params.loanLeft) * 100.0 / parseInt(params.propertyValue));
			break;
		case "returnPercent":
			return parseInt(parseInt(params.wantedReturn) * 100.0 / parseInt(params.netoSum));
			break;
		case "planning":
			if (params.planningTime == "short")
				return "זמן קצר";
			else if (params.planningTime == "medium")
				return "זמן בינוני";
			else
				return "זמן ארוך";
			break;
		case "stability":
			if (params.stability == "danger")
				return "החזר תנודתי ונזילות גבוהה";
			else
				return "החזר יציב ונזילות נמוכה";
			break;
		case "changes":
			if (params.changes == "0")
				return "לא צפויים שינויים";
			else
				if (params.changesType == "fullOut")
					return "צפוי סילוק ההלוואה תוך " + params.fullOutTime + " שנים";
				else
					return " צפוי החזר חודשי של " + numberWithCommas(params.monthlyReturnSum) + ' ש"ח בתוך כ-' + params.monthlyReturnTime + " שנים ";
			break;

	}
}

function updateOrderDetails() {
	$("#ODdealType").html(getNamePval("dealType"));
	$("#ODpropertyValue").html(getNamePval("propertyValue"));
	$("#ODloanSum").html(getNamePval("loanSum"));
	$("#ODwantedReturn").html(getNamePval("wantedReturn"));
	$("#ODnetoSum").html(getNamePval("netoSum"));
	$("#ODisDebt").html(getNamePval("isDebts"));
	$("#ODisRelease").html(getNamePval("isRelease"));
	if (getNamePval("loanPercent") >= 70)
		$("#ODloanPercent").html('<span style="color:red;font-weight:bold">' + getNamePval("loanPercent") + '%</span>');
	else if (getNamePval("loanPercent") >= 60)
		$("#ODloanPercent").html('<span style="color:orange;">' + getNamePval("loanPercent") + '%</span>');
	else
		$("#ODloanPercent").html(getNamePval("loanPercent") + "%");

	if (getNamePval("returnPercent") >= 70)
		$("#ODreturnPercent").html('<span style="color:red;font-weight:bold">' + getNamePval("returnPercent") + '%</span>');
	else if (getNamePval("returnPercent") >= 60)
		$("#ODreturnPercent").html('<span style="color:orange;">' + getNamePval("returnPercent") + '%</span>');
	else
		$("#ODreturnPercent").html(getNamePval("returnPercent") + "%");

	$("#ODbanksAuth").html(getNamePval("bankAuth"));
	$("#ODplanning").html(getNamePval("planning"));
	$("#ODstability").html(getNamePval("stability"));
	$("#ODchanges").html(getNamePval("changes"));



}



// helpers

$(document).on('focus', '#newpasswordform input[name=currentPass]', function () {

	$(this).removeClass('validate-error');
});
$(document).on('focus', '#newpasswordform input[name=newPass]', function () {
	$("#passlength").text("");
	$(this).removeClass('validate-error');
});
$(document).on('focus', '#newpasswordform input[name=validPass]', function () {

	$(this).removeClass('validate-error');
});
$(document).on('change', '.loan-track', function () {
    var id = $(this).val();
    var i = 0;
    flag = true;

    while (flag && i < tracks.length) {
         if (tracks[i].ID == id) {
            flag = false;
        }
        else {
            i++;
        }
    }

    var elem = $(this).closest('tr').find('select.track-period');
    var mask = $(this).closest('tr').find('span.track-period');

    UpdatePeriod(tracks[i], elem, mask);
    var inflated = tracks[i].Inflated ? 1 : 0;
    $(this).closest('tr').attr('inflation', inflated);
});

function UpdatePeriod(track, element, mask) {
    element.html('');
    var html = "";
    for (var i = track.MinTimeMonths; i <= track.MaxTimeMonths; i += track.JumpsInMonths) {
        if (i % 12 == 0) {
            html += '<option value="' + i + '">' + i + ' (' + (i/12) + ')</option>';
        }
        else {
            html += '<option value="' + i + '">' + i + '</option>';
        }
    }
    element.html(html);
    element.removeClass('hasCustomSelect');
    element.attr('style', '');
    mask.remove();
    element.customSelect();
}

function ClearSelectedTabs() {
	$("#side-nav").children('ul').children('li').each(function () {
		$(this).removeClass('current-tab');
	});
}

function IsEmail(email) {

	var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
	if (testEmail.test(email))
		return true;
	else
		return false;
}

function ShowMessages(text) {

	$("#messages").html(text);

	$("#messages").css('visibility', 'visible').delay(2000).fadeOut();

}

function CostumSelectPlaster() {
	$(".table-after-checkbox .customSelect").remove();
	$(".table-after-checkbox select").removeAttr("style").customSelect();

	$(".customSelect").remove();
	$("select").removeAttr("style").customSelect();
}

// ********************
// manage tables add remove rows


// generic, returns count of rows
function CountRows(table) {
	if (1 == 2) { // הצעות מחיר בנקים למשכנתאות

	}
	else {
		res = $(table).find('tr').length - 1;
		return res; // to ignore the title
	}
}

//השלמת פרטי לווים
function AddTr(elem, type) {
    var $table = elem.prev("table");
    var MaxNumberOfPlans = 8;
    var MaxNumberOfAll = 5;

    //alert("In add AddTr type: " + type + ", $table: " + $table + ", bank-name-recycle: " + $('#bank-name-recycle').val() +
    //    ", bank-name-offers: " + $("bank-name-offers").val() + ", bank-name-offers2: " + $("bank-name-offers2").val());

    if ((type == "bank" && CountRows($table) < MaxNumberOfPlans) || (CountRows($table) < MaxNumberOfAll)) {

        if (type == "bank") {
            if (!PersonalValidate.AddRowCheck($table)) {
                alert(PersonalValidate.errorLog);
                return;
            }
            if (CountRows($table) >= MaxNumberOfPlans) {
                alert("אפשר להוסיף עד " + MaxNumberOfPlans + "מסלולים ");
                // alert("אפשר להוסיף עד 3 מסלולים");
                return;
            }
        }

		if (type == "release") {
			if (!PersonalValidate.ReleaseRowCheck()) {

				alert("  יש להזין נתונים תקינים לפני הוספת שיחרורים" + "\n" + PersonalValidate.errorLog);
				return;
			}			
		}
		if (type == "must") {
			if (!PersonalValidate.HasMustsCheck()) {
				alert("  יש להזין נתונים תקינים לפני הוספת התחייבות" + "\n" + PersonalValidate.errorLog);
				return;
			}
		}
		if (type == "savings") {
		    if (!PersonalValidate.AddRowCheck($('#tbl_Savings'))) {
		        alert("  יש להזין נתונים תקינים לפני הוספת חסבונות" + "\n" + PersonalValidate.errorLog);
		        return;
		    }
		}
		
		var toAdd = $table.find("tr:last-of-type").clone();
		if (type == "bank")
		{
		    toAdd.find('select.bidTime').html('');
		}
		toAdd.appendTo($table).find('input').val('');

		$('input.number-input').number(true, 0);
		$(".table-after-checkbox .customSelect").remove();
		$(".table-after-checkbox select").removeAttr("style").customSelect();

		switch (type) {
			case "release":		
				$(".removeReleaseTr").show();				
				break;
			case "savings":
				$(".removeSavingsTr").show();
				break;
			case "must":
				$(".removeMustTr").show();
				break;
			case "bank":
			    $($table).find(".removeBankBidTr").show();
			    
				break;
		}
	}
	else {
        var m = "";
        var MaxNumber = MaxNumberOfAll;
		switch (type) {
		    case "bank":
		        MaxNumber = MaxNumberOfPlans;
		        m = "מסלולים";
		        break;
			case "release":
				m = "שחרורים";
				break;
			case "savings":
				m = "חסכונות";
				break;
			case "must":
				m = "התחייבויות";
				break;

        }
		alert("אפשר להוסיף עד " + MaxNumber + " " + m);
		// alert("אפשר להוסיף עד 5 " + m)
	};
}

//הצעת מחיר בנקים למשכנתאות
function AddBank(elem) {
    var tablesnum = $(elem).parent().parent().find("table").length - 1; // future dev -yeah you! the -1 is to ignore the template section. look in NewOrder.cshtml

    //alert("In add AddBank tablesnum: " + tablesnum + ", bank-name-recycle: " + $('#bank-name-recycle').val() +
    //", bank-name-offers: " + $("bank-name-offers").val() + ", bank-name-offers2: " + $("bank-name-offers2").val());

     if (!PersonalValidate.CheckAddBank()) {
        alert(PersonalValidate.errorLog);
        return;
    }
    var MaxNumberOfBanks = 4;

    if (tablesnum < MaxNumberOfBanks) {
		var $template = $("#offersTemplate .table-after-checkbox").clone();
		var $table = $(elem).parent().find(".table-after-checkbox").last();

		$template.addClass("active-offer");
		$($table).after($template);
		//$table.find(".table-after-checkbox").last().clone().appendTo($table).find('input').val('');
		$table.find(".table-after-checkbox").last().find(".addBank span,.addBank div").remove();

		$('input.number-input').number(true, 0);
		$(".customSelect").remove();
		$("select").removeAttr("style").customSelect();

		//$($table).find(".removeaddBank").show();
		var currentnumoftables = $(elem).parent().parent().find("table").length - 1;
		if (currentnumoftables >= 2) {
			$(elem).parent().parent().find(".removeaddBank").show();
		}
	}
    else // alert("אפשר להוסיף עד 3 בנקים");
        alert("אפשר להוסיף עד " + MaxNumberOfBanks + " הצעות מחיר");
}

function RemoveBank(elem) {
	var tablesnum = $(elem).parent().parent().find("table").length - 1;
	var $table = $(elem).parent().find(".table-after-checkbox").last();

	if (tablesnum != 1) {

		var container = $(elem).parent().parent();

		$(elem).parent().remove();

		tablesnum--;
		if (tablesnum == 1) {
			$(container).find(".removeaddBank").hide();
			//$($table).find(".removeaddBank").hide();
		}
	}
}


/*
 * Calculate the PMT
 */

// recalculate the PMT value
function ShouldCalculatePMT(loanSumElment, percentageElment, trackPeriodElment, LoanReturnPMTElment) {
    if (!$.isEmptyObject(loanSumElment) && !$.isEmptyObject(percentageElment) && !$.isEmptyObject(trackPeriodElment) && !$.isEmptyObject(LoanReturnPMTElment)) {
        if (0 < loanSumElment.val().length && 0 < percentageElment.val().length && 0 < trackPeriodElment.val().length) {
            UpdateLoanReturnPMT(loanSumElment, percentageElment, trackPeriodElment, LoanReturnPMTElment);
        }
        else {
            // alert("OnKeyup UpdateLoanReturnPMT1: illegal parameters");
        }
    }
    else {
        // alert("OnKeyup UpdateLoanReturnPMT2: illegal parameters");
    }
}

var timerid;


// check if should calcaculate PMT now
$(document).on("input", ".loanSum, .percentage, .track-period, .bidSum", function () {
    var value = $(this).val();
    if ($(this).data("lastval") != value) {
        $(this).data("lastval", value);

        clearTimeout(timerid);
        timerid = setTimeout(function () {
            //change action
            // alert(value);
        }, 500);

        // each option have differnt names for the amount.... stay cool
        var bidSumE = $(this).closest('tr').find('.bidSum');
        var loanSumE = $(this).closest('tr').find('.loanSum');
        var loanSumElment;
        if (bidSumE.length)
            loanSumElment = bidSumE;
        else {
            if (loanSumE.length)
                loanSumElment = loanSumE;
            //else 
            //    alert("On document change: cant find the amount object.")
        }
        var percentageElment = $(this).closest('tr').find('.percentage');
        var trackPeriodElment = $(this).closest('tr').find('.track-period');
        var LoanReturnPMTElment = $(this).closest('tr').find('.returnSum');

        ShouldCalculatePMT(loanSumElment, percentageElment, trackPeriodElment, LoanReturnPMTElment);
    };
});



function UpdateLoanReturnPMT(amount, interestRate, time, LoanReturnPMTElment) {
    if (!$.isEmptyObject(amount) && !$.isEmptyObject(interestRate) && !$.isEmptyObject(time) && !$.isEmptyObject(LoanReturnPMTElment)) {
        var returnPMT = CalculatePMT(amount.val(), interestRate.val(), time.val());
        LoanReturnPMTElment.val(returnPMT.toString());
        // update the summery as well
        UpdateMonthlyReturn();
    }
    else {
        // alert("UpdateLoanReturnPMT: illegal parameters");
    }
}

function GetLegalInterestRate(interestRate) {
    var MaxInterestRate = 0.2;
    var MinInterestRate = -0.05;
    // cleanup redundant chars
    interestRate = parseFloat(interestRate.replace(/[^\d\.]*/g, ''));

    if (0 < interestRate) {
        if (MaxInterestRate < interestRate)
            interestRate = interestRate / 100;
    }
    if (0 > interestRate) {
        if (MinInterestRate > interestRate)
            interestRate = interestRate / 100;
    }
 
    // check again
    if (MaxInterestRate > interestRate && MinInterestRate < interestRate) {
        // all is good now...
    }
    else {
        alert("GetLegalInterestRate: illegal interestRate: " + interestRate);
        interestRate = 0;
    }
    return interestRate;
}

function CalculatePMT(amount, interestRate, time) {
    if (0 < amount.length && 0 < interestRate.length && 0 < time.length) {
        if (0 >= time) {
            return 0;
        }
        // ensure the interest is between legal values
        interestRate = GetLegalInterestRate(interestRate);

        amount = parseInt(amount);
        time = parseInt(time);

        var monthlyPmt = 0;
        var originalInflation = 0;
        var i = ((originalInflation / 12 * 100000000) - ((originalInflation / 12 * 100000000) % 1)) / 100000000; // Instead of Math.Round

        if (interestRate == 0) {
            monthlyPmt = ((amount * (1 + i)) / time);
            monthlyPmt = ((monthlyPmt * 100000) - ((monthlyPmt * 100000) % 1)) / 100000; // Instead of Math.Round
        }
            // the rate now can be negative as well
        else /*if (originalRate > 0)*/ {
            var r = ((interestRate / 12 * 100000000) - ((interestRate / 12 * 100000000) % 1)) / 100000000; // Instead of Math.Round
            var calcPow = Math.pow((1 + r), time);
            // be carfull here...
            var upperSide = (amount * (1 + i)) * (r * calcPow);
            if (0 == upperSide) {
                monthlyPmt = ((amount * (1 + i)) / time);
                monthlyPmt = ((monthlyPmt * 100000) - ((monthlyPmt * 100000) % 1)) / 100000; // Instead of Math.Round
            }
            else {
                monthlyPmt = (upperSide / (calcPow - 1));
                monthlyPmt = ((monthlyPmt * 100000) - ((monthlyPmt * 100000) % 1)) / 100000; // Instead of Math.Round
            }
        }
    }
    else {
        alert("CalculatePMT: illegal parameters");
    }

    return monthlyPmt;
}

function CalculatePMT2(amount, interestRate, time) {
    // var monthlyRate = 0;
    var calcPow = -1;
    var monthlyPmt = 0;

    if (0 < amount.length && 0 < interestRate.length && 0 < time.length) {
        if (parseInt(interestRate) > 0) {
            // monthlyRate = Math.Round((interestRate / 12), 8);
            calcPow = Math.pow((1 + parseInt(interestRate)), parseInt(time));
            monthlyPmt = parseInt(amount) * (parseInt(interestRate) * calcPow) / (calcPow - 1);
        }
        else {
            monthlyPmt = parseInt(amount) / parseInt(time);
        }

        monthlyPmt = Math.round(monthlyPmt * 100) / 100;
        alert("CalculatePMT got amount: " + amount + ", interestRate: " + interestRate + ", time: " + time + " and monthlyPmt: " + monthlyPmt);
    }
    else {
        alert("CalculatePMT: illegal parameters");
    }

    return monthlyPmt;
}


// calculate the loan details feasibility
function CalculateLoan()
{
    var propertyValue = 0;
    var loanSum = 0;
    var monthlyReturn = 0;
    var numOfBorrowers = Orderobj.data.Loaners.NumBorrowers;
    propertyValue = Orderobj.data.LoanDetails.PropertyValue; // $('#property-value-buy').val();
    loanSum = Orderobj.data.LoanDetails.LoanLeft; // $('#loan-desire').val();
    // monthlyReturn = $('#wanted-return-buy').val();
    monthlyReturn = $('#monthlyReturnSum').val();
          
    var data = {
        property: propertyValue, sum: loanSum, monthlyReturn: monthlyReturn, income: Orderobj.data.Loaners.NetoSum,
        age: Orderobj.data.Loaners.YoungBorrower, numOfBorrowers: numOfBorrowers
    };
        
    $.ajax({
        type: 'POST',
        data: data,
        url: '/order/CheckCompatibility',
        success: function (data) {
            //alert("In CalculateLoan data: " + data.result);
            if (data.result) {
                var elem = $('.modal-dialog').find('.bootbox-body');
                elem.html("User added");
            }
            else {
                var elem = $('.modal-dialog').find('#user-error-msg').text(data.message);
            }
        }
    });

}

// write those functions again since the analitics.js does not load !!!!
/*function trackEvent(name, properties) {
    // mixpanel.track(name, properties);
}

function trackEvent(name) {
    // mixpanel.track(name, properties);
}*/

