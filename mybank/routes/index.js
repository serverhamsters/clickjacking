var express = require('express');
var router = express.Router();

let previousTransactions = [
  {receiver: "fast food", amount: 15}
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    "title": 'Welcome to your secure banking app',
    "transactions" : previousTransactions
  });
});

router.post('/', function(req, res, next) {
  previousTransactions.push({
    receiver: req.body.receiver, 
    amount: req.body.amount
  });
  res.render('index', { 
    "title": 'Welcome to your secure banking app',
    "transactions" : previousTransactions
  });
});

module.exports = router;
