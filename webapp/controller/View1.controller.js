sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "trainingmodule/model/formatter",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox"
], (Controller, MessageToast, Filter, FilterOperator, formatter,Fragment, MessageBox) => {
    "use strict";

    return Controller.extend("trainingmodule.controller.View1", {

        formatter : formatter ,

        onItemPress : function(oEvent)
        {
            // to fetch the listitem parameter
            const oItem = oEvent.getParameter("listItem");

            // to get the location of the row which has been clicked
            const oContext = oItem.getBindingContext();

            //to get the complete object(Data) of that row
            const oObject = oContext.getObject();

            //setting the data inside the json model created in component.js
            this.getOwnerComponent().getModel("jsonM").setData(oObject);


            const productID = oContext.getProperty("ID");

            this.getOwnerComponent().getRouter().navTo("RouteView2",
                {
                    ID : productID
                }
            );

          // mandatory params - /{xyz}
          // option params - /:xyz:
        },


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
        },

        onAddProduct : function()
        {
           // lets name our fragment as pAddDialog

           //if the fragment doesnt exist
           if(!this.pAddDialog)
           {
            // This will load the fragment and it will be store in cache
            this.pAddDialog = Fragment.load({
                id: this.getView().getId(),  // this is used as a prefix for all fields inside the fragment to avoid collisions
                name: "trainingmodule.view.AddProduct", // path of fragment
                controller : this // to provide which controller will be used as event handlers for the fragment
            }).then(function(oDialog) // this runs when the fragment loading is finished
            {
                this.getView().addDependent(oDialog); //1. you can inherit view's models 2. it will get destroyed once the view is destroyed
                return oDialog;
            }.bind(this)) // to use the 'this' keyword which points to the controller
           }


           this.pAddDialog.then(function(oDialog)
        {
            oDialog.open();
        });
        },

        onCreateProduct : function()
        {
            //first fetch the mandatory fields ( required true fields)
            const globelID = this.getView().getId();
            const sId = Fragment.byId(globelID, "inputID").getValue();
            const sName = Fragment.byId(globelID, "inputName").getValue();
            const sPrice = Fragment.byId(globelID, "inputPrice").getValue();

            //basic validation
            if(!sId || !sName || !sPrice)
            {
                MessageBox.error("ID, Name and Price are required");
                return;
            }


            const oNewProduct = {
                __metadata : {type: "ODataDemo.Product"},
                ID : parseInt(sId,10),
                Name : sName,
                Price : parseFloat(sPrice),
                Description : Fragment.byId(globelID, "inputDescription").getValue(),
                ReleaseDate : Fragment.byId(globelID, "inputReleaseDate").getDateValue(),
                Rating : Fragment.byId(globelID, "idRating").getValue()
            }


            const oDataModel = this.getView().getModel();
            oDataModel.create("/Products", oNewProduct,{
                success : function()
                {
                    MessageToast.show("Product Created");
                },
                error : function(error)
                {
                    MessageToast.show("Product creation failed. The error is "+error);
                }
            })
        }
        
    });
});