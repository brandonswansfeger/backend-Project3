// require dependencies
const mongoose = require('mongoose');
// set up shortcut variable
const Schema = mongoose.Schema;
// create the schema
const cardListSchema = new Schema({
    firstName: { type : String }, 
    lastName: { type: String },
    nameSuffix: { type: String }, 
    cellPhone: { type: String },
    email: { type: String },
    organization: { type: String }, 
    title: { type: String },
    url: { type: String },
    workPhone: { type: String },
    note: { type: String },
    role: { type: String , required: true },
     vCardoutput: { type: String },
   
}, { timestamps: true });

// compile the schema into a model

// export the model so we can access it somewhere else
const cardList = mongoose.model("cardList", cardListSchema)

module.exports = cardList;