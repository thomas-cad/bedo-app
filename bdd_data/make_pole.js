const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const prisma = new PrismaClient();

async function main() {
  const csvFilePathPole = path.join(__dirname, 'pole.csv');
  const poles = [];

  // Read the CSV file for poles
  fs.createReadStream(csvFilePathPole)
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {
      poles.push({
        name_fr: row.name_fr,
        name_en: row.name_en,
        description_fr: row.description_fr || null,
        description_en: row.description_en || null,
      });
    })
    .on('end', async () => {
      console.log('CSV file for poles successfully processed.');

      // Insert data into the database for poles
      for (const pole of poles) {
        try {
          await prisma.pole.create({
            data: {
              name_fr: pole.name_fr,
              name_en: pole.name_en,
              description_fr: pole.description_fr,
              description_en: pole.description_en,
            },
          });
          console.log(`Inserted: ${pole.name_fr} / ${pole.name_en}`);
        } catch (error) {
          console.error(
            `Error inserting ${pole.name_fr} / ${pole.name_en}:`,
            error
          );
        }
      }

      console.log('All pole data has been inserted.');
      await prisma.$disconnect();
    });
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
