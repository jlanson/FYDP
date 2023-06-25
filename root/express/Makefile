#!make
MAKEFLAGS += --silent
include .env
export $(shell sed 's/=.*//' .env)

run-local:
	npx nodemon app.js