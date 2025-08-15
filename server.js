const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const transactions = []; // In-memory storage

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Validation middleware
const validateTransaction = (req, res, next) => {
  const { amount, description } = req.body;

  if (!amount || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Amount is required and must be a number' });
  }

  if (!description || typeof description !== 'string') {
    return res.status(400).json({ error: 'Description is required and must be a string' });
  }

  next();
};

// Routes
app.post('/transaction', validateTransaction, (req, res) => {
  try {
    const { amount, description } = req.body;
    const transaction = {
      id: Date.now(), // Simple way to generate unique IDs
      amount,
      description,
      timestamp: new Date().toISOString()
    };

    transactions.push(transaction);
    res.status(201).json({
      message: 'Transaction created successfully',
      transaction
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});

app.get('/transactions', (req, res) => {
  try {
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
