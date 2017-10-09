const express = require('express');
const router = express.Router();

const updateAuction = require('../helpers/updateAuction');
const response = require('../helpers/response');
const Auction = require('../models/auction').Auction;
const Bid = require('../models/bid').Bid;



router.get('/', (req, res, next) => {
  Auction
    .find({})
    .populate('bids', 'date')
    .exec( (err, auctions) => {
      if (err) {
        return next(res);
      }
      let auctionData = auctions.map((auction) => new Auction(auction));

      let update = auctionData.map(function(auction){
        let expirationDate = auction.expirationDate;
        let currentDate = new Date(expirationDate);
        console.log("this is current:" + currentDate);
        console.log("this is expiration:" + expirationDate);

        if(currentDate >= expirationDate){
          auction.status = "closed";
          return auction;
        } else{
          return auction;
        }
      });
      return response.data(req, res, update);
    });
});


router.get('/:id', (req, res, next) => {
  Auction.findById(req.params.id, (err, auction) => {
    if (err){
      return res.status(500).json(err);
    }
    if (!auction){
      return res.status(404).json(new Error("404"));
    }
    return res.json(auction);
  });
});


router.post('/', (req, res, next) => {
  const newAuction = new Auction({
    name: req.body.name,
    quantity: req.body.quantity,
    expirationDate: req.body.expirationDate,
    status: req.body.status
  });

  newAuction.save( (err) => {
    if (err) { return res.status(500).json(err); }

    return res.status(200).json(newAuction);
  });
});


router.post('/:id', (req, res, next) => {
  const newBid = new Bid({
    name: req.body.name,
    auctionId: req.body.auctionId,
    date: req.body.date,
    bidPrice: req.body.bidPrice
  });

  newBid.save( (err) => {
    if (err) {
      return res.status(500).json(err);
    }

  Auction.findById(newBid.auctionId, (err, auction) => {
    auction.bids.push(newBid);

    auction.save( (err) => {
      if (err) {
        return res.status(500).json(err);
      }
    });

      return res.status(200).json(newBid);
    });
  });
});



module.exports = router;
