const express = require('express'); // eslint-disable-line
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  res.json({ item: res.locals.user });
});

module.exports = router;
