pushd ./node_modules/habitrpg
cp config.json.example config.json
npm start &
node ./src/seed.js
popd

