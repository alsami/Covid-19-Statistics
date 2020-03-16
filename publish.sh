#!/usr/bin/env bash
echo build application in production mode, this might take a while

ng build --prod --output-hashing bundles --aot

echo done building client, clearing container now

az storage blob delete-batch --source ${1} --account-name ${2} --account-key ${3}

echo publishing web-content

az storage blob upload-batch --source ./dist/** --destination ${1} --account-name ${2} --account-key ${3}
