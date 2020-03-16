#!/usr/bin/env bash
echo build application in production mode, this might take a while

ng build --prod --output-hashing bundles --aot

echo done building client, clearing container now

az storage blob delete-batch --source ${STORAGE} --account-name ${ACCOUNT_NAME} --account-key ${ACCOUNT_KEY}

echo publishing web-content

az storage blob upload-batch --source ./dist/** --destination ${STORAGE} --account-name ${ACCOUNT_NAME} --account-key ${ACCOUNT_KEY}
