const express = require('express');
const router = express.Router();

const response = require('../helpers/response');
const Auction = require('../models/auction').Auction;

router.get('/auction', (req, res, next) => {
  Auction.find({}, (err, auctions) => {
    if (err) { return res.json(err).status(500); }
    return res.json(auctions);
  });
});

module.exports = router;
