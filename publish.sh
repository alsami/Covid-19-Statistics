#!/bin/bash
function zip_files() {
  cd ./dist/covid19-statistics/
  zip -r ../../${1} *
  cd ../../
  return ${?}
}

function upload_zip() {
  echo uploading file
  az storage blob upload --account-name "${STORAGE_ACCOUNT_NAME}" --account-key "${STORAGE_ACCOUNT_KEY}" --container-name versions --file ${1} --name ${1}
  return ${?}
}

function invoke() {
  az iot hub invoke-device-method -n ${IOT_HUB_NAME} -d ${IOT_DEVICE_NAME} --mn ${IOT_DEVICE_METHOD_NAME} --mp '{ "tag": "'${TAG}'" }' --to 60
}

file_name=${TAG}.zip
zip_files ${file_name}
upload_zip ${file_name}
invoke
exit ${?}


