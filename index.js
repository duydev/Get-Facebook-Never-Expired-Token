require('dotenv').config();
const { getFacebookAccessToken } = require('./utils');

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

console.log('EMAIL: ', email);

getFacebookAccessToken(email, password).then(token => {
  console.log(token);
});
