# Executables (local)
DOCKER_COMP = docker compose

# Docker containers
PHP_CONT = $(DOCKER_COMP) exec php

# Executables
PHP      = $(PHP_CONT) php
COMPOSER = $(PHP_CONT) composer
SYMFONY  = $(PHP) bin/console

# Misc
.DEFAULT_GOAL = help
.PHONY        : help build up start down logs sh composer vendor sf cc unit behat phpstan phpcsfixer bash db migration migrate

## —— 🎵 🐳 The Symfony Docker Makefile 🐳 🎵 ——————————————————————————————————
help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9\./_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

## —— Docker 🐳 ————————————————————————————————————————————————————————————————
build: ## Builds the Docker images
	@$(DOCKER_COMP) build --pull --no-cache

up: ## Start the docker hub in detached mode (no logs)
	@$(DOCKER_COMP) up --detach

start: build up ## Build and start the containers

down: ## Stop the docker hub
	@$(DOCKER_COMP) down --remove-orphans

logs: ## Show live logs
	@$(DOCKER_COMP) logs --tail=0 --follow

sh: ## Connect to the FrankenPHP container
	@$(PHP_CONT) sh

bash: ## Connect to the FrankenPHP container via bash so up and down arrows go to previous commands
	@$(PHP_CONT) bash

## —— Composer 🧙 ——————————————————————————————————————————————————————————————
composer: ## Run composer, pass the parameter "c=" to run a given command, example: make composer c='req symfony/orm-pack'
	@$(eval c ?=)
	@$(COMPOSER) $(c)

vendor: ## Install vendors according to the current composer.lock file
vendor: c=install --prefer-dist --no-dev --no-progress --no-scripts --no-interaction
vendor: composer

## —— Symfony 🎵 ———————————————————————————————————————————————————————————————
sf: ## List all Symfony commands or pass the parameter "c=" to run a given command, example: make sf c=about
	@$(eval c ?=)
	@$(SYMFONY) $(c)

cc: c=c:c ## Clear the cache
cc: sf

## —— Doctrine 🎵 ———————————————————————————————————————————————————————————————
db: ## Setup database
	@$(eval env ?= dev)
	@if [ "$(env)" = "prod" ]; then \
    	echo "ERROR: Cannot run destructive db operations in production environment"; \
    	exit 1; \
    fi
	@$(DOCKER_COMP) exec -e APP_ENV=$(env) php bin/console doctrine:database:drop --force --if-exists
	@$(DOCKER_COMP) exec -e APP_ENV=$(env) php bin/console doctrine:database:create
	@$(DOCKER_COMP) exec -e APP_ENV=$(env) php bin/console doctrine:migration:migrate --no-interaction
	@$(DOCKER_COMP) exec -e APP_ENV=$(env) php bin/console doctrine:fixtures:load --no-interaction

migration: ## Create doctrine migrations files
	@$(eval env ?= dev)
	@$(DOCKER_COMP) exec -e APP_ENV=$(env) php bin/console make:migration

migrate: ## Run doctrine migrations
	@$(eval env ?= dev)
	@$(DOCKER_COMP) exec -e APP_ENV=$(env) php bin/console doctrine:migration:migrate --no-interaction


## —— Tests 🐳 ————————————————————————————————————————————————————————————————
unit: ## Start tests with phpunit, pass the parameter "c=" to add options to phpunit, example: make test c="--group e2e --stop-on-failure"
	@$(eval c ?=)
	make db env=test
	@$(DOCKER_COMP) exec -e APP_ENV=test php bin/phpunit $(c)

behat: ## Behat
	@$(eval c ?=)
	make db env=test
	@$(DOCKER_COMP) exec -e APP_ENV=test php vendor/bin/behat $(c)

## —— Quality ——————————————————————————————————————————————————————————————
phpstan: ## Phpstan
	@$(DOCKER_COMP) exec -e APP_ENV=test php vendor/bin/phpstan --memory-limit=256M

phpcsfixer: ## phpcsfixer
	@$(DOCKER_COMP) exec -e APP_ENV=test -e PHP_CS_FIXER_IGNORE_ENV=true php vendor/bin/php-cs-fixer fix

## —— API ——————————————————————————————————————————————————————————————
lexik-generate-keys:
	@$(DOCKER_COMP) exec -e APP_ENV=test php bin/console lexik:jwt:generate-keypair
