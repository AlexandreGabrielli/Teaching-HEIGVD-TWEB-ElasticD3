var express = require('express');
var router = express.Router();

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'elasticsearch:9200',
  log: 'trace'
});


/* GET list of top 5 authors with number of commits */

router.get('/', function (req, res) {

  client.search({
    index: 'commits-*',
    type: 'commit',
    body: {
      "query": {
        /*
        "bool": {
          "must": [
            {
              "query_string": {
                "query": "*",
                "analyze_wildcard": true
              }
            },
            {
              "range": {
                "Author date": {
                  "gte": 1322403349190,
                  "lte": 1480256149190,
                  "format": "epoch_millis"
                }
              }
            }
          ],
          "must_not": []
        }
        */
      },
      "size": 0,
      "aggs": {
        "2": {
          "terms": {
            "field": "Author name.keyword",
            "size": 15,
            "order": {
              "_count": "desc"
            }
          }
        }
      }
    }
  }).then(function (body) {
    res.json(body.aggregations[2].buckets.map( b => ({author: b.key, commits: b.doc_count}) ));
    var hits = body.hits.hits;
    console.log(hits);
  }, function (error) {
    console.trace(error.message);
  });

});

module.exports = router;
