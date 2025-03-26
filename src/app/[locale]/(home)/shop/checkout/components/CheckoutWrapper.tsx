"use client";

import React, { useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useCart, CartItem } from '@/app/[locale]/context/CartContext';
import { sessionUtils } from "@/utils/session";

interface RequestBody {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  agreeToPay: boolean;
  cart: CartItem[];
}


const CheckoutWrapper = ({ 
  locale,
  translations,
  user
}: {
    locale:string,
    translations:{
        checkout:{
            step:string,
            engagement:string,
            empty:string,
            order:string
        }
    },
    user: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
    } | null;
}) => {
  const [verified, setVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [agreementError, setAgreementError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { clearCart, cart } = useCart();

  const handleRecaptchaChange = (value: string | null) => {
    if (!value) {
      setVerified(false);
      setCaptchaError("Please verify you are not a robot.");
      return;
    }

    setIsLoading(true);
    fetch("/api/recaptcha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: value }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setVerified(true);
          setCaptchaError("");
        } else {
          setVerified(false);
          setCaptchaError("Verification failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("ReCAPTCHA verification error:", error);
        setVerified(false);
        setCaptchaError("Error during verification. Please try again.");
      })
      .finally(() => setIsLoading(false));
  };

  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreementChecked(e.target.checked);
    if (e.target.checked) setAgreementError("");
  };

  const validateForm = () => {
    if (cart.length === 0) return false;
    if (!agreementChecked) {
      setAgreementError("You must accept the payment terms.");
      return false;
    }
    if (!verified) {
      setCaptchaError("Please complete the verification.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!user) {
      alert("User information not available. Please refresh the page.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await createOrder();
      if (result?.success) {
        clearCart();
        window.location.href = `/shop/success?id=${result.orderId}`;
      } else {
        alert(`Order creation failed: ${result?.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Order submission error:", error);
      alert("Failed to submit order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async () => {
    if (!user) return null;

    const orderData: RequestBody = {
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      email: user.email,
      agreeToPay: agreementChecked,
      cart: cart,
    };

    try {
      const response = await fetch("/api/checkout/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      return await response.json();
    } catch (error) {
      console.error("Order creation error:", error);
      return { success: false, message: "Network error" };
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mt-16">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {translations.checkout.step}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mt-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={agreementChecked}
                onChange={handleAgreementChange}
                className="form-checkbox h-4 w-4 text-[#0CFF21] border-gray-300 rounded"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-700">
                {translations.checkout.engagement}
              </span>
            </label>
            {agreementError && (
              <p className="text-red-500 text-sm mt-1">{agreementError}</p>
            )}
          </div>

          <div className="mt-6">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              onChange={handleRecaptchaChange}
              onExpired={() => {
                setVerified(false);
                setCaptchaError("Verification expired. Please try again.");
              }}
            />
            {captchaError && (
              <p className="text-red-500 text-sm mt-2">{captchaError}</p>
            )}
          </div>

          {cart.length === 0 && (
            <p className="text-red-500 text-sm mt-2">
              {translations.checkout.empty}
            </p>
          )}

          <div className="mt-6">
            <button
              type="submit"
              disabled={!verified || !agreementChecked || cart.length === 0 || isLoading}
              className={`w-full bg-[#0CFF21] text-white py-2 px-4 rounded-md font-semibold ${
                !verified || !agreementChecked || cart.length === 0 || isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#0BDF1D]"
              }`}
            >
              {isLoading ? "Processing..." : translations.checkout.order}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutWrapper;