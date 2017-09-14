'use strict';

try {
  var dotenv = require('dotenv');
  dotenv.config()
} catch (err){
  console.log("Dotenv is not installed.");
}

const returner = function(callback, stripeErrors) {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify({ "message": stripeErrors })
  };
  return callback(null, response);
}

module.exports.stripePayment = (event, context, callback) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  const body = JSON.parse(event.body);

  const returnerCallback = (m) =>
    returner(callback, m)

  stripe.customers.create({
    email: body.stripeEmail,
    source: body.stripeToken
  }).then(function(customer) {
    return stripe.subscriptions.create({
      customer: customer.id,
      items: [{
        plan: body.stripePlanId
      }]
    });
  }).then(function (subscription) {
    returnerCallback("Ok");
  }).catch(function(err) {
    returnerCallback(err);
  });
};
