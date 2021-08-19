const stripe = require('stripe')("sk_test_51JFzWkSJFrMMx7cfaC2Bkxewi2cPMupCoTTmPioilIDvcSni3ZmWkpPyzJhsPk9K6WdNBFBDJWSKL7HI2sIma397000UKMtO2d")

exports.stripe_payment = async (res, req, next) => {
    const stripeVendorAccount = 'acct_1JFzWkSJFrMMx7cf';

    stripe.paymentMethods.create(
        {
            payment_mehtod: req.query.paym
        }, {
        stripeAccount: stripeVendorAccount
    },
        function (err, rpaymentMethod) {
            if (err != null) {
                console.log(err);
            } else {
                stripe.paymentIntents.create(
                    {
                        amount: req.query.amount,
                        currency: req.query.currency,
                        payment_method: req.query.payment_method,
                        //confirmation_method = 'automatic',
                        confirm: true,
                        description: req.query.description
                    }, function (err, paymentIntent) {
                        if (err != null) {
                            console.log(err);
                        } else {
                            res.json({
                                paymentIntent: paymentIntent,
                                stripeAccount: stripeVendorAccount,
                            })

                        }
                    }
                )
            }
        }
    )
}