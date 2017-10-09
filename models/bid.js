const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bidSchema = new Schema({
  bidderId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  auctionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Auction'},
  date: Date,
  bidPrice: Number
});

const Bid = mongoose.model('Bid', bidSchema);

module.exports = {
  Bid
};
