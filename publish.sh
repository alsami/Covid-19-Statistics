#!/bin/bash
function build_app() {
    echo build application in production mode, this might take a while
    ng build --prod --output-hashing bundles
    return ${?}
}

function zip_files() {
  cd ./dist/covid19-statistics/
  zip -r ../../${1} *
  cd ../../
  return ${?}
}

function authenticate() {
    echo authenticating with service-principal
    az login --service-principal -u ${SERVICE_PRINCIPAL_USER} -p ${SERVICE_PRINCIPAL_PASSWORD} --tenant ${SERVICE_PRINCIPAL_TENANT}
    return ${?}
}

upload_zip() {
  echo uploading file
  az storage blob upload --connection-string ${STORAGE_CONNECTION} --container-name versions --file ${1} --name ${1}
  return ${?}
}

function invoke() {
  az iot hub invoke-device-method -n ${IOT_HUB_NAME} -d ${IOT_DEVICE_NAME} --mn ${IOT_DEVICE_METHOD_NAME} --mp '{ "tag": "'${TRAVIS_TAG}'" }' --to 60
}

build_app
file_name=${TRAVIS_TAG}.zip
zip_files ${file_name}
upload_zip ${file_name}
authenticate
invoke
exit ${?}


