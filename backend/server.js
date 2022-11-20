const express = require('express');
const { uuid } = require('uuidv4');
const app = express();

app.use(express.json());

app.listen(3000);

const orders = [];

app.get('/order', (req, res) => {
  res.send(orders)
})

app.post('/order', (req, res) => {
  orders.push({ id: uuid(), ...req.body})
  res.send(orders)
})

app.put('/order/:id', (req, res) => {
  const id = req.params.id;
  let index;
  
  orders.forEach((order, i) => order.id === id ? index = i : []);
  orders[index] = req.body;

  res.send(`Updated order: ${id}`)
})

app.delete('/order/:id', (req, res) => {
  const id = req.params.id;
  let index;
  
  orders.forEach((order, i) => order.id === id ? index = i : []);
  orders.splice(index, 1);

  res.send(`Order Deleted: ${id}`);
})

app.patch('/order/:id', (req, res) => {
  const id = req.params.id;
  let index;
  
  if (orders.length !== 0) {
    orders.forEach((order, i) => order.id === id ? index = i : []);
    orders.push({...req.body, status: "Pronto"})

    res.send(`Updated status: ${id}`)
  }

  res.send(`ID not found.`)
})