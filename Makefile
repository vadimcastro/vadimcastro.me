.PHONY: dev prod down clean migrate migrate-create

dev:
	cd docker && docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

prod:
	cd docker && docker-compose up --build

down:
	cd docker && docker-compose down

clean:
	cd docker && docker-compose down -v
	rm -rf frontend/.next
	rm -rf frontend/node_modules

migrate:
	docker-compose exec api alembic upgrade head

migrate-create:
	docker-compose exec api alembic revision --autogenerate -m "$(name)"