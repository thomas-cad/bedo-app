const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const prisma = new PrismaClient();

async function main() {
  const csvFilePath = path.join(__dirname, 'membre.csv');
  const membres = [];

  // Read the CSV file
  fs.createReadStream(csvFilePath)
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {
      membres.push({
        first_name: row.first_name,
        last_name: row.last_name,
        role_fr: row.role_fr,
        role_en: row.role_en,
      });
    })
    .on('end', async () => {
      console.log('CSV file successfully processed.');

      // Insert data into the database
      for (const membre of membres) {
        try {
          await prisma.membre.create({
            data: {
              first_name: membre.first_name,
              last_name: membre.last_name,
              role_fr: membre.role_fr,
              role_en: membre.role_en,
            },
          });
          console.log(`Inserted: ${membre.first_name} ${membre.last_name}`);
        } catch (error) {
          console.error(
            `Error inserting ${membre.first_name} ${membre.last_name}:`,
            error
          );
        }
      }

      console.log('All data has been inserted.');
      await prisma.$disconnect();
    });
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
