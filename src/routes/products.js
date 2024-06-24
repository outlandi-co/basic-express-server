// src/routes/products.js
const express = require('express');
const router = express.Router();

const products = [
  {
    id: 1,
    name: 'Mock Product 1',
    category: 'Mock Category',
    description: 'This is a mock product description.',
    price: 9.99,
    inventoryCount: 10,
  },
  {
    id: 2,
    name: 'Mock Product 2',
    category: 'Mock Category',
    description: 'This is another mock product description.',
    price: 19.99,
    inventoryCount: 5,
  },
];

router.get('/', (req, res) => {
  res.json(products);
});

router.post('/', (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

module.exports = router;
