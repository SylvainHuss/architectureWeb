#!/bin/bash

docker stack deploy --compose-file docker-swarm.yml teststack
sleep 2
containers=$(docker ps --format '{{.Names}}')
for c in $containers
do
    if [[ $c == *"API"* ]]; then
        api_name=$c
    fi
    if [[ $c == *"quality"* ]]; then
        quality_name=$c
    fi
done

nohup docker exec $api_name npm run --prefix /usr/app/ watch > ./server/output.log &
echo "API server is running!"
docker exec $quality_name service cron start