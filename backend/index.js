import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const port = 5000;

app.use(cors({
    origin: process.env.URL,
    credentials: true,
}));
app.use(express.json());

app.get('/', async (req, res) => {
    res.send("Start Server");
});

// Stripe checkout session creation route
app.post('/create-checkout-session', async (req, res) => {
    const { product } = req.body;
    console.log(product);
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: product.price * 100,
                        product_data: {
                            name: product?.name || "Custom Product",
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            // success_url: `${process.env.URL}/success`,
            success_url: `${process.env.URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.URL}/cancel`,
            customer_email: 'user@example.com',
        });

        console.log('From Post Api', session);

        // Send the checkout session URL to the client
        res.json({
            url: session.url,
            sessionId: session.id
        });

    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Get payment Payment and others value
app.get("/session/:id", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.params.id);

        res.json({
            payment_intent: session.payment_intent,
            amount_total: session.amount_total,
            currency: session.currency,
            payment_status: session.payment_status,
            customer_email: session.customer_details?.email,
        });
        console.log('From GET Api', session);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
