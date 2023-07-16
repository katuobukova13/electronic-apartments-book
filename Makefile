init:
	npm install
	composer install

env:
	cp .env.example .env

up:
	./vendor/bin/sail up -d

migrate:
	./vendor/bin/sail exec laravel.test php artisan migrate --seed

start:
	npm run dev

down:
	./vendor/bin/sail down

create-test-user:
	./vendor/bin/sail exec laravel.test php artisan create:user admin admin@test.com test

create-test-token:
	./vendor/bin/sail exec laravel.test php artisan create:user_token 1 token "*"
