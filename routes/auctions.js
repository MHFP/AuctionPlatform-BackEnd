const express = require('express');
const router = express.Router();

const response = require('../helpers/response');
const Auction = require('../models/auction').Auction;

router.get('/', (req, res, next) => {

  Auction.find({}, (err, auctions) => {
    if (err) {
      return next(res);
    }
    let auctionData = auctions.map((auction) => new Auction(auction));
    return response.data(req, res, auctionData);
  });
});

// router.get('/', (req, res, next) => {
//
//   Task.find({}, (err, tasks) => {
//     if (err) {
//       return next(res);
//     }
//     let data = tasks.map((task) => new Task(task));
//     return response.data(req, res, data);
//   });
// });

module.exports = router;
