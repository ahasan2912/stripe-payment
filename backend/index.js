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
            success_url: `${process.env.URL}/success`,
            cancel_url: `${process.env.URL}/cancel`,
            customer_email: 'user@example.com',
        });

        // Send the checkout session URL to the client
        res.json({ url: session.url });

    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
