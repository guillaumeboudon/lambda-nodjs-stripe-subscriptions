'use strict';

require('dotenv').config()

module.exports.stripePayment = (event, context, callback) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  try {
    // Parse Stripe Event
    const jsonData = JSON.parse(event.body); // https://stripe.com/docs/api#event_object

    // Verify the event by fetching it from Stripe
    console.log("Stripe Event: %j", jsonData);
    stripe.events.retrieve(jsonData.id, (err, stripeEvent) => {
      const eventType = stripeEvent.type ? stripeEvent.type : '';
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Stripe webhook incoming!',
          stage: requestContextStage,
        }),
      };
      console.log("Event Type: %j", eventType);

      // Branch by event type
      switch (eventType) {
        case 'invoice.created':
          // invoice.created event
          break;
        default:
          break;
      }
      callback(null, response);
    });
  } catch (err) {
    context.fail(err);
  }
};
