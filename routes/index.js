var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Dionysus' });
});

router.post('/', (req, res) => {
  res.send(req.body);
});

module.exports = router;
