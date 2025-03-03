'use client';

import React, { useRef, useState } from "react";
import ReCAPTCHA from 'react-google-recaptcha';
import { useCart } from '@/app/context/CartContext';

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    agreeToPay: false,
  });
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cart = useCart();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCaptchaChange = (token: string | null) => {
    setIsVerified(!!token);
  };

  const handleExpired = () => {
    setIsVerified(false);
  };

  const validateEmailDomain = (email: string) => email.endsWith('@telecom-paris.fr');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isVerified) {
      setError('Veuillez compléter le CAPTCHA.');
      return;
    }

    if (!formData.agreeToPay) {
      setError('Vous devez accepter de vous engager à payer.');
      return;
    }

    if (!validateEmailDomain(formData.email)) {
      setError('Veuillez utiliser une adresse e-mail @telecom-paris.fr.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const captchaToken = recaptchaRef.current?.getValue();

    const body = JSON.stringify({
      ...formData,
      cart,
      captchaToken,
    });

    try {
      const response = await fetch('/api/checkout/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Erreur lors du traitement du paiement');
      }

      window.location.href = '/success';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 mt-16">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Finaliser votre Commande
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              Prénom<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0CFF21]"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Nom<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0CFF21]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Adresse E-mail<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0CFF21]"
              placeholder="exemple@telecom-paris.fr"
            />
            <p className="text-sm text-gray-500 mt-1">
              Veuillez utiliser une adresse e-mail @telecom-paris.fr.
            </p>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Numéro de Téléphone<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0CFF21]"
            />
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="agreeToPay"
                checked={formData.agreeToPay}
                onChange={handleChange}
                className="h-4 w-4 text-[#0CFF21] border-gray-300 rounded focus:ring-[#0CFF21]"
              />
              <span className="ml-2 text-sm text-gray-600">
                Je m'engage à payer le montant indiqué. <span className="text-red-500">*</span>
              </span>
            </label>
          </div>

          <div className="flex justify-center w-full">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              ref={recaptchaRef}
              onChange={handleCaptchaChange}
              onExpired={handleExpired}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !isVerified}
            className="w-full bg-[#0CFF21] text-white px-6 py-2 rounded-lg hover:bg-[#0CFF21] transition duration-300 disabled:bg-[#0CFF21]"
          >
            {isSubmitting ? 'Traitement en cours...' : 'Confirmer le Paiement'}
          </button>
        </form>
      </div>
    </div>
  );
}
