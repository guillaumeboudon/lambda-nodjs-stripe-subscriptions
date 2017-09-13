'use strict';

require('dotenv').config()

module.exports.stripePayment = (event, context, callback) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  const url = require('url')

  const jsonData = new url.URLSearchParams(event.body);

  stripe.customers.create({
    email: jsonData.get('stripeEmail'),
    source: jsonData.get('stripeToken')
  }).then(function(customer){
    stripe.subscriptions.create({
      customer: customer.id,
      items: [{
        plan: jsonData.get('plan')
      }]
    })
  })
};
