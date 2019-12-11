all: up db

install:
	docker exec API npm --prefix /usr/app/ install

up:
	./init.sh

db:
	docker exec radioDB mongoimport --authenticationDatabase admin --mode merge -u root -p 123 -d radios -c radios --file ./base_radios.json
	docker exec userDB mongoimport --authenticationDatabase admin --mode merge -u root -p 123 -d users -c users --file ./base_users.json

down:
	docker stack rm teststack

restart: down up

cron_reload:
	docker cp ./Dockerfiles/crontab quality:/var/spool/cron/crontabs/root
