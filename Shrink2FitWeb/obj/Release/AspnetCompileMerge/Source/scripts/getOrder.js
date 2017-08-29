// gathres the data. Validation occurs in Personal.js

$(function () {	
	
});

var x = function () {
    this.s = 1;

    this.did = function () {
        return s;
    }
    
}

var t = new x();
t.s;



Orderobj = {

	data: {
		Userid : "",
		DealType: "",
		Loaners: "",
		LoanDetails : "",
		Banks: "",
		Offers: "",
		Personal: "",
		RecycleCheck: "",
		Label: ""
	},

	init: function () {
		$.ajax({
			url: "/personal/GetUserID",
			type: "POST",
			contentType: 'application/json; charset=utf-8',
			success: function (response) {
				if (response.id) {
					Orderobj.data.Userid = response.id;
				}
				else {
					return -1;
				}
			}
		});
	},
	//בחירת סוג עסקה
	phase1: function () {

		this.init();

		this.data.DealType = {};

		this.data.DealType.Type = $('input[name="deal-type"]:checked').val();
				
		if ($('input[name="deal-type"]:checked').val() == "1") {
		    Orderobj.data.DealType.DealProperty = {
				
				EnterMonth: $('#buy-first-hand-details .selectMonth').val(),
				EnterYear: $('#buy-first-hand-details .selectYear').val(),
				HasRent: $("#buy-first-hand-details-hasrent").is(":checked") ? "false" : "true",
				CurrentRent: $('#buy-first-hand-details-currentrent').val()
			};
		}

		else {
		    Orderobj.data.DealType.DealProperty = null;
		}
	},
	//השלמת פרטי לווים
	phase2: function () {

		this.data.Loaners.length = 0;
		
		function getLiquidity(val) {
			if (val == "1") {
				return "true";
			}
			if (val == "0") {
				return "false";
			}
			if (val == "null") {
				return "null";
			}
		}

		this.data.Loaners = {
			NumBorrowers: $('#num-of-borrowers').val(),
			YoungBorrower: $('#youngest-borrower').val(),
			Relations: $("#loaners-relation").val(),
			NetoSum: $('#neto-sum').val(),
			IsDebts: $('input[name="has-musts"]:checked').val() == "1" ? "true" : "false",
			Debts: "",
			IsRelease: $('input[name="has-money"]:checked').val() == "1" ? "true" : "false",
			Releases: "",
			IsSavings: $('input[name="has-savings"]:checked').val() == "1" ? "true" : "false",
			Savings: ""
		};

		if ($('input[name="has-musts"]:checked').val() == "1") {

			var debtsList = [];
			$('#tbl_must tr.mustTr').each(function () {
			    var debtObject = {};
			    debtObject.Sum = $(this).find(".numberDebt").val();
			    debtObject.Month = $(this).find(".selectMonth").val();
			    debtObject.Year = $(this).find(".selectYear").val();
			    debtsList.push(debtObject);

			});

			this.data.Loaners.Debts = debtsList;
		}
		
		if ($('input[name="has-money"]:checked').val() == "1") {

			//var allRelease = $("#tbl_release").find("tr.releaseTr");
		    var releaseList = [];
		    $('#tbl_release tr.releaseTr').each(function () {
		        var releaseObject = {};
			    releaseObject.Sum = $(this).find(".numberRelease").val();
			    releaseObject.Month = $(this).find(".selectMonth").val();
			    releaseObject.Year = $(this).find(".selectYear").val();
			    releaseList.push(releaseObject);
			});
			//for (var i = 0; i < allRelease.length; i++) {
				
			//	releaseObject.Sum = $("#tbl_release").find(allRelease[i]).find(".numberRelease").val();
			//	releaseObject.Month = $("#tbl_release").find(allRelease[i]).find(".selectMonth").val();
			//	releaseObject.Year = $("#tbl_release").find(allRelease[i]).find(".selectYear").val();
			//	releaseList.push(releaseObject);
				
			//}
			this.data.Loaners.Releases = releaseList;
		}

		if ($('input[name="has-savings"]:checked').val() == "1") {

			var allSavings = $("#tbl_Savings").find("tr.savingsTr");
			var savingsList = [];
			$('#tbl_Savings tr.savingsTr').each(function () {
			    var savingsObject = {};
			    savingsObject.AmountSaved = $(this).find(".savingSum").val();
			    savingsObject.SavingsType = $(this).find(".indexation").val();

			    var avarage = $(this).find(".avarageIncome").val().substring(0, $(this).find(".avarageIncome").val().length - 1);
			    savingsObject.Yield = avarage;


			    savingsObject.Liquidity = getLiquidity($(this).find(".liquidity").val());
			    savingsList.push(savingsObject);

			});
			this.data.Loaners.Savings = savingsList;
		}

	},
	// השלמת פרטי הלוואה
	phase3: function() {
		if (this.data.DealType.Type == 3) {
		
		    this.data.LoanDetails = {
		        PropertyValue: $('#property-value-recycle').val(),
		        LoanLeft: $('#loan-left').val(),
		        LoanDesire: $('#loan-left').val(),
		        WantedReturn: $('#wanted-return-recycle').val()
		    };
		    if ($('#has-loan-check').val() == 'true') {
		        this.phase3_5();
		    }
		    

		}
		else {
			this.data.LoanDetails = {
				PropertyValue: $('#property-value-buy').val(),
				LoanDesire: $('#loan-desire').val(),
				SelfWealth : $('#property-value-buy').val() - $('#loan-desire').val(),
				WantedReturn: $('#wanted-return-buy').val()
								
			};				
		}

		
	},
	// בדיקת כדאיות מחזור 
	phase3_5: function () {

		this.data.RecycleCheck.length = 0;

		this.data.RecycleCheck = { RecycleLoanBankNumber: $('#bank-name-recycle').val() };

		//var allLoans = $("#allLoansTable").find("tr.loanRoutes");
		var /* loanObject = {},*/ loansList = [];
		//for (var i = 0; i < allLoans.length; i++) {			
		//		loanObject.Sum = $("#allLoansTable").find(allLoans[i]).find(".loanSum").val();
		//		loanObject.Type = $("#allLoansTable").find(allLoans[i]).find(".routeType").val();
				
		//		loanObject.Interest = $("#allLoansTable").find(allLoans[i]).find(".interest").val();

		//		loanObject.Indexation = $("#allLoansTable").find(allLoans[i]).find(".indexation").val();
		//		loanObject.Time = $("#allLoansTable").find(allLoans[i]).find(".recycleTime").val();
		//		loanObject.ReturnSum = $("#allLoansTable").find(allLoans[i]).find(".returnSum").val();
        //        loanObject.StartMonth = 
		//		loansList.push(loanObject);
	    //}

	    //Jonathan
		$("#allLoansTable tr.loanRoutes").each(function () {
		    var loanObject = {}; // must otherwise the same elemnt is used
		    loanObject.Sum = $(this).find(".loanSum").val();
		    loanObject.Type = $(this).find(".routeType").val();
		    loanObject.Interest = $(this).find(".interest").val().replace('%', ''); // remove char %
		    loanObject.Indexation = $(this).attr("inflation") == "1" ? "true" : "false";
		    // loanObject.Indexation = $(this).attr("inflation");
		    loanObject.Time = $(this).find(".recycleTime").val();
		    loanObject.ReturnSum = $(this).find(".returnSum").val();
		    loanObject.StartMonth = $(this).find(".start-month").val();
		    loanObject.StartYear = $(this).find(".start-year").val();
		    loansList.push(loanObject);
		});

		this.data.RecycleCheck.RecycleLoans = loansList;
	},
	//קיום אישור עקרוני
	phase4: function() {

		this.data.Banks.length = 0;

		var allBanks = $(".checkboxesBanks").find("input[type=checkbox]");

		var banksList = [];
		for (var i = 0; i < allBanks.length; i++) {
			if ($(".checkboxesBanks").find(allBanks[i]).is(':checked'))

				if ($(".checkboxesBanks").find(allBanks[i]).attr("id") == "bank-other") { // CURRENTLY RETURNS 666

				    var bankid = 666;
				    var bankname = 'other';

				    //var bankid = $.ajax({
					//	url: "/order/AddBank",
					//	type: "POST",
					//	contentType: 'application/json; charset=utf-8',
					//	data: JSON.stringify({ bankName: $("#bank-other-name").val() }),

					//	success: function (data) {
					//		if (data.result == true) {
								
					//		}
					//		else {
								
					//		}
					//	}
					//});

				    banksList.push({ BankID: bankid, BankName: bankname });
				}
				else {
					banksList.push({ BankID: $(".checkboxesBanks").find(allBanks[i]).val(), BankName: $(".checkboxesBanks").find(allBanks[i]).attr("id") });
				}
		}

		var Mainvalue = $('input[name="agree-main-account"]:checked').val() == "on" ? $("#agree-main-account-bank").val() : "null";
		var Secondaryvalue = $('input[name="agree-secondary-account"]:checked').val() == "on" ? $("#agree-secondary-account-bank").val() : "null";

		this.data.Banks = {
			BanksList: banksList,
			Accounts: { Main: Mainvalue, Secondary: Secondaryvalue }
		};		
	},
	//הצעות מחיר בנקים למשכנתאות
	phase5: function () {

	    


		this.data.Offers.length = 0;

		this.data.Offers = { HasOffers: $('input[name="has-offers"]:checked').val() == "1" ? "true" : "false"};
		
		if ($('input[name="has-offers"]:checked').val() == "1") {

			var allBidsBanks = $("#banksContainer").find(".table-after-checkbox");
			var bidsList = [], bankName, allBids;

			

			$('#banksContainer .active-offer .bidTr').each(function () {

				var BankId = $(this).closest(".active-offer").find(".bankName").val();

				var bidObject = {};

				bidObject.Sum = $(this).find(".bidSum").val();
				bidObject.Type = $(this).find(".bidType").val();

				var interest = $(this).find(".bankoffers-interest").val().substring(0, $(this).find(".bankoffers-interest").val().length - 1);
				bidObject.Interest = interest; // remove last char %

				bidObject.Indexation = $(this).attr('inflation') == "1" ? "true" : "false";
				bidObject.Time = $(this).find(".bidTime").val();
				bidObject.ReturnSum = $(this).find(".returnSum").val();
				bidObject.BankId = BankId;

				bidsList.push(bidObject);
				
			});			

			this.data.Offers.OffersList = bidsList;
		}
		
	},
	//התאמות והעדפות אישיות
	phase6: function () {

		this.data.Personal = {
			planningTime: $('input[name="planning"]:checked').val(),
			stability: $('input[name="stability"]:checked').val(),
			changes: $('input[name="changes"]:checked').val() == "1" ? "true" : "false"
		};
	
		if ($('input[name="changes"]:checked').val() == "1") {
			this.data.Personal.changesType = $('input[name="changes-options"]:checked').val();
			
			if ($('input[name="changes-options"]:checked').val() == "monthlyReturn") {
				this.data.Personal.monthlyReturnSum = $("#monthlyReturnSum").val();
				this.data.Personal.monthlyReturnTime = $("#monthlyReturnTime").val();
			}
			else
				this.data.Personal.fullOutTime = $("#fullOutTime").val();
		}

		

	},
	//סיכום הזמנה
	phase7: function (label, toClose) {
		
		if (toClose == "1") {
			accordionOpenItem($('.item-summary'));
		}

		//$("#ODlabel").html(label);
		//$("#ODdealType").html(Orderobj.data.DealType.Type); 
		$("#ODpropertyValue").html(Orderobj.data.LoanDetails.PropertyValue);

		$("#ODloanSum").html(Orderobj.data.LoanDetails.LoanDesire);

		$("#ODwantedReturn").html(Orderobj.data.LoanDetails.WantedReturn);

		$("#ODnetoSum").html(Orderobj.data.Loaners.NetoSum);

		if (Orderobj.data.Loaners.IsDebts == "true"){
			$("#ODisDebt").html("יש"); 
		}
		else {
			$("#ODisDebt").html("אין"); 
		}

		// loanprecent start
		 function GetLoanPrecente() {
			if (Orderobj.data.DealType.Type != 3) // TODO SHOULD THIS REMAIN HARDCODED???
				return  parseInt(parseInt(Orderobj.data.LoanDetails.LoanDesire) * 100.0 / parseInt(Orderobj.data.LoanDetails.PropertyValue));
			else
				return   parseInt(parseInt(Orderobj.data.LoanDetails.LoanLeft) * 100.0 / parseInt(Orderobj.data.LoanDetails.PropertyValue));
		 }

		 var loanPrecent = GetLoanPrecente();
				
		 if (loanPrecent >= 60) {
		 	if (loanPrecent >= 70) {
		 		$("#ODloanPercent").html('<span style="color:red;font-weight:bold">' + loanPrecent + '%</span>');
		 	}
		 	$("#ODloanPercent").html('<span style="color:orange;">' + loanPrecent + '%</span>');
		 }
		 else
		 	$("#ODloanPercent").html(loanPrecent + "%");
		// loanprecent end

		if (Orderobj.data.Loaners.IsRelease == "true") {
			$("#ODisRelease").html("יש");
		}
		else {
			$("#ODisRelease").html("אין");
		}

	    // update the fixed saving as well
		if (Orderobj.data.Loaners.IsSavings == "true") {
		    $("#ODisSavings").html("יש");
		}
		else {
		    $("#ODisSavings").html("אין");
		}

		// returnprecent start

		var returnPrecent = parseInt(parseInt(Orderobj.data.LoanDetails.WantedReturn) * 100.0 / parseInt(Orderobj.data.Loaners.NetoSum));
		
		if (returnPrecent >= 60) {
			if (returnPrecent >= 70) {
				$("#ODreturnPercent").html('<span style="color:red;font-weight:bold">' + getNamePval("loanPercent") + '%</span>');
			}
			else {
				$("#ODreturnPercent").html('<span style="color:orange;">' + getNamePval("loanPercent") + '%</span>');
			}
		}
		else {
			$("#ODreturnPercent").html(returnPrecent + "%");
		}
		//returnprecent end

		var banksList = "";
		
		for (var i = 0; i < Orderobj.data.Banks.BanksList.length; i++) {
			if (Orderobj.data.Banks.length == 1) {
				banksList = Orderobj.data.Banks.BanksList[i].BankName;
			}
			else {
				banksList += Orderobj.data.Banks.BanksList[i].BankName + ",";
			}
		}
		$("#ODbanksAuth").html(banksList.substring(0, banksList.length - 1));

		if (Orderobj.data.Offers.HasOffers == "true") {
		    $('#ODbanksOffers').html("יש");
		}
		else {
		    $('#ODbanksOffers').html("אין");
		}

		if (Orderobj.data.Personal.planningTime == "short") {
			$("#ODplanning").html("זמן קצר");
		}
		
		if (Orderobj.data.Personal.planningTime == "medium") {
			$("#ODplanning").html("זמן בינוני");
		}
		else {
			$("#ODplanning").html("זמן ארוך");
		}
		

		if (Orderobj.data.Personal.stability == "danger")
			$("#ODstability").html( "החזר תנודתי ונזילות גבוהה");
		else
			$("#ODstability").html("החזר יציב ונזילות נמוכה");

		if (Orderobj.data.Personal.changes == "false") {
			$("#ODchanges").html("לא צפויים שינויים");
		}
		else {
			if (Orderobj.data.Personal.changesType == "fullOut")
				$("#ODchanges").html("צפוי סילוק ההלוואה תוך " + Orderobj.data.Personal.fullOutTime + " שנים");
			else
				$("#ODchanges").html(" צפוי החזר חודשי של " + numberWithCommas(Orderobj.data.Personal.monthlyReturnSum) + ' ש"ח בתוך כ-' + Orderobj.data.Personal.monthlyReturnTime + " שנים ");
		}
		
	},
	GetLabel: function () {
		$.ajax({
			url: "/order/GetOrderLabel",
			type: "POST",
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify({ userId: Orderobj.data.Userid, dealType: Orderobj.data.DealType.Type }),

			success: function (data) {
				if (data.result == true) {
					var toclose = "1";
					$("#ODlabel").html(data.Label);
					$("#ODdealType").html(data.dealName);
					Orderobj.phase7(data.label, toclose);
				}
				else {
					ShowMessages("שליחת הנתונים נכשלה. אנא נסה שנית במועד מאוחר יותר");
				}
			}
		});
	},
	submit: function () {
	    trackEvent("newOrderView_submitButton_click");

		// check if this is updating the order
		if ($("#ODlabel").html() != "") {
			this.data.Label = $("#ODlabel").html();
		}

		//$("#change-details-button").hide();
		$("#last-buttons-div").hide();
		$(".ShowGif").show();

		var finalData = this.data;

		openPopup('calculate', true, function () {
		    $.ajax({
		        url: "/order/GetOrder",
		        type: "POST",
		        contentType: 'application/json; charset=utf-8',
		        data: JSON.stringify({ Data: finalData }),
		        success: function (data) {
		            trackEvent("newOrderView_completedPopup_view");

		            if (data.result == true) {
		                var toclose = "0";
		                Orderobj.phase7(data.label, toclose);
		                $('#order-end').addClass('ready');
		                $("#submitButton").show();
		                $("#waiting").hide(200);
		                $('#ready').show();
		                CANLEAVE = true;

		                setTimeout(function () {
		                    window.location.href = "/personal/profit";
		                }, 5000);

		            }
		            else {
		                alert(data.message);
		                ShowMessages("שליחת הנתונים נכשלה. אנא נסה שנית במועד מאוחר יותר");
		                $("#submitButton").show();
		                $(".ShowGif").hide();
		            }
		        }
		    });
		});
		

		return false;
	}
}