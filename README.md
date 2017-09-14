# lambda-nodjs-stripe-subscriptions

Lambda in Node.js, to handle subscriptions to a stripe plan.

Do a POST request with the following JSON body:
```
{
  "stripeEmail": "john@doe.com",
  "stripeToken": "tok_visa",
  "stripePlanId": "subscription-id"
}
```

It will create a new Stripe user, with his email address, and his card details. Then, it will subscribe him to the defined plan.
