install-dep:
	sudo docker exec resto_backend bash -c "composer install" \
	sudo docker exec resto_frontend bash -c "npm install"

generate-key:
	sudo docker exec resto_backend bash -c "php artisan key:generate"

migrate:
	docker exec resto_backend bash -c "php artisan migrate"