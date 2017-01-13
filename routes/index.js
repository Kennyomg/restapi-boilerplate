/*
 * API /v1/ router
 */
const express = require('express'); // eslint-disable-line
const router = express.Router({ mergeParams: true });

require('fs')
  .readdirSync(`${__dirname}/`)
  .forEach((file) => {
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
      const name = file.replace('.js', '');
      router.use(`/${name}`, require(`./${file}`));
    }
  });

/*
 * Test connection
 */
router.get('/ping', (req, res) => {
  res.json({ pong: '( ͡° ͜ʖ ͡°)' });
});

/*
 * services
 */
router.get('/', (req, res) => {
  res.json({
    note: `Example API v1 is still a work in progress.
Please keep up to date with the documentation and stay in contact with us to receive the latest updates.
For questions you can contact us at example@example.com`,
    docs: 'Currently unvailable',
    version: 'v1',
    methods: [],
    resources: {},
  });
});

module.exports = router;
