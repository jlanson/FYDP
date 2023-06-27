#!make
MAKEFLAGS += --silent
export $(shell sed 's/=.*//' .env)

run-local:
	npx nodemon app.js