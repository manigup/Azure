sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/viz/ui5/data/FlattenedDataset",
	"sap/m/MessageBox"
], function (Controller, JSONModel, FlattenedDataset, MessageBox) {
	"use strict";

	return Controller.extend("shiv.cp.top5distributor.controller.Report", {

		onInit: function () {
			this.router = sap.ui.core.UIComponent.getRouterFor(this); // Router instance
			this.router.attachRoutePatternMatched(this._handleRouteMatched, this);

			// this.oDataModel = sap.ui.getCore().getModel("oDataModel");

			// var oVizFrame = this.getView().byId("idVizFrame");
			// var oVizFrameHistory = this.getView().byId("idVizFrameHistory");
			// var oPopOver = this.getView().byId("idPopOver");
			// oPopOver.connect(oVizFrame.getVizUid());

			/*var oPopOverHistory = this.getView().byId("idPopOverHistory");
			oPopOverHistory.connect(oVizFrameHistory.getVizUid());*/

			// this.oSalesViewModel = new sap.ui.model.json.JSONModel();
			// this.getView().setModel(this.oSalesViewModel, "salesview");
		},

		_handleRouteMatched: function (oEvent) {
			if (oEvent.getParameter("name") !== "Report") {
				return;
			}
			// var sValue = "D";
			// this.onReadOdata(sValue);
		},

		onSelect: function (oEvent) {
			this.byId("idVizFrame").destroyDataset();
			this.byId("idVizFrame").setDataset(new FlattenedDataset({
				"dimensions": [{
					"name": "BE",
					"value": "{BENAM}"
				}],
				"measures": [{
					"name": "Sales Amount",
					"value": "{NetAmount}"
				}],
				data: {
					path: "/"
				}
			}));
			if (this.getView().byId("selRBGrpId").getSelectedIndex() === 0) {
				this.byId("idVizFrame").setModel(new JSONModel(this.getView().getModel("distributor").getData()));
				// this.onReadOdata("D");
			} else {
				this.byId("idVizFrame").setModel(new JSONModel(this.getView().getModel("sdistributor").getData()));
				// this.onReadOdata("SD");
			}
		},

		onReadOdata: function (sValue) {
			var thisInst = this;
			this.oDataModel.read("/SalesView?$select(Entity_Number, BENAM,Net_Amount)&$orderby=Net_Amount desc&$top=5&$filter=BETYP eq '" +
				sValue + "'", null, null, false,
				function (oData) {
					sap.ui.core.BusyIndicator.hide();
					thisInst.oSalesViewModel.setData(oData);
					thisInst.oSalesViewModel.refresh(true);
				});
		}
	});
});