const express = require('express')
const app = express()
const port = 3001

const transactions = []; // No time to implement a database
app.use(express.json());
app.post('/transaction', (req, res) => {
  const { amount, description } = req.body;

  const transaction = { amount, description };
  transactions.push(transaction);

  res.send(`Processing ${amount} ${description} transaction`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
