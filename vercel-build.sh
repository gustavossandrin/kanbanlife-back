#!/bin/bash
set -e

echo "Instalando dependências..."
yarn install --frozen-lockfile

echo "Gerando cliente do Prisma..."
yarn prisma generate

echo "Aplicando migrações do Prisma..."
yarn prisma migrate deploy

echo "Construindo aplicação NestJS..."
yarn build


echo "Deploy concluído com sucesso!"
