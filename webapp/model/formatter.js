sap.ui.define([
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/format/NumberFormat"
], (DateFormat, NumberFormat) => {
    "use strict";

    return {


        formatDate: function (date) {
            if (!date)
                return "";

            // ensure we have a date object (oData may give a string or a Date)
            const oDate = date instanceof Date ? date : new Date(date);

            // creation of date format dd-MM-yyyy
            const oDateFormat = DateFormat.getDateInstance(
                {
                    pattern: "dd-MM-yyyy"
                }
            );
            return oDateFormat.format(date);
        },

        formatPrice : function(price)
        {
            if(!price)
                return "";

            const oNumberFormat = NumberFormat.getFloatInstance(
                {
                    minFractionDigits : 2,
                    maxFractionDigits : 2
                }
            );

            return "$" + oNumberFormat.format(price);

        }

    }
});