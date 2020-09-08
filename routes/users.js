const express = require('express');
const router = express.Router();
const slack = require('../public/incoming_slack')
router.get('/', function(req, res, next) {
  conn.query('select * from forb_wordlist', function (err, results) {
    if(err) res.end("error");
    res.send(results);
  });
});

module.exports = router;
