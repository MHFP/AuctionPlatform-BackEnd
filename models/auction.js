const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Bid   = require('./bid').Bid;
const express = require('express');
const router = express.Router();
const moment = require('moment');



const auctionSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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
  expirationDate: String,
  status: String,
  bids: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Bid'
  }],
  winner: {
    winnerId: String,
    price: Number
  }
});

auctionSchema.post('init', function(auction){
  let expirationDate = auction.expirationDate;
  let update = setInterval(function(){
    let now = moment.utc().format();
    if(now > expirationDate){
      auction.status = "closed";
      auction.save( (err) => {
        // if (err) { return res.status(500).json(err); }
        //
        // return res.status(200).json(auction);
      });
      clearInterval(update);
    }
  }, 1000);
  console.log("expires on: " + expirationDate + ", now: " + moment.utc().format());
});


// auctionSchema.post('init', function(auction){
//   let expirationDate = moment.parseZone(auction.expirationDate).format();
//   let update = setInterval(function(){
//     let now = moment.parseZone().local().format();
//     if(now > expirationDate){
//       auction.status = "closed";
//       auction.save( (err) => {
//         // if (err) { return res.status(500).json(err); }
//         //
//         // return res.status(200).json(auction);
//       });
//       clearInterval(update);
//     }
//   }, 1000);
//   console.log("expires on: " + expirationDate + ", now: " + moment.parseZone().local().format());
// });


const Auction = mongoose.model('Auction', auctionSchema);

module.exports = {
  Auction
};
