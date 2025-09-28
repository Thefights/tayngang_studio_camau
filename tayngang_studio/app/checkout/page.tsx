"use client";
import { CheckoutForm } from "@/components/cart/checkout-form";
import * as checkoutData from "@/data/other/checkout.data";
import { useState } from "react";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<number | undefined>(
    undefined
  );

  const handleCheckout = async () => {
    if (paymentMethod === undefined) {
      alert("Please select a payment method before checking out.");
      return;
    }

    try {
      const response = await checkoutData.checkout({ paymentMethod });
      console.log("Checkout response:", response);
      // Kiểm tra response có paymentUrl không
      if (response?.paymentLink) {
        console.log("Redirecting to PayOS:", response.paymentLink);
        window.location.href = response.paymentLink; // sang PayOS
      } else {
        console.log("No payment link, COD order:", response);
        window.location.href = "/checkout/success"; // sang trang thành công
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Có lỗi xảy ra khi checkout. Vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      <main className="py-8">
        <CheckoutForm
          handleCheckout={handleCheckout}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      </main>
    </div>
  );
}
