sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], (Controller, History) => {
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
       }
    });
});