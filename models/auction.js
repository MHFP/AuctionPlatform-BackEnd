const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auctionSchema = new Schema({
  ownerId: String,
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity of items is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  status: String,
  bids: [{
      date: Date,
      price: Number,
      bidderId: String,
  }],
  winner: {
    winnerId: String,
    price: Number
  }
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = {
  Auction
};
