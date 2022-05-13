sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"shiv/cp/top5distributor/model/models",
	"sap/m/routing/RouteMatchedHandler",
	"shiv/cp/top5distributor/Common"
], function (UIComponent, Device, models, RouteMatchedHandler, Common) {
	"use strict";

	return UIComponent.extend("shiv.cp.top5distributor.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			var param = {
				"json": true,
				loadMetadataAsync: true
			};
			// ODataModel
			var appMeta = this.getMetadata().getManifestEntry("sap.app");
			var sServiceUrl = appMeta.dataSources["connectedpharmacy_t.xsodata"].uri;

			var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, param);
			oModel.setDefaultBindingMode("TwoWay");
			this.setModel(oModel);
			sap.ui.getCore().setModel(oModel, "oDataModel");
			this._router = this.getRouter();
			// initialize the router
			this._routeHandler = new RouteMatchedHandler(this._router);
			this._router.initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});