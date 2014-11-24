var apiSettings = {
  apiKey: 'ReplaceThisWithYourAPIToken',
  userId: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
};

var config = {
  host: 'localhost',
  port: 3000,
  apiUrl: '/api/v2'
};

function apiHostUrl(config) {
  return config.host + ":" + config.port + config.apiUrl;
}

module.exports.apiSettings = apiSettings;
module.exports.config = config;
module.exports.apiHostUrl = apiHostUrl;
