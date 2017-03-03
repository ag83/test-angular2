const mongoose = require('mongoose');
const Provider =  require('./provider');
const Manager =  require('./manager');
const Schema = mongoose.Schema;

//order
const orderSchema = new Schema({
  managerName: {type: Schema.Types.ObjectId, ref: 'Manager'},
  orderType: String,
  clientName: String,
  provider: {type: Schema.Types.ObjectId, ref: 'Provider'},
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
  orderId: String
});


module.exports = mongoose.model('Order', orderSchema);
