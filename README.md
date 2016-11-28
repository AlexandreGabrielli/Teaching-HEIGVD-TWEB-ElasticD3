# Teaching-HEIGVD-TWEB-ElasticD3
Playing with Elasticsearch and d3.js

## Phase 1: populate Elasticsearch with git log data

1. Start the Docker topology, by running `docker-compose up` in the `topology` directory.
2. Elasticsearch should be listening on port 9200 and Kibana on port 5601.
2. Clone any git repository under the `sut-repos` directory (in this example, I have cloned the `spring-social` repo)
3. Run `node worker-gitlog/app.js sut-repos/spring-social | curl -s -XPOST 192.168.99.100:9200/_bulk --data-binary @-` (note: you might need to adapt the IP address of your Docker host; in my case I have docker-machine running on 192.168.99.100)
4. At this stage, you should have data in Elasticsearch and be ready to explore with Kibana.