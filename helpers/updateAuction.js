const updateAuction = {

  status: function(auction) {
    let currentDate = new Date();
    let expirationDate = auction.expirationDate;
    let status = auction.status;
    console.log(currentDate);
    console.log(expirationDate);

    if(currentDate>=expirationDate){
      status = "closed";
    }
  }

};

module.exports = updateAuction;
