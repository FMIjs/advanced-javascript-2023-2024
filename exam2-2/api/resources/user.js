const { Router } = require('express');
const https = require('https');

const router = Router();

router.get('/', (req, res, next) => {
  https.get('https://jsonplaceholder.typicode.com/users', (jsonPlaceholderResponse) => {
    // ...
    jsonPlaceholderResponse.on('data', () => { 
      // ...
    });
    jsonPlaceholderResponse.on('end', () => {
      // ...
    });
  })

});
router.get('/:id', (req, res, next) => {
  //...
});

module.exports = router;