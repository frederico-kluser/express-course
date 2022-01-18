const express = require('express');
const router = express.Router({ mergeParams: true });
const fs = require('fs');

const profileHTML = fs.readFileSync(`${__dirname}/../template/profile.html`, 'utf8');

router.get('/profile/:name', (req, res, next) => {
  res.status(200).end(profileHTML.replace('$name', req.params.name));
});

module.exports = router;