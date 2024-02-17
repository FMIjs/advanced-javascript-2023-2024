const { Router } = require('express');

const router = Router();

router.get('/', (req, res, next) => {
  //...
});
router.get('/:userId', (req, res, next) => {
  //...
});

module.exports = router;