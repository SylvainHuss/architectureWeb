all: up db

up:
	docker-compose up -d
	nohup docker exec API npm run --prefix /usr/app/ watch > ./server/output.log &
	@echo "API server is running!"
	docker exec quality service cron start

db:
	docker exec radioDB mongoimport --authenticationDatabase admin --mode merge -u root -p 123 -d radios -c radios --file ./base_radios.json
	docker exec userDB mongoimport --authenticationDatabase admin --mode merge -u root -p 123 -d users -c users --file ./base_users.json

down:
	docker-compose down

restart: down up

cron_reload:
	docker cp ./Dockerfiles/crontab quality:/var/spool/cron/crontabs/root
