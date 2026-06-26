"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

import FundingHistoryTable from "@/components/dashboard/FundingHistoryTable";
import TotalFundCard from "@/components/dashboard/TotalFundCard";
import { GetPayment } from "@/lib/action/get/getPayment";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function FundingPage() {
  const [amount, setAmount] = useState("");
  const [historyData, setHistoryData] = useState([]);
  const [totalFund, setTotalFund] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load Payment History
  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {

      const data = await GetPayment()

      const formattedHistory = data.map((payment) => ({
        id: payment._id,
        date: new Date(
          payment.createdAt
        ).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        name: payment.donorName,
        amount: `$${Number(payment.amount).toFixed(2)}`,
        method: payment.paymentMethod,
        status:
          payment.status === "succeeded"
            ? "Completed"
            : payment.status,
      }));

      setHistoryData(formattedHistory);

      const total = data.reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );

      setTotalFund(total);
    } catch (error) {
      console.error("Fetch Payment Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update UI instantly after successful payment
  const handlePaymentSuccess = (
    paidAmount,
    newTransaction
  ) => {
    setTotalFund((prev) => prev + paidAmount);

    setHistoryData((prev) => [
      newTransaction,
      ...prev,
    ]);
  };

  if (loading) {
    return (
      <div className="py-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}

        <div>
          <h1 className="text-3xl font-bold">
            Funding
          </h1>

          <p className="text-sm text-gray-500">
            Home / Dashboard / Funding
          </p>
        </div>

        {/* Main Grid */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side */}

          <div className="lg:col-span-2 space-y-6">
            <TotalFundCard
              totalAmount={totalFund.toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}
              onGiveFund={() => {}}
            />

            <FundingHistoryTable
              historyData={historyData}
            />
          </div>

          {/* Right Side */}

          <div>
            <CheckoutForm
              amount={amount}
              setAmount={setAmount}
              onPaymentSuccess={
                handlePaymentSuccess
              }
            />
          </div>
        </div>
      </div>
    </Elements>
  );
}