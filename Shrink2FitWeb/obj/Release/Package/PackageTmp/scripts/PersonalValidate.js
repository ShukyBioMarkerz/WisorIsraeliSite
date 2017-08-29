/// <reference path="getOrder.js" />

PersonalValidate = {

	init: {},

	errorLog: "",

	Validate: function() {
		// check if there are errors, if yes return false
		if (this.errorLog) {			
			return false;
		}
		else {
			return true;
		}
	},

	DealType: function () {

		var flag = true;

		this.errorLog = "";

		var dealType = $('input[name="deal-type"]:checked').val();

		if (dealType != 3) {
		
		    if ($('input[name="deal-type"]:checked').val() == 1) {
		        var d = new Date();
		        
		        if (!CheckDate($('.selectMonth').val() - 1, $('.selectYear').val())) {
		            
		                this.errorLog += "- יש להזין תאריך עתידי לכניסה לנכס\n"; flag = false;
		            
		        }
				if (!$('#buy-first-hand-details-currentrent').val()) {
				    this.errorLog += "שכירות לא הוזנה - נא להזין שכירות כיום או לסמן שאין שכירות\n"; flag = false;
				}
				if ($("#buy-first-hand-details-hasrent").is(":checked") == false) {
				    if (!/^\+?(0|[1-9]\d*)$/.test($('#buy-first-hand-details-currentrent').val())) {
				        this.errorLog += 'שכירות חודשית מוזנת לא תקינה\n';
				        flag = false;
				    }
				    else if ($('#buy-first-hand-details-currentrent').val() > parseInt(PersonalConstants.BuyFirstHandCurrentRentMax) || $('#buy-first-hand-details-currentrent').val() < parseInt(PersonalConstants.BuyFirstHandCurrentRentMin)) {
				        this.errorLog += '  שכירות חודשית יכולה להיות בין ₪' + PersonalConstants.BuyFirstHandCurrentRentMin + ' ל ₪' + PersonalConstants.BuyFirstHandCurrentRentMax + ' !\n'; flag = false;
					}
					
				}

			}			
		}

		if (flag)
			return true;
		else
			return false;
	},

	BorrowersDetails: function () {

		var flag = true;

		this.errorLog = "";

		var log = this.errorLog;

		if (!$('#num-of-borrowers').val()) {
		    log += "לא נבחר מספר הלוים בעסקה!\n"; flag = false;
		}

		if (!$('#youngest-borrower').val()) {
		    log += "לא נבחר גיל הלוה הצעיר ביותר!\n"; flag = false;
		}

		if (!$('#neto-sum').val()) {
		    log += 'נא להזין סה"כ הכנסות חודשיות נטו ב-₪ של כל הלוים!\n';
		}

		if ($('#neto-sum').val() > parseInt(PersonalConstants.NetoSumMax) || $('#neto-sum').val() < parseInt(PersonalConstants.NetoSumMin)) {
		    log += 'סה"כ הכנסות חודשיות מוזן מחוץ לטוח האפשרי - בין  ₪' + PersonalConstants.NetoSumMin + ' ל ₪' + PersonalConstants.NetoSumMax + '!\n'; flag = false;
		}

		var tempLog = "";

		if ($('input[name="has-musts"]:checked').val() == "1") {

		    //var allDebts = $("#tbl_must").find("tr.mustTr");

		    tempLog = "";
			
		    $("#tbl_must tr.value-rows").each(function () {

		        if ($(this).find(".numberDebt").val() == "") {
		            tempLog += '- יש להזין לפחות הלואה אחת או לסמן שאין הלואות קימות\n';
		            flag = false;
		        }
		        else {
		            if ($(this).find(".numberDebt").val() < parseInt(PersonalConstants.DebtsMin) || $(this).find(".numberDebt").val() > parseInt(PersonalConstants.DebtsMax)) {
		                tempLog += ' - החזר חודשי עבור הלואה בודת יכול להיות בין ₪' + PersonalConstants.DebtsMin + ' ל ₪' + PersonalConstants.DebtsMax + ' במידה וקימת הלואה גדולה מדי, ניתן לחלק אותה לחלקים\n';
		                flag = false;
		            }
		            

		            var dateMonth = $(this).find('.selectMonth').val();
		            var dateYear = $(this).find('.selectYear').val();

		            if (!dateMonth || !dateYear) {
		                tempLog += ' - נא להשלים את תאריך סיום ההתחחיבויות\n';
		                flag = false;
		            }

		            if (!CheckDate(dateMonth - 1, dateYear)) {
		                tempLog += ' - נא לבחור תאריך סיום עתידי עבור ההתחייבות\n';
		                flag = false;
		            }

		        }



               
               
		    });

		    if (tempLog != "") {
		        log += "הלואות קיימות\n";
		        log += tempLog;
		    }
		}

		if ($('input[name="has-money"]:checked').val() == "1") {

		    var allRelease = $("#tbl_release").find("tr.releaseTr");

		    tempLog = "";
		    
			
		    $("#tbl_release tr.value-rows").each(function () {

			    if ($(this).find(".numberRelease").val() == "") {
			        tempLog += '- יש להזין לפחות סכום אחד או לסמן שאין סכומים פנוים בעתיד\n';
			        flag = false;
			    }
			    else {

			        if ($(this).find(".numberRelease").val() < parseInt(PersonalConstants.ReleaseMin) || $(this).find(".numberRelease").val() > parseInt(PersonalConstants.ReleaseMax)) {
			            tempLog += ' - סכום מוזן יכול להיות בין ₪- ' + PersonalConstants.ReleaseMin + ' ל- ₪' + PersonalConstants.ReleaseMax + ' במידה וקים סכום גדול מדי, ניתן לחלק אותו לחלקים\n';
			            flag = false;
			        }
			       

			        var dateMonth = $(this).find('.selectMonth').val();
			        var dateYear = $(this).find('.selectYear').val();

			        if (!dateMonth || !dateYear) {
			            tempLog += ' - נא להשלים את תאריך שחרור הכספים\n';
			            flag = false;
			        }

			        if (!CheckDate(dateMonth - 1, dateYear)) {
			            tempLog += '- נא להזין תאריך עתידי בו הכסף יהפוך לזמין\n';
			            flag = false;
			        }
			    }

			});

			if (tempLog != "") {
			    log += "שחרורים עתידיים\n";
			    log += tempLog;
			}
		}

		if ($('input[name="has-savings"]:checked').val() == "1") {

		    tempLog = "";

		    $("#tbl_Savings tr.savingsTr").each(function () {
			    if ($(this).find(".savingSum").val() == "") {
			        tempLog += '- יש להזין לפחות סכום אחד או לסמן שאין חסכונות\n';
			        flag = false;
			    }
			    else {
			        if ($(this).find(".savingSum").val() < parseInt(PersonalConstants.SavingsMin) || $(this).find(".savingSum").val() > parseInt(PersonalConstants.SavingsMax)) {
			            tempLog += ' - סכום מוזן יכול להיות בין ₪' + PersonalConstants.SavingsMin + ' ל- ₪' + PersonalConstants.SavingsMax + ' במידה וקים סכום גדול מדי, ניתן לחלק אותו לחלקים\n'; flag = false;
			        }
			        var ai = parseFloat($(this).find(".avarageIncome").val().substring(0, $(this).find(".avarageIncome").val().length - 1));

			        if (ai < parseFloat(PersonalConstants.AvarageIncomeMin) || ai > parseFloat(PersonalConstants.AvarageIncomeMax) || isNaN(ai)) {
			            tempLog += ' - תשואה יכולה להיות בין ' + PersonalConstants.AvarageIncomeMin + '% לבין ' + PersonalConstants.AvarageIncomeMax + '% במידה והתשואה קטנה או גדולה מהטוח, אפשר להזין את גבול התשואה האפשרית עבור החיסכון!\n'; flag = false;
			        }
			    }
		    });

		    if (tempLog != "") {
		        log += "חסכונות \n";
		        log += tempLog;
		    }
		}

		this.errorLog = log;

		if (flag) {
		    this.errorLog += 'על מנת להתקדם יש צורך להשלים את כל הנתונים\n';
		    return true;
		}
		else
		    return false;
	},

	ReleaseRowCheck: function () {

		var flag = true;

		this.errorLog = "";
		
		$("#tbl_release").find("tr.releaseTr").each(function () {
			if ($(this).find(".numberRelease").val() == "" || $(this).find(".numberRelease").val() == 0) {
				PersonalValidate.errorLog += "נא להזין סכום!"; flag = false;
			}
			if ($(this).find(".numberRelease").val() < parseInt(PersonalConstants.ReleaseMin)) {
				PersonalValidate.errorLog += ' סכום שחרור לא יהיה קטן מ-' + PersonalConstants.ReleaseMin + ' ש"ח!\n'; flag = false;
			}
			if ($(this).find(".numberRelease").val() > parseInt(PersonalConstants.ReleaseMax)) {
				PersonalValidate.errorLog += ' סכום שחרור לא יהיה גדול מ-' + PersonalConstants.ReleaseMax + ' ש"ח!\n'; flag = false;
			}

			




			$(this).find('select').each(function () {
			    if ($(this).val() == null) {
			        PersonalValidate.errorLog += "יש למלא את כל השדות\n";
			        flag = false;
			        return false;
			    }
			});
		});			

		if (flag)
			return true;
		else
			return false;
	},

	AddRowCheck: function (table) {
	    var flag = true;

	    this.errorLog = "";

	    table.find("tr.value-rows").each(function () {
	        $(this).find("input.reqiured, select").each(function () {
	            if (!$(this).val() || $(this).val().toLowerCase().indexOf("nan") > 0 || $(this).val() == "") {
	                flag = false;
	            }
	        });
	    });

	    if (!flag) {
	        this.errorLog += "יש למלא את כל השדות בשורה";
	    }

	    return flag;
	},

	HasMustsCheck: function() {
		var flag = true;

		this.errorLog = "";		

		$("#tbl_must").find("tr.mustTr").each(function () {

			if ($(this).find(".numberDebt").val() < parseInt(PersonalConstants.DebtsMin)) {
				PersonalValidate.errorLog += ' סכום חוב לא יהיה קטן מ-' + PersonalConstants.DebtsMin + ' ש"ח!\n'; flag = false;
			}
			if ($(this).find(".numberDebt").val() > parseInt(PersonalConstants.DebtsMax)) {
				PersonalValidate.errorLog += ' סכום חוב לא יהיה גדול מ-' + PersonalConstants.DebtsMax + ' ש"ח!\n'; flag = false;
			}

			if ($(this).find(".numberDebt").val() == "" || $(this).find(".numberDebt").val() == 0) {
				PersonalValidate.errorLog += "נא להזין סכום!"; flag = false;
			}

			$(this).find('select').each(function () {
			    if ($(this).val() == null) {
			        PersonalValidate.errorLog += "יש למלא את כל השדות";
			        flag = false;
			        return false;
			    }
			});
		});

		if (flag)
			return true;
		else
			return false;
	},

	RecycleDeal: function () {

		// hide animation
		$("#cubes, #cubes + p").hide();

	    var flag = true;

	    this.errorLog = "";

	    if (!$('#property-value-recycle').val()) {
	        this.errorLog += "נא להשלים מה שוי הנכס הממושכן!\n"; flag = false;
	    }
	    else if ($('#property-value-recycle').val() < parseInt(PersonalConstants.ProperyValueMin) || $('#property-value-recycle').val() > parseInt(PersonalConstants.ProperyValueMax)) {
	        this.errorLog += ' שוי הנכס יכול להיות בין ₪-' + PersonalConstants.ProperyValueMin + ' ל- ₪' + PersonalConstants.ProperyValueMax + '\n';
	        flag = false;
	    }

	    

	   if (!$('#loan-left').val()) {
	       this.errorLog += "נא להשלים מה יתרת ההלואה הרצויה לבדיקה כול עמלות וקנסות!\n"; flag = false;
	    }
	   else if ($('#loan-left').val() < parseInt(PersonalConstants.RemainLoanToPayMin) || $('#loan-left').val() > parseInt(PersonalConstants.RemainLoanMax)) {
	       this.errorLog += ' סכום ההלואה לבדיקה יכול להיות בין ₪-' + PersonalConstants.RemainLoanMin + ' ל- ₪' + PersonalConstants.RemainLoanMax + '\n';
	       flag = false;
	    }
	    
	    else if ($('#loan-left').val() > $('#property-value').val() * 0.75) {
	        this.errorLog += ' סכום ההלוואה הנותרת לא יהיה יותר מ75% מערך הנכס!\n'; flag = false;
	    }

	    if (!$('#wanted-return-recycle').val()) {
	        this.errorLog += "נא להשלים מה ההחזר החודשי הרצוי!\n"; flag = false;
	    }
	    else if ($('#wanted-return-recycle').val() < parseInt(PersonalConstants.LoanRoutesReturnMin) || $('#wanted-return-recycle').val() > parseInt(PersonalConstants.LoanRoutesReturnMax)) {
	        this.errorLog += ' ההחזר החודשיכול להיות בין ₪-' + PersonalConstants.LoanRoutesReturnMin + ' ל- ₪' + PersonalConstants.LoanRoutesReturnMax + '\n'; flag = false;
	    }


	    

	    var allLoans = $("#allLoansTable").find("tr.loanRoutes");

	    var log = "";

	    if ($('input[name="has-loan-details"]:checked').val() == '1') {

	        if (!$('#originalLoanSum').val()) {
	            this.errorLog += "נא להשלים מה סכום ההלואה המקורית לבדיקה כול עמלות וקנסות!\n"; flag = false;
	        }
	        else if ($('#originalLoanSum').val() < parseInt(PersonalConstants.RemainLoanMin) || $('#originalLoanSum').val() > parseInt(PersonalConstants.RemainLoanMax)) {
	            this.errorLog += ' סכום ההלואה המקורית יכול להיות בין ₪-' + PersonalConstants.RemainLoanMin + ' ל- ₪' + PersonalConstants.RemainLoanMax + '\n';
	            flag = false;
	        }

	        if ( $('#fines').val() > parseInt(PersonalConstants.FinesMax)) {
	            this.errorLog += ' סכום הקנסות/עמלות לא יכול להיות גבוהה מ- ₪-' + PersonalConstants.FinesMax + '\n';
	            flag = false;
	        }

	        

	        $("#allLoansTable tr.loanRoutes").each(function () {

	            if ($(this).find("input").val() == "" && $(this).find('.hasCustomSelect').val() == null) {
	                log += ' יש להזין לפחות מסלול אחד או לסמן שלא ידוע הרכב ההלואה המקורית\n';
	                flag = false;
	            }
	            else {

	                if ($('#bank-name-recycle').val() == null) {
	                    log += '- נא לסמן באיזה בנק נלקחה ההלואה\n';
	                    flag = false;
	                }

	                if ($(this).find(".loanSum").val() < parseInt(PersonalConstants.BidSumMin) || $(this).find(".loanSum").val() > parseInt(PersonalConstants.BidSumMax)) {
	                    log += '-  סכום מסלול יכול להיות בין ₪-' + PersonalConstants.BidSumMin + ' ל- ₪' + PersonalConstants.BidSumMax + ' במידה וקים מסלול עם סכום גדול מדי, ניתן לחלק אותו למספר חלקים\n';
	                    flag = false;
	                }
	                if (isNaN($(this).find(".interest").val().split('%')[0]) || $(this).find(".interest").val() == "" || $(this).find(".interest").val() < 0) {
	                    log += '- הריבית המוזנת לא תקינה!\n';
	                    flag = false;
	                }

	                if ($(this).find(".interest").val().split('%')[0] < parseInt(PersonalConstants.LoanRoutesInterestMin) || $(this).find(".interest").val().split('%')[0] > parseInt(PersonalConstants.LoanRoutesInterestMax)) {
	                    log += '- הריבית המוזנת יכולה להיות בין ' + PersonalConstants.LoanRoutesInterestMin + '% ל- ' + PersonalConstants.LoanRoutesInterestMax + '% במידה והריבית גבוהה מדי, ניתן לבחור בריבית המקסימלית עבור המסלול\n';
	                }

	                if ($(this).find(".returnSum").val() < parseInt(PersonalConstants.LoanRoutesReturnMin) || $(this).find(".returnSum").val() > parseInt(PersonalConstants.LoanRoutesReturnMax)) {
	                    log += '- ההחזר החודשי יכול להיות בין ₪' + PersonalConstants.LoanRoutesReturnMin + ' ל- ₪' + PersonalConstants.LoanRoutesReturnMax + '\n'; flag = false;
	                }

	                if (($(this).find('.routeType').val() == null)) {
	                    log += '- נא לבחור את סוג המסלול\n';
	                    flag = false;
	                }

	                //if (($(this).find('.start-month').val() == null)) {
	                //    log += '- נא לבחור את החודש בו התחיל החזר עבור המסלול\n';
	                //    flag = false;
	                //}

	                //if (($(this).find('.start-year').val() == null)) {
	                //    log += '- נא לבחור את השנה בה התחיל החזר עבור המסלול\n';
	                //    flag = false;
	                //}

	                if (($(this).find('.track-period').val() == null)) {
	                    log += '- נא לבחור את התקופה בחודשים עבור המסלול\n';
	                    flag = false;
	                }
	            }



	            
	        });

	        this.errorLog += log;
	    }
	

	    if (flag) {
	        this.errorLog += 'על מנת להתקדם יש צורך להשלים את כל הנתונים\n';
	        return true;
	    }
		else
			return false;
			
	},

	BuyDeal: function () {

		// hide animation
		$("#cubes, #cubes + p").hide();

		var flag = true;

		this.errorLog = "";

		if (!$('#property-value-buy').val()) {
		    this.errorLog += "נא להשלים מה שוי הנכס הנרכש!\n"; flag = false;
		}
		else if ($('#property-value-buy').val() < parseInt(PersonalConstants.ProperyValueMin) || $('#property-value-buy').val() > parseInt(PersonalConstants.ProperyValueMax)) {
		    this.errorLog += ' שוי הנכס הנרכש מחוץ לטוח האפשרי - בין ₪' + PersonalConstants.ProperyValueMin + ' ל- ' + PersonalConstants.ProperyValueMax + '₪\n';
		    flag = false;
		}

		

		if (!$('#loan-desire').val()) {
		    this.errorLog += "נא להשלים מה סכום ההלואה הרצויה לבדיקה!\n"; flag = false;
		}
		else if ($('#loan-desire').val() < parseInt(PersonalConstants.DesiredLoanMin) || $('#loan-desire').val() > parseInt(PersonalConstants.DesiredLoanMax)) {
		    this.errorLog += ' סכום הלואה לבדיקה יכולה להיות בין ₪-' + PersonalConstants.DesiredLoanMin + ' ל- ₪' + PersonalConstants.DesiredLoanMax;
		    flag = false;
		}
		
		

		if (!$('#wanted-return-buy').val()) {
		    this.errorLog += "נא להשלים מה ההחזר החודשי הרצוי!\n"; flag = false;
		}
		else if ($('#wanted-return-buy').val() < parseInt(PersonalConstants.DesiredLoanMonthlyReturnMin) || $('#wanted-return-buy').val() > parseInt(PersonalConstants.DesiredLoanMonthlyReturnMax)) {
		    this.errorLog += ' החזר חודשיכול להיות בין ₪' + PersonalConstants.DesiredLoanMonthlyReturnMin + ' ל- ₪' + PersonalConstants.DesiredLoanMonthlyReturnMax + '\n'; flag = false;
		}
		

		if (flag) {
		    this.errorLog += 'על מנת להתקדם יש צורך להשלים את כל הנתונים\n';
		    return true;
		}
		else
			return false;
	},

	RecycleCheck: function () {

		var flag = true;
		
		this.errorLog = "";

		var allLoans = $("#allLoansTable").find("tr.loanRoutes");
		
		for (var i = 0; i < allLoans.length; i++) {
			
			if ($("#allLoansTable").find(allLoans[i]).find(".loanSum").val() < parseInt(PersonalConstants.BidSumMin)) {
				this.errorLog += ' סכום  לא יהיה קטן מ-'+PersonalConstants.BidSumMin+' ש"ח!\n'; flag = false;
			}
			if (isNaN($("#allLoansTable").find(allLoans[i]).find(".interest").val())) {
				this.errorLog += 'ריבית חייבת להיות מספר!\n'; flag = false;
			}
			else if ($("#allLoansTable").find(allLoans[i]).find(".interest").val() < 0) {
				this.errorLog += 'ריבית חייבת להיות חיובית !\n'; flag = false;
			}

			if ($("#originalLoanSum").val() > parseInt(PersonalConstants.BidSumMax)) {
				this.errorLog += 'סך ההלוואה לא יכול להיות גבוה מ'+PersonalConstants.BidSumMax+' !\n'; flag = false;
			}
		}

		if (flag)
			return true;
		else
			return false;
	},

	Confirmation: function () {

		var flag = true;

		this.errorLog = "";

		if ($('input[name=agree-main-account]').is(':checked') && $('#agree-main-account-bank').val() == null) {
		    this.errorLog += "נא לבחור את הבנק בו מתנהל חשבון העו''ש, או לבטל את סימון הצ'ק בוקס\n";
		    flag = false;
		}

		if ($('input[name=agree-secondary-account]').is(':checked') && !($('input[name=agree-main-account]').is(':checked'))) {
		    this.errorLog += "נא לבחור בנק בו מתנהל החשבון העו''ש העיקרי לפני בחירת חשבון עו''ש נוסף\n";
		    flag = false;
		}
		else if ($('input[name=agree-secondary-account]').is(':checked') && $('#agree-secondary-account-bank').val() == null) {
		    this.errorLog += "נא לבחור את הבנק בו מתנהל חשבון העו''ש, או לבטל את סימון הצ'ק בוקס\n";
		    flag = false;
		}

		if (!$("#agree-confirmation").is(':checked'))		{
		    this.errorLog += 'על מנת להתקדם ביצוע בדיקה עבור ההלואה, אנו צריכים לודא שקים אישור עקרוני עבור אותה הלואה, לפחות מבנק אחד למשכנתאות !\n'; flag = false;
		}

		var allBanks = $(".checkboxesBanks").find("input[type=checkbox]");

		var banksList = [];
		for (var i = 0; i < allBanks.length; i++) {
			if ($(".checkboxesBanks").find(allBanks[i]).is(':checked'))
				banksList.push($(".checkboxesBanks").find(allBanks[i]).val());

		}
		if (banksList.length == 0) {
		    this.errorLog += 'נא לסמן את הבנקים בהם התקבל אישור עקרוני עבור אותה ההלואה !\n'; flag = false;
		}
		if (banksList.length > 4) {
			this.errorLog += 'אפשר לקבל אישור עקרוני עד מ - 4 בנקים !\n'; flag = false;
		}

		if (flag)
			return true;
		else
			return false;
	},

	Offers: function () {

		var flag = true;

		this.errorLog = "";

		//if ($('input[name="has-offers"]:checked').val() == "1" && !PersonalValidate.CheckAddBank()) {
		//    this.errorLog = "יש למלא את כל הפרטים";
		//    return false;
		//}
				
		if ($('input[name="has-offers"]:checked').val() == "1") {

			
			var bidObject = {};

			var log = "";

			if ($('.item-offers .active-offer .bankOffersTable .bankName').val() == null) {
			    log += "נא לסמן באיזה בנק התקבלה הצעת המחיר\n";
			    flag = false;
			}

			var offerSum = 0;
			var returnSum = 0;
			var bidObjectSumMessage = false;
			var bidObjectTypeMessage = false;
			var bidObjectInterestMessage = false;
			var bidObjectInterestLimitMessage = false;
			var bidObjectTimeMessage = false;
			var bidObjectReturnSumMessage = false;
			var bidObject = {};

			$('#banksContainer .active-offer .bidTr').each(function () {

                // if u will quit then all the accumulation data is in-correct....
			    //if (!flag) {
			    //    return false;
			    //}

			    bidObject.Sum = $(this).find(".bidSum").val();
			    bidObject.Type = $(this).find(".bidType").val();
			    bidObject.Interest = $(this).find(".bankoffers-interest").val();
			    bidObject.Indexation = $(this).find('.value-rows').attr('inflation');
			    bidObject.Time = $(this).find(".bidTime").val();
			    bidObject.ReturnSum = $(this).find(".returnSum").val();

			    // accumulate 
			    offerSum += parseInt(bidObject.Sum);
			    returnSum += parseInt(bidObject.ReturnSum);

			    if (!bidObject.Sum && !bidObject.Interest && !bidObject.ReturnSum && !bidObject.Type && !bidObject.Time) {
			       
			        log += "יש להזין לפחות הצעת מחיר אחת, או לסמן בצ'ק בוקס\n";
			        
			        log += "על מנת להתקדם יש להשלים את כל הנתונים החסרים\n";

			        flag = false;
                    return false;
			    }
			    else {
			        if (bidObject.Sum < parseInt(PersonalConstants.BidSumMin) || bidObject.Sum > parseInt(PersonalConstants.BidSumMax)) {
			            if (!bidObjectSumMessage)
			                log += ' - סכום מסלול יכול להיות בין ₪' + PersonalConstants.BidSumMin + ' ל- ₪' + PersonalConstants.BidSumMax + ' במידה וקים מסלול עם סכום גדול מדי, ניתן לחלק אותו למספר חלקים\n';
			            flag = false;
			            bidObjectSumMessage = true;
			        }

			        if (!bidObject.Type) {
			            if (!bidObjectTypeMessage)
			                log += " - נא לבחור את סוג המסלול\n";
			            flag = false;
			            bidObjectTypeMessage = true;
			        }

			        if (!bidObject.Interest) {
			            if (!bidObjectInterestMessage)
			                log += " - נא להשלים מה הריבית השנתית עבור המסלול\n";
			            flag = false;
			            bidObjectInterestMessage = true;
			        }

			        if (bidObject.Interest.split('%')[0] < parseInt(PersonalConstants.LoanRoutesInterestMin) || bidObject.Interest.split('%')[0] > parseInt(PersonalConstants.LoanRoutesInterestMax)) {
			            if (!bidObjectInterestLimitMessage)
			                log += " - הריבית המוזנת יכולה להיות בין" + PersonalConstants.LoanRoutesInterestMin + "% ל- " + PersonalConstants.LoanRoutesInterestMax + "% במידה והריבית גבוהה מדי, ניתן לבחור בריבית המקסימלית עבור המסלול\n";
			            flag = false;
			            bidObjectInterestLimitMessage = true;
			        }

			        if (!bidObject.Time) {
			            if (!bidObjectTimeMessage)
			                log += " - נא לבחור את התקופה בחודשים עבור המסלול\n";
			            flag = false;
			            bidObjectTimeMessage = true;
			        }

			        if (!bidObject.ReturnSum) {
			            if (!bidObjectReturnSumMessage)
			                log += " - נא להשלים את ההחזר החודשי המקורי עבור המסלול\n";
			            flag = false;
			            bidObjectReturnSumMessage = true;
			        }
			        else if (bidObject.ReturnSum < parseInt(PersonalConstants.BidReturnMin) || bidObject.ReturnSum > parseInt(PersonalConstants.BidReturnMax)) {
			            log += "- ההחזר החודשי יכול להיות בין ₪" + PersonalConstants.BidReturnMin + ' ל- ₪' + PersonalConstants.BidReturnMax + '\n';
			        }
			  

			        //$('.bankBidsTable').each(function () {
			            
			        //    $(this).find('tr.value-rows').each(function () {
			        //        offerSum += parseInt($(this).find('.bidSum').val());
			        //        returnSum += parseInt($(this).find('.returnSum').val());
			        //    })


			            
			        //    if (offerSum != parseInt(Orderobj.data.LoanDetails.LoanDesire)) {
			        //        log += " - סכום ההצעות של בנק אינו שווה לסכום לבדיקה\n";
			        //        flag = false;
			        //    }

			        //    if (returnSum < parseInt(PersonalConstants.BidReturnMin) || returnSum > parseInt(PersonalConstants.BidReturnMax)) {
			        //        log += "- ההחזר החודשי הכולל יכול להיות בין ₪" + PersonalConstants.BidReturnMin + ' ל- ₪' + PersonalConstants.BidReturnMax + '\n';
			        //        flag = false;
			        //    }

			        //    if (returnSum * 1.2 < parseInt(Orderobj.data.LoanDetails.WantedReturn) || returnSum * 0.8 > parseInt(Orderobj.data.LoanDetails.WantedReturn)) {
			        //        log +="- סכום ההחזר הכולל לא תואם להחזר לבדיקה" + '\n';
			        //        flag = false;
			        //    }

			        //})

			       
			    }

			   

			});

		    // check the accululate value correctness
			//if (offerSum != parseInt(Orderobj.data.LoanDetails.LoanDesire)) {
			//    log += " - סכום ההצעות של בנק אינו שווה לסכום לבדיקה\n";
			//    flag = false;
			//}

		    // When users insert a new loan – can be any kind -> when a user inserts price offers:
		    // The total amount of the price offer needs to be compared to the loan amount wanted.
		    // If deviation is less than 5% - the user may approve to continue
			var origLoan = parseInt(Orderobj.data.LoanDetails.LoanDesire);
			if (offerSum != origLoan) {
			    var diff = Math.abs(offerSum - origLoan);
			    var perc = diff / origLoan;
			    if (0.05 <= perc) {
			        // if (offerSum != parseInt(Orderobj.data.LoanDetails.LoanDesire)) {
			        // log += "הסכום אשר מוזן בהצעת המחיר אינו תואם את סכום ההלוואה הרצוי לבדיקה. יש לעדכן את הנתונים בהצעת המחיר.\n";
			        log += "- הסכום אשר מוזן בהצעת המחיר" + " (" + offerSum.toLocaleString() + ") ";
			        log += " אינו תואם את סכום ההלוואה הרצוי לבדיקה" + " (" + origLoan.toLocaleString() + ") ";
			        log += ". יש לעדכן את הנתונים בהצעת המחיר.\n";
			        flag = false;
			    }
			    else {
                    // since there is no way to ask to confirm now, skip it...
			        // log += "הסכום אשר מוזן בהצעת המחיר אינו תואם את סכום ההלוואה הרצוי לבדיקה. האם בכל זאת להמשיך?\n";
			        //flag = false;
			    }
			}

			if (returnSum < parseInt(PersonalConstants.BidReturnMin) || returnSum > parseInt(PersonalConstants.BidReturnMax)) {
			    log += "- ההחזר החודשי הכולל יכול להיות בין ₪" + PersonalConstants.BidReturnMin + ' ל- ₪' + PersonalConstants.BidReturnMax + '\n';
			    flag = false;
			}

			//if (returnSum * 1.2 < parseInt(Orderobj.data.LoanDetails.WantedReturn) || returnSum * 0.8 > parseInt(Orderobj.data.LoanDetails.WantedReturn)) {
			//    log += "- סכום ההחזר הכולל לא תואם להחזר לבדיקה" + '\n';
			//    flag = false;
			//}

			this.errorLog = log;
			
						
			

		}

		if (flag)
			return true;
		else
			return false;
	},

	Adaptations: function () {
		var flag = true;

		this.errorLog = "";
		if ($('input[name="changes"]:checked').val() == 1) {
		    if (!$("#monthlyReturnSum").is(":disabled")) {
		        if ($("#monthlyReturnSum").val() == null || $("#monthlyReturnSum").val() == "") {
		            this.errorLog += "נא להשלים את ההחזר החודשי החזוי\n";
		            flag = false;
		        }
		        else if ($("#monthlyReturnSum").val() < parseInt(PersonalConstants.MonthlyReturnSumMin) || $("#monthlyReturnSum").val() > parseInt(PersonalConstants.MonthlyReturnSumMax)) {
		            this.errorLog += 'יכולת החזר חודשי חייבת להיות בין ₪' + PersonalConstants.MonthlyReturnSumMin + ' ל- ₪' + PersonalConstants.MonthlyReturnSumMax + '!\n';
		            flag = false;
		        }
		    }
		}

	    // shuky - the place to check the new load parameters legality / logic
		CalculateLoan();

		if (flag)
			return true;
		else
			return false;
	},

    Compatibilty: function(){
        var propertyValue = 0;
        var loanSum = 0;
        var monthlyReturn = 0;
        var numOfBorrowers = Orderobj.data.Loaners.NumBorrowers;
        if (Orderobj.data.DealType.Type == 3) {

        	if (this.RecycleDeal()) {

        		propertyValue = $('#property-value-recycle').val();
        		loanSum = $('#loan-left').val();
        		monthlyReturn = $('#wanted-return-recycle').val();
        	}
        	else {
        		alert(this.errorLog);
        		return;
        	}
        }
        else {

        	if (this.BuyDeal()) {

        		propertyValue = $('#property-value-buy').val();
        		loanSum = $('#loan-desire').val();
        		monthlyReturn = $('#wanted-return-buy').val();
        	}
        	else {
        		alert(this.errorLog);
        		return;
        	}
        }
        var data = {
            property: propertyValue, sum: loanSum, monthlyReturn: monthlyReturn, income: Orderobj.data.Loaners.NetoSum,
            age: Orderobj.data.Loaners.YoungBorrower , numOfBorrowers: numOfBorrowers
        };
        $("#cubes, #cubes + p").show();

        $("#cubes, #cubes + p").animate({
            "opacity": 1
        }, 750);

        $("#popups").html('');

        $.ajax({
            type: 'POST',
            data: data,
            url: '/order/CheckCompatibility',
            success: function (data) {
            	if (data.result) {

            		

                	if (data.warning) {
                		
                        $("#cubes, #cubes + p").animate({
                            "opacity": 0
                        }, 750);
                        $("#popups").append(data.message);
                        $("#popups").css({
                            "opacity": 0
                        });

                        $("#popups").show();
                        $("#popups").css({
                            "opacity": 1
                        }, 100);

                        ManagePopUp('compatibility');
                        $('#compatibility').css({
                                    "left": "9%"
                                });
                        $('#compatibility').show();
                        //$("#popups").fadeIn(750, function () {
                        //    $("#popups").append(data.message);
                        //    ManagePopUp('compatibility');
                        //    
                        //});
                    }
                    else {
                        $('#check-ratio').hide();
                        $('#continue-checked').show();
                        $("#popups").hide();
                      
                        
                        $("#cubes, #cubes + p").animate({
                            "opacity": 0
                        }, 750);
                        $('#continue-checked').click();
                    }
                }
            }

        });

    },

    CheckAddBank: function () {
        var flag = true;
        $('div.active-offer').each(function () {
            if (!PersonalValidate.AddRowCheck($(this))) {
                flag = false;
            }
        });
        this.errorLog = "נא להשלים את כל הנתונים עבור הצעת המחיר\n";
        return flag;
    },

    CheckPMT: function (PMT) {
        if (PMT < parseInt(PersonalConstants.LoanRoutesReturnMin) || PMT > parseInt(PersonalConstants.LoanRoutesReturnMax)) {
            return false;
        }
        
        return true;
    }
};

