const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define a simple schema
const ItemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model('Item', ItemSchema);

// GET route
app.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// POST route
app.post('/items', async (req, res) => {
  const { name } = req.body;
  const newItem = new Item({ name });
  await newItem.save();
  res.json({ message: 'Item saved', item: newItem });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
