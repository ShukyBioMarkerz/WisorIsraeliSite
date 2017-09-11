var footerH = 0;

$(function () {

	$(".fromtpage").css("height", $(document).height() - ($("#top-header").height() + $("#footer").height()) );

	// should be defiend on load
	footerH = parseInt($("#footer").css('height').split('p')[0]);

	$('.question.item .item-title').click(function () {
	    
	    $(this).closest('.question.item').find('.item-content').slideToggle();
	    if ($(this).closest('.question.item').hasClass('open')) {
	        $(this).closest('.question.item').removeClass('open');
	    }
	    else
	    {
	       $(this).closest('.question.item').addClass('open');
	    }
	});

	
});

function openPopup(name, closeOthers, callback, params) {


	var actionName;
	var methodType = "GET";

	switch (name) {
		case "sign-in-up":
			actionName = "GetSignIn";
			break;
		case "contact":
			actionName = "Contact";
			break;		
		case "payment":
		    actionName = "Payment";
		    trackEvent("profitPage_payButton_click");

			break;
		case "calculate":
			actionName = "Calculate";
			// submit the data
			//Orderobj.submit();
			break;
	}	

    if (isPopupOpened && closeOthers) {
        $("#popups").children().fadeOut(750).promise().done(function() {
            openPopup(name, false);
        });
        return;
    }
    disable_scroll();
    var url = "/Home/" + actionName;
    if (params) {
        url += "?" + params;
    }

    var element = $.ajax({
        url: url,
        type: methodType,
        success: function (data) {
            if (data) {
                $("#popups").html(data);
                $("#popups").fadeIn(750, function () {

                    


                });
                if (actionName == "Calculate") {
                    callback();
                }
                if (actionName == "Contact") {
                    $('#subject').customSelect();
                }
                ManagePopUp(name);

            }
            else {
                $('#message').text("Error connecting to server");
            }
        }
    });
    
    $("#navigator").css("z-index", 3);
    isPopupOpened = name;
}

// added by Ehud 
function ManagePopUp(name) {
	var element = $("#" + name);

	width = element.width();
	height = element.height();
	if (name == "contact") {
		var height = Math.min($(window).height() - $("#top-header").outerHeight() - 20, element.height());
	}

	if (name == "payment") {
	    var height = 550;
	}
	element.css({
		"position": "fixed",
		"width": "0px",
		"height": "0px",
		"left": "50%",
		"top": "50%",
		"margin-left": "0px",
		"margin-top": "0px",
		"display": "block"
	});
	element.animate({
		"width": width,
		"margin-left": -width / 2
	}, {
		"complete": function () {
			if (name == "contact") {
				$(this).animate({
					"height": height,
					"margin-top": -height / 2 + $("#top-header").height() * 0.45
				});
			}
			else {
				$(this).animate({
					"height": height,
					"margin-top": -height / 2 + $("#top-header").height() / 2
				});
			}
		}
	});

	if (name == "calculate") {
		$("h2 b").html($("#ODlabel").html());
		CalculateAction($("#ODlabel").html());
	}
}
function closePopup() {
    $("#popups").fadeOut(750, function() {
        enable_scroll();
        $("#popups").children().removeAttr('style').hide();
        $("#navigator").css("z-index", 109);
        currentPage.addClass("current-page").siblings().removeClass("current-page");
       // $("#header > #top-header #menu > ul").data('active', currentPage).lavalamp("update");

        $("#popups").html('');
    });
    clearTimeout(closePopupTimeout);
    isPopupOpened = false;
}
// TODO
function CalculateAction(label) {
	$.ajax({
		url: "/personal/GetCalculate",
		type: "POST",
		data: {Label: label},
		success: function (data) {
			if (data) {
				
			}
			else {
				
			}
		}
	});
}

function HideShowFooter() {

	if (window.location.href.split("/")[3] == "Personal") {
		if (!$("#footer").hasClass("footer-close")) {
			$("#footer").animate({ height: 10 }, 200);
			//$("#footer").slideDown();
			$("#footer").addClass("footer-close");
			$(".page").css('min-height', parseInt($(".page").css('min-height').split('p')[0]) + parseInt($("#footer").css('height').split('p')[0]));
					}
		else {
			$("#footer").animate({ height: 179 }, 200);
			//$("#footer").slideUp();
			$("#footer").removeClass("footer-close");
			$(".page").css('min-height', parseInt($(".page").css('min-height').split('p')[0]) - parseInt($("#footer").css('height').split('p')[0]));						
		}
	}
	else {		

		if (!$("#footer").hasClass("footer-close")) {
			$("#footer").animate({ height: 10 }, 200);
			//$("#footer").slideDown();
			$("#footer").addClass("footer-close");
			
			$(".fromtpage").css('height', parseInt($(".fromtpage").css('height').split('p')[0]) + footerH);

		}
		else {
			$("#footer").animate({ height: 179 }, 200);
			//$("#footer").slideUp();
			$("#footer").removeClass("footer-close");		
			
			$(".fromtpage").css('height', parseInt($(".fromtpage").css('height').split('p')[0]) - footerH);
		}
	}

	
}


function accordionOpenItem(item) {
    /*if(params.stepId == 7 )
    {
   	 alert();
   	 updateOrderDetails();
	}*/
    
    
    item.siblings().removeClass('open').children('.item-title').css({
        'borderBottomWidth' : "2px"
    }).siblings('.item-content').slideUp(750, function() {
        $(this).css("display", "none").siblings('.item-title').removeAttr('style');
    });
    if (item.hasClass('open')) {
        item.removeClass('open').children('.item-title').css({
            'borderBottomWidth' : "2px"
        }).siblings('.item-content').slideUp(750, function() {
            $(this).css("display", "none").siblings('.item-title').removeAttr('style');
        });
    }
    else {
        item.addClass('open').children('.item-content').slideDown(750, function() {
            $(this).css("display", "block");
            if (item.closest('.page#personal').is('*')) {
                var viewHeight    = $(window).height() - $("#top-header").height(),
                    itemOffsetTop = item.offset().top  - $("#top-header").height() - $("body").scrollTop(),
                    itemHeight    = item.height();
                if (itemOffsetTop + itemHeight > viewHeight) {
                if(item.hasClass("item-summary"))
                	var scrollTo = itemOffsetTop;
                else
                    var scrollTo = Math.min(itemOffsetTop + itemHeight - viewHeight + 50, itemOffsetTop);
                    $("html, body").scrollTo(scrollTo + $("body").scrollTop(), {
                        "easing" : "easeInOutCubic",
                        "axis" : "y",
                        "duration" : 200,
                        "onAfter" : function() {
                            enable_scroll();
                        }
                    });
                }
            }
        });
        
    }
}
var params = { stepId:0 }
var closePopupTimeout, isPopupOpened, currentPage;
$(document).ready(function() {




$('.changes-options-label').click(function() {//disableOtherFieldsChanges();
});
	/*
$('#changes-quite').click(function() { 
	$("#fullOutTime").prop('disabled', true);
		
	$("#monthlyReturnSum").prop('disabled', false);
	$("#monthlyReturnTime").prop('disabled', false);
});*/
	/*
$('#changes-danger').click(function() { 
$("#fullOutTime").prop('disabled', false);
		
	$("#monthlyReturnSum").prop('disabled', true);
	$("#monthlyReturnTime").prop('disabled', true);
});*/
    currentPage = $("#menu .current-page");
    $("#popups").children().hide();
    $('select').customSelect();
    $('input.number-input').number(true, 0);
    $("body").on("keydown", function(e) {
        if (e.keyCode == 27) {
            closePopup();
        }
    });
    $('input:radio').each(function() {
        if ($(this).attr("checked") == "checked" && !$(this).prop("checked")) {
            $(this).prop("checked", true);
        }
    });
    //var inFade = false;
    //$(".page#personal #side-nav > ul > li > a").on("click", function(e) {
    //    e.preventDefault();
    //    e.stopImmediatePropagation();
	//	var $myID=$(this).parent().attr("id").substr(9);
    //    if ($(this).parent().attr("id").substr(9) == "logout") {
    //        return false;
    //    }
    //    var eClass = $("#inner-content").attr("class"),
    //        $this = $(this);
    //    if (!inFade && $this.parent().attr("id").substr(9) != eClass.substr(0, eClass.length - 7)) {
    //        inFade = $("#"+$this.parent().attr("id").substr(9)).is("*");
    //        $this.parent().siblings().children("a").animate(
    //            {
    //                "backgroundColor" : "#f6f5f5"
    //            }, 750, function() {
    //                $(this).parent().removeClass('current-tab');
    //            }
    //        );
    //        $("#"+eClass.substr(0, eClass.length - 7)).fadeOut(750, function() {
	//			if($myID == "profit" || $myID == "accordion"){
	//				$("#steps").fadeTo("slow", 1);
	//			}else{
	//				$("#steps").fadeTo("slow", 0.001);
	//			}
    //            $this.animate(
    //                {
    //                    "backgroundColor" : "#ffffff"
    //                }, 750, function() {
    //                    $(this).parent().addClass('current-tab');
    //                }
    //            );
    //            $("#"+$this.parent().attr("id").substr(9)).fadeIn(750, function() {
    //                $("#inner-content").removeClass().addClass($this.parent().attr("id").substr(9)+'-active');
    //                inFade = false;
    //            });
    //        });
    //    }
    //});
   /* $("#facebook > img").on("mouseover", function() {
        $(this).effect("shake", {
            "direction" : "right",
            "distance" : 5,
            "times" : 2
        }, 750);
    })*/
    //var params = { stepId:0 }
    //$(".accordion > .item .next-item").on("click", function() {
    //  var currentWindowCheck = $(this).closest(".item").attr('id');
    //  var flag=true;
    //  var errorLog ="";
		

    //   switch(currentWindowCheck)
	//	{
    //   	//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    //   	case "item-deal-type":
    //   		params.dealType = $('input[name="deal-type"]:checked').val();
    //   		if(params.dealType == "recycle")
    //   		{
    //   			params.isRecycleCheck = $('input[name="include-recycle-check"]:checked').val();
    //   			if(params.isRecycleCheck == "1")
    //   				$('#item-recycle-check').removeClass("item-no-show");
       			
    //   			//$('#item-loan-details .item-content').html(recycleHtml);
    //   			$("#contain-buy-loan-details").css("display", "none");
    //   			$("#contain-recycle-loan-details").css("display", "block");
       			
    //   		}
    //   		else {     		
       		
    //   			//$('#item-loan-details .item-content').html(buyHtml);
    //   			$("#contain-recycle-loan-details").css("display", "none");
    //   			$("#contain-buy-loan-details").css("display", "block");
    //   		}
    //   		if(params.stepId < 1)
    //   			params.stepId = 1;
       		
    //   		$('#item-borrowers-details').removeClass("item-unabled");
    //   	break;
    //   	//BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
    //   	case "item-borrowers-details":
    //   		if(!$('#num-of-borrowers').val()) {	errorLog += "חייב לציין מספר לווים!\n";flag=false;	}
       		
    //   		if(!$('#youngest-borrower').val()) { errorLog += "לא צוין גיל הלווה הצעיר!\n";flag=false; }
       		
    //   		if(!$('#neto-sum').val()) { errorLog += "לא צוין סכום הכנסות נטו!\n";flag=false; }
    //   		else if($('#neto-sum').val()<2000) { errorLog += ' סכום הכנסות נטו לא יהיה קטן מ-2,000 ש"ח!\n';flag=false; }
       		
       		
    //   		params.isDebts = $('input[name="has-musts"]:checked').val();
    //			if(params.isDebts == "1") {
    				
    //				var allDebts = $("#tbl_must").find("tr.mustTr");
    //				var debtObject = { },debtsList = [ ];
    //				for(var i=0;i<allDebts.length;i++)
    //				{
    //					//alert($("#tbl_must").find(allDebts[i]).find(".numberDebt").val());
    					
    //					if($("#tbl_must").find(allDebts[i]).find(".numberDebt").val() < 200) { errorLog += ' סכום חוב לא יהיה קטן מ-200 ש"ח!\n';flag=false; }
    //					else {
    //						debtObject.sum = $("#tbl_must").find(allDebts[i]).find(".numberDebt").val();
    //						debtObject.month = $("#tbl_must").find(allDebts[i]).find(".selectMonth").val();
    //						debtObject.year = $("#tbl_must").find(allDebts[i]).find(".selectYear").val();
    //						debtsList.push(debtObject);
    //					}
    					
    //				}
    //			}
       		
    //   		params.isRelease = $('input[name="has-money"]:checked').val();
    //			if(params.isRelease == "1") {
    				
    //				var allRelease = $("#tbl_release").find("tr.releaseTr");
    //				var releaseObject = { },releaseList = [ ];
    //				for(var i=0;i<allRelease.length;i++)
    //				{
    //					/*alert($("#tbl_release").find(allRelease[i]).find(".numberRelease").val());*/
    					
    //					if($("#tbl_release").find(allRelease[i]).find(".numberRelease").val() < 20000) { errorLog += ' סכום שחרור לא יהיה קטן מ-20000 ש"ח!\n';flag=false; }
    //					else {
    //						releaseObject.sum = $("#tbl_release").find(allRelease[i]).find(".numberRelease").val();
    //						releaseObject.month = $("#tbl_release").find(allRelease[i]).find(".selectMonth").val();
    //						releaseObject.year = $("#tbl_release").find(allRelease[i]).find(".selectYear").val();
    //						releaseList.push(releaseObject);
    //					}
    					
    //				}
    //			}
    			
    			
    			
    			
    			
    //   		if(flag)
    //   		{
    //   			params.numBorrowers = $('#num-of-borrowers').val();
    //   			params.youngBorrower = $('#youngest-borrower').val();
    //   			params.netoSum = $('#neto-sum').val();
    //   			params.debts = debtsList;
    //   			params.releases = releaseList;
    //   			if(params.stepId < 2)
    //   				params.stepId = 2;
    //   			$('#item-loan-details').removeClass("item-unabled");
    //   		}
       		
       		
       		
       		
    //   	break;
    //   	//CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
    //   	case "item-loan-details":
       		
    //   		if(params.dealType == "recycle") {
    //   			if(!$('#property-value-recycle').val()) {	errorLog += "חובה לציין את ערך הנכס!\n";flag=false;	}
    //   			else if($('#property-value-recycle').val()<160000) { errorLog += ' ערך הנכס לא יהיה קטן מ-160,000 ש"ח!\n';flag=false; }
       			
    //   			if(!$('#loan-left').val()) {	errorLog += "חובה לציין את סכום ההלוואה הנותרת!\n";flag=false;	}
    //   			else if($('#loan-left').val()<120000) { errorLog += ' סכום ההלוואה הנותרת לא יהיה קטן מ-120,000 ש"ח!\n';flag=false; }
    //   			else if($('#loan-left').val()>2500000) { errorLog += ' סכום ההלוואה הנותרת לא יהיה גדול מ-2,500,000 ש"ח!\n';flag=false; }
    //   			else if($('#loan-left').val()>$('#property-value').val()*0.75) { errorLog += ' סכום ההלוואה הנותרת לא יהיה יותר מ75% מערך הנכס!\n';flag=false; }
       			
    //   			if(!$('#wanted-return-recycle').val()) {	errorLog += "חובה לציין את סכום ההחזר הרצוי!\n";flag=false;	}
    //   			else if($('#wanted-return-recycle').val()<111) { errorLog += ' סכום ההחזר הרצוי לא יהיה קטן מ-111 ש"ח!\n';flag=false; }
    //   			else if($('#wanted-return-recycle').val()>52000) { errorLog += ' סכום ההחזר הרצוי לא יהיה גדול מ-52,000 ש"ח!\n';flag=false; }
       			
    //   			if(flag)
    //   			{
       				
    //   				params.propertyValue = $('#property-value-recycle').val();
	//	    			params.loanLeft = $('#loan-left').val();
	//	    			params.wantedReturn = $('#wanted-return-recycle').val();
       				
    //   				if(params.isRecycleCheck == "0")
    //   					$('#item-confirmation').removeClass("item-unabled");
    //   				else
    //   					$('#item-recycle-check').removeClass("item-unabled");
    //   				$("#cubes, #cubes + p").animate({
	//			          "opacity" : 1
	//			      }, 750);
	//			      $this = $(this);
	//			      setTimeout(function() {
	//			          //accordionOpenItem($this.closest('.item').next());
	//			          if($this.closest('.item').nextAll(".item").not(".item-no-show").first().hasClass('item-unabled') == false)
    //    						accordionOpenItem($this.closest('.item').nextAll(".item").not(".item-no-show").first());
	//			          $("#cubes, #cubes + p").animate({
	//			              "opacity" : 0
	//			          }, 0);
	//			      }, 3500);
				      
	//			      return;
    //   			}
       			
       			
    //   		}
    //   		else {
    //   			if(!$('#property-value-buy').val()) {	errorLog += "חובה לציין את ערך הנכס!\n";flag=false;	}
    //   			else if($('#property-value-buy').val()<160000) { errorLog += ' ערך הנכס לא יהיה קטן מ-160,000 ש"ח!\n';flag=false; }
       			
    //   			if(!$('#loan-desire').val()) {	errorLog += "חובה לציין את סכום ההלוואה הרצויה!\n";flag=false;	}
    //   			else if($('#loan-desire').val()<120000) { errorLog += ' סכום ההלוואה הרצויה לא יהיה קטן מ-120,000 ש"ח!\n';flag=false; }
    //   			else if($('#loan-desire').val()>2500000) { errorLog += ' סכום ההלוואה הרצויה לא יהיה גדול מ-2,500,000 ש"ח!\n';flag=false; }
    //   			else if($('#loan-desire').val()>$('#property-value').val()*0.75) { errorLog += ' סכום ההלוואה הרצויה לא יהיה יותר מ75% מערך הנכס!\n';flag=false; }
       			
    //   			if(!$('#wanted-return-buy').val()) {	errorLog += "חובה לציין את סכום ההחזר הרצוי!\n";flag=false;	}
    //   			else if($('#wanted-return-buy').val()<111) { errorLog += ' סכום ההחזר הרצוי לא יהיה קטן מ-111 ש"ח!\n';flag=false; }
    //   			else if($('#wanted-return-buy').val()>52000) { errorLog += ' סכום ההחזר הרצוי לא יהיה גדול מ-52,000 ש"ח!\n';flag=false; }
       			
    //   			if(flag)
    //   			{
    //   				params.propertyValue = $('#property-value-buy').val();
	//	    			params.loanDesire = $('#loan-desire').val();
	//	    			params.selfWealth = params.propertyValue - params.loanDesire;
	//	    			params.wantedReturn = $('#wanted-return-buy').val();
	//	    			if(params.stepId < 3)
    //   					params.stepId = 3;
       				
    //   				$('#item-confirmation').removeClass("item-unabled");
    //   				$("#cubes, #cubes + p").animate({
	//			          "opacity" : 1
	//			      }, 750);
	//			      $this = $(this);
	//			      setTimeout(function() {
	//			          //accordionOpenItem($this.closest('.item').next());
	//			          if($this.closest('.item').nextAll(".item").not(".item-no-show").first().hasClass('item-unabled') == false)
    //    						accordionOpenItem($this.closest('.item').nextAll(".item").not(".item-no-show").first());
	//			          $("#cubes, #cubes + p").animate({
	//			              "opacity" : 0
	//			          }, 0);
	//			      }, 3500);
				      
	//			      return;
    //   			}
       			
    //   		}

    //   	break;
    //   	//DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
    //   	case "item-recycle-check":
       		

    				
 	//			var allLoans = $("#allLoansTable").find("tr.loanRoutes");
 	//			var loanObject = { },loansList = [ ];
 	//			for(var i=0;i<allLoans.length;i++)
 	//			{
 	//				//alert($("#tbl_must").find(allDebts[i]).find(".numberDebt").val());
 					
 	//				if($("#allLoansTable").find(allLoans[i]).find(".loanSum").val() < 40000) { errorLog += ' סכום  לא יהיה קטן מ-40000 ש"ח!\n';flag=false; }
 	//				if(isNaN($("#allLoansTable").find(allLoans[i]).find(".interest").val())) { errorLog += 'ריבית חייבת להיותר מספר!\n';flag=false; }
 	//				else if($("#allLoansTable").find(allLoans[i]).find(".interest").val() < 0) { errorLog += 'ריבית חייבת להיות חיובית !\n';flag=false; }
 					
 	//				if($("#originalLoanSum").val() > 2500000) { errorLog += 'סך ההלוואה לא יכול להיות גבוה מ2,500,000 !\n';flag=false; }
 					
 					
 	//				else {
 	//					loanObject.sum = $("#allLoansTable").find(allLoans[i]).find(".loanSum").val();
 	//					loanObject.type = $("#allLoansTable").find(allLoans[i]).find(".routeType").val();
 	//					loanObject.interest = $("#allLoansTable").find(allLoans[i]).find(".interest").val();
 	//					loanObject.indexation = $("#allLoansTable").find(allLoans[i]).find(".indexation").val();
 	//					loanObject.time = $("#allLoansTable").find(allLoans[i]).find(".recycleTime").val();
 	//					loanObject.returnSum = $("#allLoansTable").find(allLoans[i]).find(".returnSum").val();
 						
 	//					loansList.push(loanObject);
 	//				}
 					
 	//			}
    			
       		
    //   		if(flag)
    //   		{
    //   			params.recycleLoanMonth = $('#loanTime .selectMonth').val();
    //   			params.recycleLoanYear = $('#loanTime .selectYear').val();
    //   			params.recycleLoanBankNumber = $('#bank-name-recycle').val();
    //   			params.loans = loansList;
    //   			$('#item-confirmation').removeClass("item-unabled");
    //   			if(params.stepId < 4)
    //   				params.stepId = 4;
    //   		}
       		
       	
    //   	break;
    //   	case "item-confirmation":
    //   	//EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    //   		if(!$("#agree-confirmation").is(':checked'))
    //   			{ errorLog += 'חובה לקבל אישור עקרוני לפחות מבנק אחד !\n';flag=false; }
       			
    //   		var allBanks = $(".checkboxesBanks").find("input[type=checkbox]");
       		
 	//			var banksList = [ ];
 	//			for(var i=0;i<allBanks.length;i++)
 	//			{
 	//				if($(".checkboxesBanks").find(allBanks[i]).is(':checked'))
 	//					banksList.push($(".checkboxesBanks").find(allBanks[i]).val());
 						
 	//			}
 	//			if(banksList.length == 0) { errorLog += 'חובה לקבל אישור עקרוני לפחות מבנק אחד !\n';flag=false; }
 	//			if(banksList.length > 4) { errorLog += 'אפשר לקבל אישור עקרוני עד מ4 בנקים !\n';flag=false; }
 				
 	//			if(flag) {
 	//				params.banksAuth = banksList;
 	//				$('#item-offers').removeClass("item-unabled");
 	//				if(params.stepId < 5)
 	//					params.stepId = 5;
 				
 	//			}


    //   	break;
    //   	case "item-offers":
    //   	//FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFf
    //   		params.hasOffers = $('input[name="has-offers"]:checked').val();
    //   		//alert($('input[name="deal-type"]:checked').val());
    //   		if(params.hasOffers == "1")
    //   		{
       				
	// 				var allBidsBanks = $("#banksContainer").find(".table-after-checkbox");
	// 				var bidObject = { },bidsList = [ ],bankName,allBids;
	 				
	 				
	// 				for(var i=0;i<allBidsBanks.length;i++)
	// 				{
 	//					bankName = $("#banksContainer").find(allBidsBanks[i]).find(".bankName").val();
 	//					allBids = $("#banksContainer").find(allBidsBanks[i]).find("tr.bidTr");
 	//					for(var j=0;i<allBids.length;i++)
	// 					{
	 						
	 						
	// 						bidObject.sum = $("#banksContainer").find(allBids[j]).find(".bidSum").val();
	// 						bidObject.type = $("#banksContainer").find(allBids[j]).find(".bidType").val();
	// 						bidObject.interest = $("#banksContainer").find(allBids[j]).find(".interest").val();
	// 						bidObject.indexation = $("#banksContainer").find(allBids[j]).find(".indexation").val();
	// 						bidObject.time = $("#banksContainer").find(allBids[j]).find(".bidTime").val();
	// 						bidObject.returnSum = $("#banksContainer").find(allBids[j]).find(".returnSum").val();
	// 						bidObject.bank = bankName;
	// 						bidsList.push(bidObject);
	 						
	// 						if(!bidObject.sum || !bidObject.interest || !bidObject.indexation || !bidObject.returnSum)
	// 						{ errorLog += 'לא מילאת אף הצעת מחיר !\n';flag=false; }
	// 					}
	// 				}
 						
    //   		}
    //   		if(flag)
    //   		{
    //   			params.bids = bidsList;
    //   			if(params.stepId < 6)
    //   				params.stepId = 6;
    //   			$('#item-adaptations').removeClass("item-unabled");
    //   		}
    //   	break;
    //   	case "item-adaptations":
    //   	//GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
    //   		params.planningTime = $('input[name="planning"]:checked').val();
    //   		params.stability = $('input[name="stability"]:checked').val();
    //   		params.changes = $('input[name="changes"]:checked').val();
    //   		if(params.changes == "1") {
    //   			params.changesType = $('input[name="changes-options"]:checked').val();
    //   			if(params.changesType == "monthlyReturn")
    //   			{
    //   				params.monthlyReturnSum = $("#monthlyReturnSum").val();
    //   				params.monthlyReturnTime  = $("#monthlyReturnTime").val();
    //   			}
    //   			else
    //   				params.fullOutTime  = $("#fullOutTime").val();
       			
    //   		}
    //   		if(flag) {
    //   			params.stepId = 7;
    //   			$('#item-summary').removeClass("item-unabled");
       			
    //   		}
    //   	break;
    //   	default:
    //   		return;
    //   	break;
       	
    //   }
    //   if(errorLog)
    //   	alert(errorLog);
	//	else if($(this).closest('.item').nextAll(".item").not(".item-no-show").first().hasClass('item-unabled') == false)
    //    		accordionOpenItem($(this).closest('.item').nextAll(".item").not(".item-no-show").first());
        
       
    //    	updateOrderDetails();
    //});
    //$(".accordion > .item .prev-item").on("click", function() {
    //    accordionOpenItem($(this).closest('.item').prev());
    //});
    //$(".accordion > .item.open").children(".item-content").css("display", "block");
    //$(".accordion > .item:not(.open)").children(".item-content").css("display", "none");
    //$(".accordion > .item > .item-title").on("click", function() {
    //	if($(this).parent().hasClass('item-unabled') == false)
    //    accordionOpenItem($(this).parent());
    //});
    //$("#popups > #sign-in-up > #tabs > div").on("click", function() {
    //    var id = $(this).attr("id");
    //    $("#popups > #sign-in-up").removeClass().addClass(id.substr(0, id.length - 4)+"-active");
    //    if (id == "sign-in-tab") {
    //        $("#menu-login").addClass("current-page").siblings().removeClass("current-page");
    //        $("#header > #top-header #menu > ul").data('active', $("#menu-login")).lavalamp("update");
    //    }
    //    else if (id == "sign-up-tab") {
    //        $("#menu-register").addClass("current-page").siblings().removeClass("current-page");
    //        $("#header > #top-header #menu > ul").data('active', $("#menu-register")).lavalamp("update");
    //    }
    //});
    $("#menu-login > a").on("click", function(e) {
        e.preventDefault();
        if ($(this).closest('#menu').hasClass('personal-menu')) {
        }
        else {
            if (isPopupOpened) {
                if (isPopupOpened == "sign-in-up") {
                    if ($("#popups > #sign-in-up").attr("class") == "lost-password-active") {
                        $("#popups > #sign-in-up").fadeOut(750, function () {
                            openPopup("sign-in-up", false,null, 'isRegister=false');
                            $("#popups > #sign-in-up").removeClass().addClass("sign-in-active");
                        });
                        return;
                    }
                }
                else {
                    openPopup("sign-in-up", true,   null, 'isRegister=false');
                }
            }
            else {
                openPopup("sign-in-up", false,null, 'isRegister=false');
            }
            $("#popups > #sign-in-up").removeClass().addClass("sign-in-active");
            $(this).parent().addClass("current-page").siblings().removeClass("current-page");
        }
    });
    
    $(".start-button").on("click", function(e) {
        e.preventDefault();
        if (isPopupOpened) {
            if (isPopupOpened == "sign-in-up") {
                if ($("#popups > #sign-in-up").attr("class") == "lost-password-active") {
                    $("#popups > #sign-in-up").fadeOut(750, function() {
                        openPopup("sign-in-up", false,null, 'isRegister=true');
                        $("#popups > #sign-in-up").removeClass().addClass("sign-in-active");
                    });
                    return;
                }
            }
            else {
                openPopup("sign-in-up", true,null, 'isRegister=true');
            }
        }
        else {
            openPopup("sign-in-up", false,null, 'isRegister=true');
        }
        $("#popups > #sign-in-up").removeClass().addClass("sign-in-active");
        $(this).parent().addClass("current-page").siblings().removeClass("current-page");
    });

    $("#menu-register > a").on("click", function(e) {
        e.preventDefault();
        if ($(this).closest('#menu').hasClass('personal-menu')) {
        }
        else {
            if (isPopupOpened) {
                if (isPopupOpened == "sign-in-up") {
                    if ($("#popups > #sign-in-up").attr("class") == "lost-password-active") {
                        $("#popups > #sign-in-up").fadeOut(750, function () {
                            openPopup("sign-in-up", false,null, 'isRegister=true');
                            $("#popups > #sign-in-up").removeClass().addClass("sign-up-active");
                        });
                        return;
                    }
                }
                else {
                    openPopup("sign-in-up", true,null,'isRegister=true');
                }
            }
            else {
                openPopup("sign-in-up", false,null, 'isRegister=true');
            }
            $("#popups > #sign-in-up").removeClass().addClass("sign-up-active");
            $(this).parent().addClass("current-page").siblings().removeClass("current-page");
        }
    });

    $("#menu-contact > a, footer .footer-contact").on("click", function(e) {
        e.preventDefault();
        $("#header > #top-header #menu > ul").data('active', $("#menu-contact")).lavalamp("update");
        setTimeout(function() {
            openPopup("contact", true);
        }, 500)
        $("#menu-contact").addClass("current-page").siblings().removeClass("current-page");
    });
    //$("#popups > #sign-in-up > #sign-in > form > #lost-password-text > a").on("click", function(e) {
    //    e.preventDefault();
    //    e.stopImmediatePropagation();
    //    $("#popups > #sign-in-up > #lost-password > form > input[type='submit']").css({
    //        "visibility" : "visible",
    //        "opacity" : 1
    //    }).siblings("p").css("opacity", "0");
    //    /* $("#popups > #sign-in-up").fadeOut(750, function() { */
    //        /* openPopup("sign-in-up"); */
    //        $("#popups > #sign-in-up").removeClass().addClass("lost-password-active");
    //    /* }); */
    //});
    //$("#popups > #sign-in-up > #lost-password > form").on("submit", function(e) {
    //    e.preventDefault();
    //    $(this).children("input[type='submit']").fadeTo(750, 0, "linear", function() {
    //        $(this).css("visibility", "none");
    //        closePopupTimeout = setTimeout(function() { 
	//	         $("#popups > #sign-in-up").removeClass().addClass("sign-in-active");
    //        }, 500)
    //    }).siblings("p").fadeTo(750, 1, "linear");
        
    //});
    $("#popups").on("click", function(e) {
        if (e.target == e.currentTarget) {
            closePopup();
        }
    });
    $(".start-button").hover(function() {
        $(this).children("div").fadeOut(250);
    }, function() {
        $(this).children("div").fadeIn(250);
    });
    $("a[href^=#]").on("click", function(e) {
        e.preventDefault();
        if ($(this).closest('#menu').is('*') || $(this).is('footer .footer-contact')) {
            return;
        }
        var scrollTo = $("#"+$(this).attr("href").substr(1));
        disable_scroll();
        if (!scrollTo.is('*')) {
            $("html, body").scrollTo($("body"), {
                "easing" : "easeInOutCubic",
                "axis" : "y",
                "duration" : 250,
                "onAfter" : function() {
                    enable_scroll();
                }
            });
        }
        else {
            var amountToReduce = 119;
            if ($("#navigator").is("*")) {
                amountToReduce += 42;
            }
            $("html, body").scrollTo(scrollTo, {
                "easing" : "easeInOutCubic",
                "axis" : "y",
                "duration" : 250,
                "offset" : {
                    "top" : -amountToReduce
                },
                "onAfter" : function() {
                    enable_scroll();
                }
            });
        }
    });
    $(window).on("load", function() {
        $("#header > #top-header #menu > ul").lavalamp({
            "duration" : 250,
            /* "easing" : "linear", */
            "activeObj" : ".current-page",
            "setOnClick" : true
        });
    });
    $("#slider").nivoSlider({
        "effect" : "sliceUpRight",
        "pauseTime" : 5000,
        "directionNav" : false,
        "pauseOnHover" : false,
        "controlNav" : true
    });
    var stepsIconsBgPosX = {
        "out" : [
            50, 35, 35, 26
        ],
        "over" : [
            -178, -224, -224, -249
        ]
    };
    $("#how-does-it-work.page.hp > .container > #steps > .step > div").hover(function() {
        var index = $(this).parent().index();
        if (index < 4) {
            $(this).stop().animate(
                {
                    "backgroundPositionX" : stepsIconsBgPosX.over[index]+"px"
                }, {
                    "duration": 320,
                    "easing" : "swing"
                }
            );
        }
    }, function() {
        var index = $(this).parent().index();
        if (index < 4) {
            $(this).stop().animate(
                {
                    "backgroundPositionX" : stepsIconsBgPosX.out[index]+"px"
                }, {
                    "duration": 320,
                    "easing" : "swing"
                }
            );
        }
    });
   /* $(".item-confirmation #agree-confirmation").on("change", function() {
        if ($(this).is(":checked")) {
            $(this).siblings("#checkboxes").css('opacity', 0)
                .slideDown('slow')
                .animate(
                { opacity : 1 },
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
    });*/
    /*$(".item-confirmation #bank-other").on("change", function() {
        $(this).siblings("label[for='bank-other']").children("input").prop("disabled", !$(this).is(":checked"));
    });*/
 /*   $(".item-adaptations #has-changes, .item-adaptations #doesnt-have-changes").on("change", function() {
        if ($(".item-adaptations #has-changes").is(":checked")) {
            $(".item-adaptations #has-changes-checked").css('opacity', 0)
                .slideDown('slow', function() {
                $elem = $(this);
                if ($elem.closest('.page#personal').is('*')) {
				          var viewHeight    = $(window).height() - $("#top-header").height(),
				              itemOffsetTop = $elem.offset().top  - $("#top-header").height() - $("body").scrollTop(),
				              itemHeight    = $elem.height();
				            //alert(itemOffsetTop +" -> "+itemHeight+" -> "+viewHeight);
				          if (itemOffsetTop + itemHeight > viewHeight) {
				              var scrollTo = Math.min(itemOffsetTop + itemHeight - viewHeight + 50, itemOffsetTop);
				              $("html, body").scrollTo(scrollTo + $("body").scrollTop(), {
				                  "easing" : "easeInOutCubic",
				                  "axis" : "y",
				                  "duration" : 0,
				                  "onAfter" : function() {
				                      enable_scroll();
				                  }
				              });
				          }
				        }
				      })
                .animate(
                { opacity : 1 },
                { queue: false, duration: 'slow' }
            );
        }
        else {
            $(".item-adaptations #has-changes-checked").css('opacity', 1)
                .slideUp('slow')
                .animate(
                { opacity: 0 },
                { queue: false, duration: 'slow' }
            );
        }
    });*/
  /*  $('#has-changes-checked label[for="changes-quite"], #has-changes-checked label[for="changes-danger"]').on("click", function(e) {
        if ($(e.target).is("select")) e.preventDefault();
    });*/
   /* $(".item-deal-type > .item-content > input[type='radio']").on("change", function() {
        if ($(".item-deal-type #recycle").is(":checked")) {
            $(".item-deal-type #recycle-checked").css('opacity', 0)
                .slideDown('slow')
                .animate(
                { opacity : 1 },
                { queue: false, duration: 'slow' }
            );
        }
        else {
            $(".item-deal-type #recycle-checked").css('opacity', 1)
                .slideUp('slow')
                .animate(
                { opacity : 0 },
                { queue: false, duration: 'slow' }
            );
        }
    });*/
    $(".item-borrowers-details input[type='radio'], .item-offers input[type='radio']").on("change", function() {
        $elem = $(this).nextAll(".table-after-checkbox").eq(0);
        if ($(this).closest(".item-offers").is('*')) {
            $elem = $(this).parent().parent().find(".table-after-checkbox").eq(0)
        }
        if (
            $(this).attr("name") == "has-musts" && $(".item-borrowers-details #has-musts").is(":checked") ||
            $(this).attr("name") == "has-money" && $(".item-borrowers-details #has-money").is(":checked") ||
            $(this).attr("name") == "has-offers" && $(".item-offers #has-offers").is(":checked")
        ) {
				if($(this).attr("name") == "has-offers" && $(".item-offers #has-offers").is(":checked"))
            	$elem = $elem.closest("#banksContainer");
            
            $elem.css('opacity', 0)
                .slideDown('slow',function() {
                if ($elem.closest('.page#personal').is('*')) {
				          var viewHeight    = $(window).height() - $("#top-header").height(),
				              itemOffsetTop = $elem.offset().top  - $("#top-header").height() - $("body").scrollTop(),
				              itemHeight    = $elem.height();
				            //alert(itemOffsetTop +" -> "+itemHeight+" -> "+viewHeight);
				          if (itemOffsetTop + itemHeight > viewHeight) {
				              var scrollTo = Math.min(itemOffsetTop + itemHeight - viewHeight + 50, itemOffsetTop);
				              $("html, body").scrollTo(scrollTo + $("body").scrollTop(), {
				                  "easing" : "easeInOutCubic",
				                  "axis" : "y",
				                  "duration" : 0,
				                  "onAfter" : function() {
				                      enable_scroll();
				                  }
				              });
				          }
				      }
                })
                .animate(
                { opacity : 1 },
                { queue: false, duration: 'slow'});
            
        }
        else {
           if($(this).attr("name") == "has-offers" && $(".item-offers #doesnt-have-offers").is(":checked"))
            	$elem = $elem.closest("#banksContainer");
            $elem.css('opacity', 1)
                .slideUp('slow')
                .animate(
                { opacity : 0 },
                { queue: false, duration: 'slow' }
            );
        }
    });
    
    
    //var countMust = 2;
    //$(document).on("click", "#addMustTr", function() {
    //	if(countMust <5)
    //	{
    //    var $table = $(this).prev("table");
    //    $table.find("tr:last-of-type").clone().appendTo($table).find('input').val('');
    //    countMust++;
    //    $('input.number-input').number(true, 0);
    //    $(".table-after-checkbox .customSelect").remove();
    //    $(".table-after-checkbox select").removeAttr("style").customSelect();

    //    $(".removeMustTr").show();
    //   }
    //   else alert("אפשר להוסיף עד 5 חובות");
    //});
    
    //var countRelease = 2;
    //$(document).on("click", "#addReleaseTr", function() {
    //	if(countRelease <5)
    //	{
    //    var $table = $(this).prev("table");
    //    $table.find("tr:last-of-type").clone().appendTo($table).find('input').val('');
    //    countRelease++;
    //    $('input.number-input').number(true, 0);
    //    $(".table-after-checkbox .customSelect").remove();
    //    $(".table-after-checkbox select").removeAttr("style").customSelect();

    //    $(".removeReleaseTr").show();
    //   }
    //   else alert("אפשר להוסיף עד 5 שחרורים");
    //});
    
    /*var countLoanRoutes = 1;
    $(document).on("click", "#addLoanRoute", function() {
    	if(countLoanRoutes <1000)
    	{
        var $table = $(this).prev("table");
        $table.find("tr:last-of-type").clone().appendTo($table).find('input').val('');
        countLoanRoutes++;
        $('input.number-input').number(true, 0);
        $("table .customSelect").remove();
        $("table select").removeAttr("style").customSelect();
       }
       else alert("אפשר להוסיף עד 1000 מסלולים");
    });*/
    
    /*var countBankBids = 1;
    $(document).on("click", ".addBankBidTr", function() {
    	if(countBankBids <3)
    	{
        var $table = $(this).prev("table");
        $table.find("tr:last-of-type").clone().appendTo($table).find('input').val('');
        countBankBids++;
        $('input.number-input').number(true, 0);
        $("table .customSelect").remove();
        $("table select").removeAttr("style").customSelect();
       }
       else alert("אפשר להוסיף עד 3 מסלולים");
    });
    
    $(document).on("click", ".addBank", function() {
    	
    	if(countBankBids <3)
    	{
        var $table = $(this).closest("#banksContainer");
       
        $table.find(".table-after-checkbox").last().clone().appendTo($table).find('input').val('');
        $table.find(".table-after-checkbox").last().find(".addBank span,.addBank div").remove();
        countBankBids++;
        $('input.number-input').number(true, 0);
        $("table .customSelect").remove();
        $("table select").removeAttr("style").customSelect();
       }
       else alert("אפשר להוסיף עד 3 מסלולים");
    });*/

    /*$(document).on("click", ".remove-bank", function () {
    	countBankBids--;
    	$("#bankBidsTable").remove();

    });*/
    
    
    var countBankOffers = 1;
    $(document).on("click", ".addBankOfferTr", function() {
    	if(countBankOffers <3)
    	{
        var $table = $(this).prev("table");
        $table.find("tr:last-of-type").clone().appendTo($table).find('input').val('');
        countBankOffers++;
       }
    });
	//$(".removeContainingTr").hide();
	// if only 1 option left, hide remove label
  /*  $(document).on("click", ".removeMustTr, .removeReleaseTr", function () {

    	$(this).closest("tr").remove();

    	var trClass = $(this).closest("tr").attr("class");

    	var thisClass = $(this).attr("class");

    	if ($("tr[class=" + trClass + "]").length == 1) {
    		$("." + thisClass).each(function () {
    			$(this).hide();
    		});
    	}

    	if (thisClass == "removeMustTr") {
    		countMust--;
    	}
    	if (thisClass == "removeReleaseTr") {
    		countRelease--;
    	}			
					
	});*/
    
    
   /* $("#accordion-after-order .orange-button, #profit .item-compare .orange-big-button").on('click', function() {
        openPopup('payment');
    });*/
    $('#popups > #payment label[for="promo-code"]').on('click', function(e) {
        if ($(this).html() == "הזן קוד פרומו") {
            $(this).next().css('visibility', 'visible').fadeTo(750, 1);
            $(this).html("הסתר קוד פרומו")
        }
        else {
            e.preventDefault();
            $(this).next().fadeTo(750, 0, function() {
                $(this).css('visibility', 'hidden')
            });
            $(this).html("הזן קוד פרומו");
        }
    });
    $("#popups > #payment > form > .orange-big-button").on('click', function() {
        $(this).closest('form').submit();
    });
    (function() {
        var opacities = {
            "0.31" : "1",
            "0.63" : "0.31",
            "1" : "0.63"
        }
        function animateOpacity(element) {
            $(element).animate({
                "opacity" : opacities[(Math.round($(element).css("opacity") * 100) / 100).toString()]
            }, {
                "duration" : 750,
                "complete" : function() {
                    animateOpacity(element);
                }
            });
        }
        $("#accordion > .item-loan-details > .item-content #checking > #cubes > div").each(function() {
            animateOpacity(this);
        }); 
    })();
});
function updateMoneyHave()
{

$("#money-have").val($("#property-value-buy").val() - $("#loan-desire").val());
}

function calculateFirstSumReturn()
{

}
function updateTotalLoanSum() {
var allLoans = $("#allLoansTable").find("tr.loanRoutes");
var totalSum = 0;

for(var i=0;i<allLoans.length;i++)
	totalSum += Number($("#allLoansTable").find(allLoans[i]).find(".loanSum").val());
// $("#originalLoanSum").val(totalSum);
var numWithComma = numberWithCommas(totalSum);
$("#originalLoanSum").val(numWithComma);
}

function UpdateRecycleTotal() {
    var t = $(this).val();
    var tr = $(this).closest('tr').find('.total-remaining').val(t);
}

function UpdateMonthlyReturn() {
	var allReturns = $("#allLoansTable").find("tr.loanRoutes");
	var totalSum = 0;

	for (var i = 0; i < allReturns.length; i++)
		totalSum += Number($("#allLoansTable").find(allReturns[i]).find(".returnSum").val());
	// $("#startMonthReturn").val(totalSum);
	var numWithComma = numberWithCommas(totalSum);
	$("#startMonthReturn").val(numWithComma);
}

function disableOtherFieldsChanges() {
	if($('input[name="changes-options"]:checked').val() != "fullOut")
	{
		$("#fullOutTime").prop('disabled', false);
		
		$("#monthlyReturnSum").prop('disabled', true);
		$("#monthlyReturnTime").prop('disabled', true);
	}
	else
	{
		$("#fullOutTime").prop('disabled', true);
		$("#monthlyReturnSum").prop('disabled', false);
		$("#monthlyReturnTime").prop('disabled', false);
	}
}
/*
function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
function getNamePval(pVal)
{
switch(pVal) {
	case "dealType":
		if(params.dealType=="buy-property")
			return "רכישת נכס";
		else
			if(params.isRecycleCheck == "1")
				return "מחזור הלוואה עם בדיקת כדאיות מחזור";
			else 
				return "מחזור הלוואה ללא בדיקת כדאיות מחזור";
		break;
	case "propertyValue":
		return numberWithCommas(params.propertyValue);
		break;
	case "loanSum":
		if(params.dealType=="buy-property")
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
		if(params.isDebts == "1")
			return "יש";
		else
			return "אין";
		break;
	case "isRelease":
		if(params.isRelease == "1")
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
		BanksNamesList["bank-discount"]= "בנק דיסקונט";
		var allBanksString = BanksNamesList[params.banksAuth[0]];
		
		for(var i=1;i<params.banksAuth.length;i++)
		{
			allBanksString += ", "+BanksNamesList[params.banksAuth[i]];
		}
		return allBanksString;
		break;
	case "loanPercent":
		if(params.dealType=="buy-property")
			return parseInt(parseInt(params.loanDesire)*100.0/parseInt(params.propertyValue));
		else
			return parseInt(parseInt(params.loanLeft)*100.0/parseInt(params.propertyValue));
		break;	
	case "returnPercent":
		return parseInt(parseInt(params.wantedReturn)*100.0/parseInt(params.netoSum));
		break;
	case "planning":
		if(params.planningTime == "short")
			return "זמן קצר";
		else if(params.planningTime == "medium")
			return "זמן בינוני";
		else
			return "זמן ארוך";
		break;
	case "stability":
		if(params.stability == "danger")
			return "החזר תנודתי ונזילות גבוהה";
		else
			return "החזר יציב ונזילות נמוכה";
		break;
	case "changes":
		if(params.changes == "0")
			return "לא צפויים שינויים";
		else
			if(params.changesType=="fullOut")
				return "צפוי סילוק ההלוואה תוך "+params.fullOutTime+" שנים";
			else 
				return " צפוי החזר חודשי של "+numberWithCommas(params.monthlyReturnSum)+' ש"ח בתוך כ-'+params.monthlyReturnTime+" שנים ";
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
	if(getNamePval("loanPercent") >= 70)
		$("#ODloanPercent").html('<span style="color:red;font-weight:bold">'+getNamePval("loanPercent")+'%</span>');
	else if(getNamePval("loanPercent") >= 60)
		$("#ODloanPercent").html('<span style="color:orange;">'+getNamePval("loanPercent")+'%</span>');
	else
		$("#ODloanPercent").html(getNamePval("loanPercent")+ "%");
		
	if(getNamePval("returnPercent") >= 70)
		$("#ODreturnPercent").html('<span style="color:red;font-weight:bold">'+getNamePval("returnPercent")+'%</span>');
	else if(getNamePval("returnPercent") >= 60)
		$("#ODreturnPercent").html('<span style="color:orange;">'+getNamePval("returnPercent")+'%</span>');
	else
		$("#ODreturnPercent").html(getNamePval("returnPercent")+ "%");
	
	$("#ODbanksAuth").html(getNamePval("bankAuth"));
	$("#ODplanning").html(getNamePval("planning"));
	$("#ODstability").html(getNamePval("stability"));
	$("#ODchanges").html(getNamePval("changes"));
		
	
	
}
*/
//function displayProfitAccordion(orderNumber) {
//	$("#profit .accordion").hide(0);
//	$("#profit .accordion").show(400);
//	if(orderNumber == 2) 
//	{
//		$("#item-shrink-to-fit").addClass("item-unabled");
//	}
//}
function checkMustTableDetails() {
var allDebts = $("#tbl_must").find("tr.mustTr");
	var debtObject = { },debtsList = [ ];
	for(var i=0;i<allDebts.length;i++)
	{
		if($("#tbl_must").find(allDebts[i]).find(".numberDebt").val() > 200) 			{ return true; }
	}
	return false;
}
function checkMustTable() {
	if(checkMustTableDetails())
		$("#tbl_must").find(".removeContainingTr").show();
	else 
		$("#tbl_must").find(".removeContainingTr").hide();

}
function checkReleaseTableDetails() {
var allR = $("#tbl_release").find("tr.releaseTr");
	for(var i=0;i<allR.length;i++)
	{
		if($("#tbl_release").find(allR[i]).find(".numberRelease").val() > 20000) 			{ return true; }
	}
	return false;
}
function checkReleaseTable() {
	if(checkReleaseTableDetails())
		$("#tbl_release").find(".removeContainingTr").show();
	else 
		$("#tbl_release").find(".removeContainingTr").hide();

}


// return true for future. false for past
function IsItFutureDate(month, year) {
    var now = new Date();
    var rc = true;

    // check the past years as well...
    if (now.getFullYear() > year) {
        rc = false;
    }
    else if (now.getFullYear() < year) {
        rc = true;
    }
    else if (now.getFullYear() == year) {
        //if (month < now.getMonth() + 1) {
        if (month <= now.getMonth()) {
            rc = false;
        }
    }

    return rc;
}

function CheckDate(month, year) {
    var now = new Date();
    
    if (now.getFullYear() == year) {
        //if (month < now.getMonth() + 1) {
        if (month <= now.getMonth()) {
            return false;
        }
    }

    return true;
}





/*function addTrToTableById(tableId) {
	var $table = $("#"+tableId);
  $table.find("tr:last-of-type").clone().appendTo($table).find('input').val('');
  //countMust++;
  $('input.number-input').number(true, 0);
  $(".table-after-checkbox .customSelect").remove();
  $(".table-after-checkbox select").removeAttr("style").customSelect();
}*/


