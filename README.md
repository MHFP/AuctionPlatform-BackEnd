
# Models

## User

- id
- name
- email

## Auction

- name
- ownerId
- date
- status:
- bids: [{
    date:
    amount:
    bidderId:
  }]
- winner: {
  winnerId:
  amount:
}



# API

## GET /auction/
## GET /me/auctions/
## GET /me/bids/
## GET /auction/:id
## POST /auction
## PUT /auction/:id
# AuctionPlatform-BackEnd
