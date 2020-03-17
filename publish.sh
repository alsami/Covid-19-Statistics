#!/usr/bin/env bash
function build_app() {
    echo build application in production mode, this might take a while
    ng build --prod --output-hashing bundles
    return {?}
}

function create_image() {
    docker build -t covid19.statistics:latest -t ${REGISTRY}/covid19.statistics:latest -t ${REGISTRY}/covid19.statistics:${TRAVIS_TAG} -f ./Dockerfile .
    return ${?}
}

function publish_image() {
    docker push ${REGISTRY}/covid19.statistics:${TRAVIS_TAG}
    return ${?};
}

function authenticate() {
    echo authenticating with service-principal
    az login --service-principal -u ${SERVICE_PRINCIPAL_USER} -p ${SERVICE_PRINCIPAL_PASSWORD} --tenant ${SERVICE_PRINCIPAL_TENANT}
}


function set_container() {
    echo updating container to version ${TRAVIS_TAG}
    az webapp config container set -c "${REGISTRY}/covid19.statistics:${TRAVIS_TAG}" -r https://${REGISTRY} -u ${REGISTRY_USER} -p "${REGISTRY_PASSWORD}" -n ${COVID19STATISTICS_SERVICE_NAME} -g ${COVID19STATISTICS_RESOURCE_NAME}
}

function restart_app() {
    echo restarting application
    az webapp restart --name ${COVID19STATISTICS_SERVICE_NAME} --resource-group ${COVID19STATISTICS_RESOURCE_NAME}
}

build_app
create_image
publish_image



echo done building client, clearing container now

az storage blob delete-batch --source '$web' --account-name ${ACCOUNT_NAME} --account-key ${ACCOUNT_KEY}

echo publishing web-content

az storage blob upload-batch --source ./dist/** --destination '$web' --account-name ${ACCOUNT_NAME} --account-key ${ACCOUNT_KEY}
