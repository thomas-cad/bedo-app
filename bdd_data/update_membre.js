const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateMembreImages() {
  try {
    // Récupérer tous les membres
    const membres = await prisma.membre.findMany();

    // Parcourir chaque membre et mettre à jour la propriété image
    for (const membre of membres) {
      const updatedImage = `/image/membre/${membre.first_name}-${membre.last_name}.jpg`;

      await prisma.membre.update({
        where: { id: membre.id },
        data: { image: updatedImage },
      });

      console.log(`Membre ${membre.first_name} ${membre.last_name} mis à jour avec l'image : ${updatedImage}`);
    }

    console.log('Mise à jour des images terminée.');
  } catch (error) {
    console.error('Erreur lors de la mise à jour des images :', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter la fonction
updateMembreImages();