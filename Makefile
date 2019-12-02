up:
	sudo docker-compose up -d
	nohup sudo docker exec API npm run --prefix /usr/app/ watch > output.log &
	@echo "API server is running!"
	sudo docker exec quality service cron start

down:
	sudo docker-compose down

restart: down up
