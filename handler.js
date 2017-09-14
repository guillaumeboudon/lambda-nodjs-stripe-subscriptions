'use strict';

var returner = function(callback, stripeErrors) {
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

  stripe.customers.create({
    email: body.stripeEmail
  }).then(function(customer){
    return stripe.customers.createSource(customer.id, {
      source: "toto"/*body.stripeToken*/
    });
  }).then(function(customer) {
    return stripe.subscriptions.create({
      customer: customer.id,
      items: [{
        plan: body.stripePlanId
      }]
    });
  }).catch(function(err) {
    return err
  });

  return returner(callback, "");
};
