// server/seed.js
require('dotenv').config();
const { faker } = require('@faker-js/faker');
const db = require('./models');     // your Sequelize init
const Quote = db.Quote;

async function generateMockData(count = 1000) {
  await db.sequelize.sync({ force: false });

  const roofTypes = ['Metal','TPO','Foam','Asphalt'];
  const statesAndCities = {
    CA: ['Los Angeles','San Francisco','San Diego'],
    TX: ['Houston','Dallas','Austin'],
    FL: ['Miami','Orlando','Tampa'],
    NY: ['New York City','Buffalo','Albany'],
    IL: ['Chicago','Springfield','Naperville']
  };

  const records = [];
  for (let i = 0; i < count; i++) {
    const state = faker.helpers.arrayElement(Object.keys(statesAndCities));
    const city  = faker.helpers.arrayElement(statesAndCities[state]);
    const projectDateObj = faker.date.between({
      from: new Date('2023-01-01'),
      to:   new Date('2025-03-31')
    });
    const projectDate = projectDateObj.toISOString().slice(0,10);

    records.push({
      contractorName: faker.person.fullName(),          // new API
      company:        faker.company.name(),             // new API
      roofSize:       faker.number.int({ min: 500, max: 5000 }), // replaces datatype.number
      roofType:       faker.helpers.arrayElement(roofTypes),
      city,
      state,
      projectDate
    });
  }

  await Quote.bulkCreate(records);
  console.log(`✅ Inserted ${count} mock quotes`);
  process.exit(0);
}

generateMockData().catch(err => {
  console.error(err);
  process.exit(1);
});
