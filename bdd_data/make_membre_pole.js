const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const jsonFilePath = path.join(__dirname, 'membre_pole.json');
  const membrePoleData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

  for (const pole of membrePoleData) {
    const { pole_name_fr, membres } = pole;

    console.log(`Processing pole: ${pole_name_fr}`);

    // Récupérer le pôle par son champ unique `name_fr`
    const poleRecord = await prisma.pole.findUnique({
      where: { name_fr: pole_name_fr },
    });

    if (!poleRecord) {
      console.error(`Pole with name "${pole_name_fr}" not found.`);
      continue;
    }

    for (const membre of membres) {
      const { first_name, last_name, respo } = membre;

      // Récupérer le membre par ses champs uniques `first_name` et `last_name`
      const membreRecord = await prisma.membre.findFirst({
        where: {
          first_name: first_name,
          last_name: last_name,
        },
      });

      if (!membreRecord) {
        console.error(
          `Membre with name "${first_name} ${last_name}" not found.`
        );
        continue;
      }

      try {
        await prisma.pole_membre.create({
          data: {
            poleId: poleRecord.id,
            membreId: membreRecord.id,
            respo: respo, // Ce champ doit exister dans votre schéma
          },
        });
        console.log(
          `Linked membre "${first_name} ${last_name}" to pole "${pole_name_fr}"`
        );
      } catch (error) {
        console.error(
          `Error linking membre "${first_name} ${last_name}" to pole "${pole_name_fr}":`,
          error
        );
      }
    }
  }

  console.log('All data has been inserted.');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});