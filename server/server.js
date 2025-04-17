const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./models');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
const quoteRoutes = require('./routes/quotes');
app.use('/api/quotes', quoteRoutes);

// Sync DB and start server
db.sequelize.sync().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
