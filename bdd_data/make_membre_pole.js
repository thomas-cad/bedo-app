const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const jsonFilePath = path.join(__dirname, 'membre_pole.json');
  const membrePoleData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

  for (const pole of membrePoleData) {
    const { pole_id, pole_name_fr, membres } = pole;

    console.log(`Processing pole: ${pole_name_fr}`);

    for (const membre of membres) {
      const { membre_id, respo } = membre;

      try {
        await prisma.pole_membre.create({
          data: {
            poleId: pole_id,
            membreId: membre_id,
            respo: respo, // Add this field if it exists in your schema
          },
        });
        console.log(`Linked membre ${membre_id} to pole ${pole_id}`);
      } catch (error) {
        console.error(
          `Error linking membre ${membre_id} to pole ${pole_id}:`,
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