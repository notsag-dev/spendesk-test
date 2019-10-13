# spendesk-test
## Introduction
This is my implementation for the coding test at Spendesk.

## Usage
### Install
```npm install && npm run migrate```

### Run
```npm start```

The API should be running at http://localhost:8080. You can try getting http://localhost:8080/ping to verify the server is up.

### Run tests
```npm run test```

## API endpoints
Note: All the endpoints require *user-id* and *company-id* to be passed as HTTP headers (any positive integer should work). Otherwise it will respond with a 401 error.

```POST /wallet/create```
+ Description: Create a new wallet.
+ Body parameters:
    + currency: Currency of the wallet. It can be *USD*, *EUR* or *GBP*.
    + master: Boolean value to indicate if the wallet is a master wallet. This is taken into consideration just if header *company-id* is 1.

```GET /wallet/list```
+ Description: List all the wallets associated to the user's company. 

```POST /card/create```
+ Description: Create a new card.
+ Body parameters:
    + walletId: Id of the wallet this card is associated to.

```GET /card/list```
+ Description: List user's cards.

```POST /card/:cardId/load```
+ Description: Load money to card from its associated wallet.
+ Url parameters:
    + cardId: Id of the card to which money will be loaded.
+ Body parameters:
    + amount: Amount to load to card.

```POST /card/:cardId/unload```
+ Description: Unload money from card to its associated wallet.
+ Url parameters:
    + cardId: Id of the card to which money will be loaded.
+ Body parameters:
    + amount: Amount to unload from card.

```POST /card/:cardId/block```
+ Description: Block card.
+ Url parameters:
    + cardId: Id of the card to be blocked.

```POST /card/:cardId/unblock```
+ Description: Unblock card.
+ Url parameters:
    + cardId: Id of the card to be unblocked.

```POST /transfer```
+ Description: Transfer money between wallets/cards.
+ Body parameters:
    + idFrom: Id of origin entity. The entity can be a either card or a wallet.
    + typeFrom: Type of origin entity. It can be *wallet* or *card*.
    + idTarget: Id of target entity. The entity can be a card or a wallet.
    + typeTarget: Type of target entity. It can be *wallet* or *card*.
    + amount: Amount of money to transfer.

