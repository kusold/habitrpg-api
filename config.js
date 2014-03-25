var apiSettings = {
  apiKey: 'c27a901d-3a43-4393-8ad4-ec87d9c5530f',
  userId: '12048ca1-a0f1-4303-baa3-9f863c09787b'
}

var config = {
  host: 'localhost',
  port: 3000,
  apiUrl: '/api/v2'
}

function apiHostUrl(config) {
  return config.host + ":" + config.port + config.apiUrl;
}

module.exports.apiSettings = apiSettings;
module.exports.config = config;
module.exports.apiHostUrl = apiHostUrl;
