'use strict';

require('dotenv').config()

module.exports.stripePayment = (jsonData, context, callback) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
