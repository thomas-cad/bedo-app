import smtplib
from dotenv import load_dotenv
import os

# Charger les variables d'environnement à partir du fichier .env
load_dotenv()

# Configuration SMTP
SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")                        

smtpServer=SMTP_HOST      
fromAddr=SMTP_USER         
port = SMTP_PORT
toAddr='thomas.cadegros@telecom-paris.fr'     
text= "This is a test of sending email from within Python."
server = smtplib.SMTP(smtpServer,port)
server.ehlo()
server.starttls()
server.sendmail(fromAddr, toAddr, text) 
server.quit()