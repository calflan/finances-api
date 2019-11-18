const express = require('express');
const cors = require('cors');
const mongooose = require('mongoose');
const healthRouter = require('./routes/health');
const purchasesRouter = require('./routes/purchases');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/health", healthRouter);

const uri = process.env.ATLAS_URI;
mongooose
  .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .catch(error => handleError(error));

const connection = mongooose.connection;
connection.once('open', () => {
  console.log('Successfully connected to MongoDB database');
});

app.use('/purchases', purchasesRouter);

// app.listen(port, () => {
//   console.log(`Server running on port: ${port}`);
// });