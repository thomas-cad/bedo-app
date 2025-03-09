import smtplib
import ssl
from dotenv import load_dotenv
import os

# Charger les variables d'environnement à partir du fichier .env
load_dotenv()

# Configuration SMTP
SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")

# Contexte SSL pour sécuriser la connexion
context = ssl.create_default_context()

try:
    # Connexion au serveur SMTP
    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context) as server:
        print(f"Connexion réussie au serveur SMTP {SMTP_HOST}:{SMTP_PORT}")

        # Authentification
        server.login(SMTP_USER, SMTP_PASS)
        print("Authentification réussie.")

        # Test d'envoi d'un email
        sender_email = SMTP_USER
        receiver_email = "thomas.cadegros@telecom-paris.fr"  # Remplacez par l'adresse du destinataire
        subject = "Test SMTP"
        body = "Ceci est un test d'envoi d'email via SMTP."

        message = f"Subject: {subject}\n\n{body}"
        server.sendmail(sender_email, receiver_email, message)
        print("Email envoyé avec succès.")

except smtplib.SMTPException as e:
    print(f"Erreur SMTP: {e}")
except Exception as e:
    print(f"Erreur inattendue: {e}")