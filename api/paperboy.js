// use the .env if present, do nothing otherwise
require('dotenv').config();
// the utility to handle StaticEmail requests
const {create} = require('static.email.ses');
// secrets revealed via dotenv or now
const {
  AWS_SES_TO: to,
  AWS_SES_REGION: region,
  AWS_SES_ACCESS_KEY: accessKeyId,
  AWS_SES_SECRET_KEY: secretAccessKey,
  RECAPTCHA_STATIC_EMAIL: recaptcha
} = process.env;
// the serverless function that now will use
module.exports = create({
  site: 'dariosusa.com',  // put your domain here
  sender: 'New Customer',// any sender name
  to,
  region,
  accessKeyId,
  secretAccessKey,
  recaptcha
});