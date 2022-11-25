const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeEffectSchema = new Schema({
     location : {
          type : String,
          required : true
     },
     alias : {
          type : String,
          required : true
     },
     prizes : {
          type : Array,
     }

});

module.exports = mongoose.model("PlaceEffect", placeEffectSchema);