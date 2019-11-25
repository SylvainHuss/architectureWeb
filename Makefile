up:
	sudo docker-compose up -d
	nohup sudo docker exec API  npm run --prefix /usr/app/ start > output.log &
	@echo "API server is running!"

down:
	sudo docker-compose down

fedup:
	podman-compose up -d
	nohup podman exec API  npm run --prefix /usr/app/ start > output.log &
	@echo "API server is running!"

fedown:
	podman-compose down
