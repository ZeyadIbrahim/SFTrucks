var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise');

/* get map data. */
router.get('/', function(req, res, next){

  structureData = function(data) {
    var cols = [
      'sid', 'id', 'position', 'created_at', 'created_meta', 'updated_at',
      'updated_meta', 'meta', 'DayOrder', 'DayOfWeekStr', 'starttime',
      'endtime', 'permit', 'PermitLocation', 'locationdesc', 'optionaltext',
      'locationid', 'scheduleid', 'start24', 'end24', 'CNN', 'Addr_Date_Create',
      'Addr_Date_Modified', 'block', 'lot', 'ColdTruck', 'Applicant', 'X', 'Y',
      'Latitude', 'Longitude', 'Location'
    ];
    var structured = [];

    for (var i = 0; i < data.data.length; i++) {
      structured[i] = {};
      for (var j = 0; j < cols.length; j++) {
        structured[i][cols[j]] = data.data[i][j];
      }
    }
    return structured;
  }

  var options = {
    uri: 'https://data.sfgov.org/api/views/jjew-r69b/rows.json',
    qs: {},
    headers: { 'User-Agent': 'Request-Promise' },
    json: true // Automatically parses the JSON string in the response
  };

  rp(options)
    .then(function (json) {

      res.apiData = structureData(json);
      next();
    })
    .catch(function (err) {
      res.send('Error');
    });
});

/* Render home page. */
router.get('/', function(req, res) {
  res.render('index', { apiData: res.apiData });
});


module.exports = router;
