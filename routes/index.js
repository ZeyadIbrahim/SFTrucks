var express = require('express');
var router = express.Router();

/* get map data. */
router.get('/', function(req, res, next){
  dummy = {
    "data": [{
      "type": "articles",
      "id": "1",
      "attributes": {
        "title": "JSON API paints my bikeshed!",
        "body": "The shortest article. Ever.",
        "created": "2015-05-22T14:56:29.000Z",
        "updated": "2015-05-22T14:56:28.000Z"
      },
      "relationships": {
        "author": {
          "data": {"id": "42", "type": "people"}
        }
      }
    },{
      "type": "articles",
      "id": "2",
      "attributes": {
        "title": "JSON API paints my bikeshed!",
        "body": "The shortest article. Ever.",
        "created": "2015-05-22T14:56:29.000Z",
        "updated": "2015-05-22T14:56:28.000Z"
      },
      "relationships": {
        "author": {
          "data": {"id": "42", "type": "people"}
        }
      }
    }],
    "included": [
      {
        "type": "people",
        "id": "42",
        "attributes": {
          "name": "John",
          "age": 80,
          "gender": "male"
        }
      }
    ]
  }
  res.apiData = dummy;
  next();
});

/* Render home page. */
router.get('/', function(req, res, next) {
  res.render('map', { apiData: res.apiData });
});


module.exports = router;
