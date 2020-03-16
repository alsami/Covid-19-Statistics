#!/usr/bin/env bash
echo removing existing prod-config

rm ./src/environments/environment.prod.ts

echo writing new environment file

echo "export const environment = {
    production: true,
    apiUrl: ${1}
};" > src/environments/environment.prod.ts