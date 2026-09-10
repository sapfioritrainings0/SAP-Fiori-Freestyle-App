sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "trainingmodule/model/formatter"
], (Controller, MessageToast, Filter, FilterOperator, formatter) => {
    "use strict";

    return Controller.extend("trainingmodule.controller.View1", {

        formatter : formatter ,
        // onInit() {
        //     console.log("on init called");
        // },

        // onBeforeRendering()
        // {
        //     console.log("on before called");
        // },

        // onAfterRendering : function()
        // {
        //     console.log("on after called");
        // },

        // onExit ()
        // {
        //     console.log("on exit called");
        // },

        // onAddButtonPress : function()
        // {
        //     MessageToast.show("Button pressed");
        // },

        // onSelectingRows : function()
        // {
        //     console.log("table row selected");
        // }, 

        // onItemPress : function()
        // {
        //     console.log("On Item Press");
        // },


        onSearchByName : function(oEvent) // captuing the event in the oEvent object
        {
            //fetch the user input
            const sQuery = oEvent.getParameter("query");

            // if fetching from an Input instead of SearchField
            // const sQuery = this.byId("idInput").getValue();

            //fetch the table as a UI element
            const oTable = this.byId("idProductsTable");

            //fetch the binding (data)
            const oBinding = oTable.getBinding("items");

            //create a filter using Filter Operator - Contains
            const oFilter = new Filter("Name", FilterOperator.Contains, sQuery);

            //pass the filter in the binding
            oBinding.filter([oFilter]);
        },

        onSearchByRating : function(oEvent)
        {
            //fetch the user input
            const sQuery = oEvent.getParameter("query");

            //fetch the table as a UI element
            const oTable = this.byId("idProductsTable");

            //fetch the binding (data)
            const oBinding = oTable.getBinding("items");

            //create a filter using Filter Operator - Equals
            const oFilter = new Filter("Rating", FilterOperator.EQ, sQuery);

            //pass the filter in the binding
            oBinding.filter([oFilter]);
        },

        handleReleaseDateChange : function(oEvent)
        {
            console.log(oEvent);
            // fetching start date
            const startDate = oEvent.getSource().getDateValue();

            //fetching the end date
            const endDate = oEvent.getSource().getSecondDateValue();
            
            //fetching the binding
            const oBinding = this.byId("idProductsTable").getBinding("items");

            if(startDate && endDate)
            {
                 const oFilter = new Filter("ReleaseDate", FilterOperator.BT, startDate, endDate);
                  oBinding.filter([oFilter]);
            }

        },



        creatingAnArray : function()
        {
            let aFilters = [];
            aFilters.push(oFilter1);
            aFilters.push(oFilter2);
            aFilters.push(oFilter3);
            
        },

        onNextScreen : function()
        {
            // const oComponent = this.getOwnerComponent();
            // const oRouter = oComponent.getRouter();
            // oRouter.navTo("RouteView2")


            this.getOwnerComponent().getRouter().navTo("RouteView2");
        }

        
    });
});