const _ = require('lodash');
const md5 = require('md5');
const axios = require('axios');
const queryString = require('query-string');

function sortObjectKeys(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] = obj[key];

      return result;
    }, {});
}

function generateSignature(formData) {
  let data = sortObjectKeys(formData);

  data = queryString
    .stringify(data, { encode: false })
    .split('&')
    .join('');
  data += `c1e620fa708a1d5696fb991c1bde5662`;

  return md5(data);
}

async function getFacebookAccessToken(email, password) {
  try {
    const query = {
      api_key: `3e7c78e35a76a9299309885393b02d97`,
      email,
      format: `JSON`,
      locale: `vi_vn`,
      method: `auth.login`,
      password,
      return_ssl_resources: 0,
      v: `1.0`
    };

    query.sig = generateSignature(query);

    let options = {
      url: `https://api.facebook.com/restserver.php?${queryString.stringify(
        query
      )}`,
      method: 'GET'
    };

    const response = await axios(options);

    return response.data;
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      console.log(err.request);
    } else {
      console.log('Error', err.message);
    }

    return null;
  }
}

module.exports = {
  getFacebookAccessToken
};
