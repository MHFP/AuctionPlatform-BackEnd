const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Bid   = require('./bid').Bid;


const auctionSchema = new Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity of items is required']
  },
  description: String,
  publishedDate: Date,
  expirationDate: {
    type: Date,
    required: [true, 'Date is required']
  },
  status: String,
  bids: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Bid'
  }],
  winner: {
    winnerId: String,
    price: Number
  }
});



auctionSchema.methods.asData = function() {
  return {
    id: this._id,
  };
};


const Auction = mongoose.model('Auction', auctionSchema);

module.exports = {
  Auction
};
