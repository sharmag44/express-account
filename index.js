"use strict";
const express = require('express');
var bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const stripe = require("stripe")("sk_test_51JfkOFKVxsnLx0rymzovYTwKjmh2gNI4JWc8tt02yyfC1hJ4ESEM0U89EUX8nEjYuEoIFWgE9t7ZQiDXrpYmJ7UL00vaQpGbAA");


app.get("/account", async (req, res) => {
    try {
        const account = await stripe.accounts.create({
            country: 'US',
            type: 'express',
            capabilities: { card_payments: { requested: true }, transfers: { requested: true } },
            business_type: 'individual',
            business_profile: { url: 'https://google.com' },
        });
        return res.json(account)

    } catch (err) {
        throw err
    }
})



app.get("/post/:id", async (req, res) => {
    try {
        const accountLink = await stripe.accountLinks.create({
            account: req.params.id,
            refresh_url: 'https://google.com',
            return_url: 'https://google.com',
            type: 'account_onboarding',
        });
        return res.json(accountLink);

    } catch (err) {
        throw err
    }
})
app.get("/account/:id", async (req, res) => {
    try {
        const account = await stripe.accounts.retrieve(req.params.id);
        return res.json(account);

    } catch (err) {
        throw err
    }
})

app.listen(PORT, () => console.log("server is listening port :" + PORT));