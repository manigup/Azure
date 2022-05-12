jQuery.sap.declare("shiv.cp.top5distributor.Common");
shiv.cp.top5distributor.Common = {
	displayDate: function(oDate) {
		return oDate;
	},

	onNavBack: function(e) {
		if (sap.ui.Device.system.phone) {
			var oHistory = sap.ui.core.routing.History.getInstance();
			var sPreviousHash = oHistory.iHistoryPosition;
			window.history.go(-sPreviousHash);
		} else {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo('COMaster');
		}
	},

	formatDate: function(oDate) {
		var date = new Date(oDate);
		oDate = date.toLocaleDateString();
		return oDate;
	},

	formatAddress: function(sStreet, sCity, sState, sCountry) {
		var sAddress = "";
		if (sStreet !== "") {
			sAddress = sAddress + sStreet + ",";
		}
		if (sCity !== "") {
			sAddress = sAddress + sCity + ",";
		}
		if (sState !== "") {
			sAddress = sAddress + sState + ",";
		}
		if (sCountry !== "") {
			sAddress = sAddress + sCountry;
		}
		return sAddress;
	},
	
	formatBE: function(sBENUM, sBENAM){
	 var sText = sBENAM + "(" + sBENUM+ ")";	
	 return sText;
	}

};