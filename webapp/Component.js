sap.ui.define([
    "sap/ui/core/UIComponent",
    "trainingmodule/model/models",
    "sap/ui/model/json/JSONModel"
], (UIComponent, models, JSONModel) => {
    "use strict";

    return UIComponent.extend("trainingmodule.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            //creation of json model
            const sharedModel = new JSONModel();
            //setting of json model globally
            this.setModel(sharedModel, "jsonM");

            // to set a json model on a view
            // this.getView().setModel(sharedModel, "aliasName");

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
        }
    });
});