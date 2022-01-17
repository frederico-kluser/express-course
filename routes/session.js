var express = require('express');
var router = express.Router({ mergeParams: true });

router.get('/', (req, res, next) => {
  res.status(200).send('');
});

router.get('/object', (req, res, next) => {
  const jsonSession = JSON.stringify(req.session);
  res.send(jsonSession);
})

router.get('/secret', (req, res, next) => {
  res.send(process.env.SESSION_SECRET);
})

module.exports = router;
