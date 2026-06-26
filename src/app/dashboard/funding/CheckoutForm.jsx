"use client";

import { useState } from "react";
import {
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { useSession } from "@/lib/auth-client";
import { paymentPost } from "@/lib/action/post/paymentPost";

export default function CheckoutForm({
    amount,
    setAmount,
    onPaymentSuccess,
}) {
    const {data:session} =useSession()
    const userName = session?.user?.name || "N/A"
    const stripe = useStripe();
    const elements = useElements();

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        if (!amount || Number(amount) < 5) {
            return alert("Minimum donation is $5");
        }

        setIsProcessing(true);
        setPaymentStatus("Creating payment...");

        try {
            // Create Payment Intent
            const checkoutRes = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: Number(amount),
                }),
            });

            const { clientSecret, error } = await checkoutRes.json();

            if (error) {
                alert(error);
                setIsProcessing(false);
                return;
            }

            setPaymentStatus("Processing card...");

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: "Blood Donor Contributor",
                    },
                },
            });

            if (result.error) {
                alert(result.error.message);
                setPaymentStatus("");
                setIsProcessing(false);
                return;
            }

            if (result.paymentIntent.status === "succeeded") {
                // Save Payment in MongoDB

                const paymentData = {
                    transactionId: result.paymentIntent.id,
                    amount: Number(amount),
                    currency: result.paymentIntent.currency,
                    status: result.paymentIntent.status,
                    paymentMethod: "Stripe",
                    donorName: userName,
                    createdAt: new Date(),
                };

                await paymentPost(paymentData) ;

                const newTransaction = {
                    id: result.paymentIntent.id,
                    date: new Date().toLocaleDateString("en-GB"),
                    name: userName,
                    amount: `$${Number(amount).toFixed(2)}`,
                    method: "Stripe",
                    status: "Completed",
                };

                onPaymentSuccess(Number(amount), newTransaction);

                alert("🎉 Payment Successful!");

                setAmount("");
                setPaymentStatus("");

                elements.getElement(CardElement).clear();
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow p-6 space-y-5"
        >
            <h2 className="text-xl font-bold">
                Donate Using Stripe
            </h2>

            <div>
                <label className="font-semibold">
                    Donation Amount
                </label>

                <input
                    type="number"
                    min="5"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border w-full p-3 rounded-lg mt-2"
                    placeholder="Enter Amount"
                />
            </div>

            <div>
                <label className="font-semibold">
                    Card Details
                </label>

                <div className="border rounded-lg p-4 mt-2">
                    <CardElement />
                </div>
            </div>

            {paymentStatus && (
                <p className="text-blue-600 text-sm">
                    {paymentStatus}
                </p>
            )}

            <button
                disabled={!stripe || isProcessing}
                className="bg-rose-600 text-white w-full py-3 rounded-lg"
            >
                {isProcessing
                    ? "Processing..."
                    : `Pay $${amount || 0}`}
            </button>
        </form>
    );
}