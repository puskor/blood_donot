import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
    try {
        const { amount } = await req.json();

        if (!amount || isNaN(amount) || amount <= 0) {
            return NextResponse.json({ error: "Invalid dynamic amount" }, { status: 400 });
        }

        // কাস্টম গেটওয়ের জন্য Payment Intent তৈরি করা হচ্ছে
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // পয়সায় কনভার্ট করা হলো
            currency: "bdt", // ইন্টারন্যাশনাল হলে 'usd' দিতে পারেন
            payment_method_types: ["card"],
        });

        // ক্লায়েন্ট সিক্রেট পাঠানো হচ্ছে যাতে ফ্রন্টএন্ড ফর্মটি অথরাইজড হতে পারে
        return NextResponse.json({ clientSecret: paymentIntent.client_secret });

    } catch (error) {
        console.error("Payment Intent Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}