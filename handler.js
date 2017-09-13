'use strict';

require('dotenv').config()

module.exports.stripePayment = (event, context, callback) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  const queryString = require('query-string')

  const jsonData = queryString.parse(event.body);

  stripe.customers.create({
    email: jsonData.stripeEmail,
    source: jsonData.stripeToken
  }).then(function(customer){
    stripe.subscriptions.create({
      customer: customer.id,
      items: [{
        plan: jsonData.plan
      }]
    })
  })
};
