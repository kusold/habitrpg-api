pushd ./node_modules/habitrpg
npm install -g grunt-karma git-changelog
cp config.json.example config.json
npm start &
node ./src/seed.js
popd

