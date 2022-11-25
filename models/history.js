const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const historySchema = new Schema({
     userId : {
          
     }

});

module.exports = mongoose.model("History", historySchema);
