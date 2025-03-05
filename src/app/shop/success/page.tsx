"use client";

import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function SuccessPage() {
    const [verified, setVerified] = useState(false);
    const [response, setResponse] = useState<any>(null);
    const [captchaError, setCaptchaError] =  useState<string>();

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
            setResponse(data);
            if (data.success) {
              setVerified(true);
              setCaptchaError(""); // Effacer l'erreur si le ReCAPTCHA est vérifié
            } else {
              setVerified(false);
              setCaptchaError(`Veuillez vérifier que vous n'êtes pas un robot. Success: ${data.success}`);
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
          setCaptchaError("Veuillez vérifier que vous n'êtes pas un robot by value.");
        }
      };

    return (
        <div>
            <h1 className="mt-16">Test ReCAPTCHA</h1>
            <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                onChange={handleRecaptchaChange}
                onExpired={() => setVerified(false)}
            />
            {verified && <p>ReCAPTCHA verified!</p>}
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
            {captchaError && <p className="text-red-500 text-sm mt-2">{captchaError}</p>}
        </div>
    );
}