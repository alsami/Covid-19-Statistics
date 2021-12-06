#!/usr/bin/env bash
echo removing existing prod-config
export path='./projects/environments/environment.prod.ts'

rm ${path}

echo writing new environment file

echo "export const environment = {
    production: true,
    apiUrl: '${apiUrl}',
    mapsApiKey: '${mapsApiKey}',
    version : '${TAG}'
};" > ${path}
