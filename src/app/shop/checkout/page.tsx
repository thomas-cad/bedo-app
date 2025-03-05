"use client";

import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useCart, CartItem } from '@/app/context/CartContext';

interface RequestBody {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  agreeToPay: boolean;
  cart: CartItem[];
}

const CheckoutPage = () => {
  const [verified, setVerified] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [agreementChecked, setAgreementChecked] = useState(false); // État pour la case à cocher
  const [agreementError, setAgreementError] = useState(""); // Message d'erreur pour la case à cocher
  const [cartError, setCartError] = useState(""); // Message d'erreur pour le panier vide
  const [requestBody, setRequestBody] = useState<RequestBody>();
  const { clearCart } = useCart();
  const { cart } = useCart();

  const handleRecaptchaChange = (value: string | null) => {
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
          setCaptchaError(""); // Effacer l'erreur si le ReCAPTCHA est vérifié
        } else {
          setVerified(false);
          setCaptchaError("Veuillez vérifier que vous n'êtes pas un robot.");
        }
      })
      .catch((error) => {
        console.error("Error verifying ReCAPTCHA:", error);
        setVerified(false);
        setCaptchaError("Une erreur s'est produite lors de la vérification du ReCAPTCHA.");
      });

    if (value) {
      setVerified(true);
      setCaptchaError(""); // Effacer l'erreur si le ReCAPTCHA est vérifié
    } else {
      setVerified(false);
      setCaptchaError("Veuillez vérifier que vous n'êtes pas un robot.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validation de l'adresse e-mail
    if (name === "email") {
      if (!value.endsWith("@telecom-paris.fr")) {
        setEmailError("L'adresse e-mail doit être en @telecom-paris.fr");
      } else {
        setEmailError("");
      }
    }

    // Validation du numéro de téléphone
    if (name === "phone") {
      const phoneRegex = /^\d{10,}$/; // Au moins 10 chiffres
      if (!phoneRegex.test(value)) {
        setPhoneError("Le numéro de téléphone doit contenir au moins 10 chiffres.");
      } else {
        setPhoneError("");
      }
    }
  };

  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreementChecked(e.target.checked);
    setAgreementError(""); // Effacer l'erreur si la case est cochée
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.email.endsWith("@telecom-paris.fr") &&
      /^\d{10,}$/.test(formData.phone) && // Validation du numéro de téléphone
      cart.length > 0 // Validation du panier
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verified) {
      return;
    }
    if (!agreementChecked) {
      setAgreementError("Vous devez accepter les conditions de paiement.");
      return;
    }
    if (cart.length === 0) {
      setCartError("Votre panier est vide. Ajoutez des articles avant de passer la commande.");
      return;
    }
    if (isFormValid()) {
      const rv = await createOrder();
      if (rv.success == true) {
        clearCart(); // Vider le panier après la soumission
        window.location.href = `/shop/success?id=${rv.orderId}`;
      } else {
        alert(`Une erreur s'est produite lors de la création de la commande. ${rv.success}`);
      }
    } else {
      alert("Veuillez remplir tous les champs correctement.");
    }
  };



  const createOrder = async () => {
    const orderData: RequestBody = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        agreeToPay: agreementChecked,
        cart: cart,
    };
    setRequestBody(orderData);

    try {
        const response = await fetch("/api/checkout/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });

        const data = await response.json();
        return data

    } catch (error) {
        alert("Une erreur réseau s'est produite.");
        return false;
    }
};


  return (
    <div className="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mt-16">
        <h1 className="text-2xl font-bold mb-6 text-center">Encore une étape 👻</h1>

        <form onSubmit={handleSubmit}>
          {/* Informations personnelles */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-[#0CFF21] focus:ring-[#0CFF21]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-[#0CFF21] focus:ring-[#0CFF21]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Numéro de téléphone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-[#0CFF21] focus:ring-[#0CFF21]"
                required
              />
              {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Adresse e-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-[#0CFF21] focus:ring-[#0CFF21]"
                required
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>
          </div>

          {/* Case à cocher pour l'engagement de paiement */}
          <div className="mt-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={agreementChecked}
                onChange={handleAgreementChange}
                className="form-checkbox h-4 w-4 text-[#0CFF21] border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">
                Je m'engage à payer le montant de la commande auprès des <strong>BedBusters</strong>.
              </span>
            </label>
            {agreementError && <p className="text-red-500 text-sm mt-1">{agreementError}</p>}
          </div>

          {/* ReCAPTCHA */}
          <div className="mt-6">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              onChange={handleRecaptchaChange}
              onExpired={() => {
                setVerified(false);
                setCaptchaError("Le ReCAPTCHA a expiré. Veuillez réessayer.");
              }}
            />
            {captchaError && <p className="text-red-500 text-sm mt-2">{captchaError}</p>}
          </div>

          {/* Message d'erreur pour le panier vide */}
          {cart.length === 0 && (
            <p className="text-red-500 text-sm mt-2">Votre panier est vide. Ajoutez des articles avant de passer la commande.</p>
          )}

          {/* Bouton de soumission */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={!verified || !agreementChecked || cart.length === 0}
              className={`w-full bg-[#0CFF21] text-white py-2 px-4 rounded-md font-semibold ${
                !verified || !agreementChecked || cart.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#0BDF1D]"
              }`}
            >
              Passer la commande
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;