sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel"
], (Controller, History, JSONModel) => {
    "use strict";

    return Controller.extend("trainingmodule.controller.View2", {

       onBackPress : function()
       {
          const oHistory = History.getInstance();
          const sPreviousHash = oHistory.getPreviousHash();

          if(sPreviousHash !==undefined)
          {
            window.history.go(-1);
          }
          else
          {
            this.getOwnerComponent().getRouter().navTo("RouteView1");
          }
       },


       onInit : function()
       {
          this.getOwnerComponent().getRouter().getRoute("RouteView2").attachPatternMatched(this.onRouteMatched, this);
       },

       onRouteMatched : function(oEvent)
       {
        console.log("Route Matched");
        const productID = oEvent.getParameter("arguments").ID;
        const rowData = this.getOwnerComponent().getModel("jsonM").getData();

        const oModel = new JSONModel();
        oModel.setProperty("/details", rowData);
        this.getView().setModel(oModel, "oModel");
       }
    });
});