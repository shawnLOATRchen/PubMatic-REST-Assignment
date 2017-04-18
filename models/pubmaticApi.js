const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create api schema
var PubMaticApiSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  price: { type: Number },
  datetimes: {
    updated: { type: Date, defalut: Date.now },
    lastExecuted: { type: Date, defalut: Date.now }
  },
  tags: [String]
});

var PubMaticApi = mongoose.model('PubMaticApi', PubMaticApiSchema);

module.exports = PubMaticApi;
