touch .env
containers=$(docker stack ps --format '{{.Name}}' teststack)

for c in $containers
do
    if [[ $c == *"API"* ]]; then
        echo "API_NAME=$c" >> .env
    fi
    if [[ $c == *"logDB"* ]]; then
        echo "LOG_NAME=$c" >> .env
    fi
    if [[ $c == *"radioDB"* ]]; then
        echo "RADIO_NAME=$c" >> .env
    fi
    if [[ $c == *"userDB"* ]]; then
        echo "USER_NAME=$c" >> .env
    fi
done