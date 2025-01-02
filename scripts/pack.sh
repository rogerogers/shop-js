VERSION=$(cat apps/wholesale-extension/package.json | jq -r '.version')
EXTENSION_NAME=wholesale-extension-${VERSION}.zip
pnpm -F wholesale-extension build
cd apps/wholesale-extension && mv dist_chrome wholesale-extension && zip -r ${EXTENSION_NAME} wholesale-extension && mv ${EXTENSION_NAME} ../../tmp && rm -fr wholesale-extension
