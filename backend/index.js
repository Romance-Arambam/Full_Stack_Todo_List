const express = require("express");
const app = express();
app.use(express.json());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors({
  origin: ["http://localhost:5173", "https://romance-todolist.com"],
}));

require("dotenv").config();
require("./connection");

app.get('/', (req, res) => {
  res.send('API is running...');
});


const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

const listRoutes = require('./routes/list');
app.use('/', listRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});