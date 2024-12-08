.DEFAULT_GOAL := help
SHELL := /bin/bash

ENV ?= dev
M_NAME ?= unknown

ENV_FILE=.env.dev

ifeq ($(ENV), prod)
	ENV_FILE=.env.prod
endif

ifneq (,$(wildcard ./${ENV_FILE}))
    include ${ENV_FILE}
    export
endif

.PHONY: run-node-admin
run-node-admin:
	pnpm run -F admin dev

.PHONY: run-node-shop
run-node-shop:
	pnpm run -F shop dev

.PHONY: gen-migrate
gen-migrate:
ifeq ("${M_NAME}", "unknown")
	echo M_NAME is not set
else
	@cd prisma && prisma migrate dev --name ${M_NAME}
endif

.PHONY: apply-migrate
apply-migrate:
	@cd prisma && prisma migrate deploy

.PHONY: migrate-status
migrate-status:
	@cd prisma && prisma migrate status

.PHONY: prisma-studio
prisma-studio:
	@cd prisma && prisma studio

.PHONY: help
help:
	@echo help