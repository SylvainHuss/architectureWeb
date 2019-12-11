# Readme

## Dépendances

- `docker`
- `docker-compose`
- `make`

## Installation

```
git clone https://github.com/SylvainHuss/architectureWeb.git && cd architectureWeb/
make all
```

## Utilisation

- `localhost:3000/api`: l'adresse de l'API
- `localhost:8888/`: l'application

Si tout se passe bien, le site doit tourner et le menu pour choisir une radio doit être rempli.

## Swarm

- Pour le manager : `docker swarm init`
- Pour les workers : `docker swarm join --token xxx-x-xxx {ip adress}`
- Pour lancer le serveur : `make up`
`