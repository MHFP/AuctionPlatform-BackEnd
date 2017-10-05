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
    expirationDate: req.body.expirationDate
  });

  newAuction.save( (err) => {
    if (err) { return res.status(500).json(err); }

    return res.status(200).json(newAuction);
  });
});


module.exports = router;
