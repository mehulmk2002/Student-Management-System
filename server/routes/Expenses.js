const express=require('express');
const router=express.Router();
const connection = require("../dbconnection");

router.post('/', (req, res) => {
    const { date, description, credit, debit } = req.body;
    // Fetch the current balance from the database
    connection.query('SELECT balance FROM expenses ORDER BY id DESC LIMIT 1', (balanceErr, balanceResult) => {
      if (balanceErr) {
        res.status(500).json({ error: 'Database error011' });
      } else {
        const previousBalance = balanceResult.length > 0 ? balanceResult[0].balance : 0;
        const balance = parseFloat(previousBalance) + parseFloat(credit)-parseFloat(debit);
        
        // Insert the transaction with the calculated balance
        const insertQuery = 'INSERT INTO expenses (date, description, credit, debit, balance) VALUES (?, ?, ?, ?, ?)';
        connection.query(insertQuery, [date, description, credit, debit, balance], (err, result) => {
          if (err) {
            res.status(500).json({ error: 'Database error002' });
          } else {
            res.json({ message: 'Transaction added successfully' });
          }
        });
      }
    });
  });


  
router.get('/', (req, res) => {

  const { startDate, endDate } = req.query;
  const query = `
  SELECT *
  FROM expenses
  WHERE date BETWEEN ? AND ?
`;

  connection.query(query, [endDate,startDate], (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
  });



  router.get('/last-id', (req, res) => {
    const query = 'SELECT MAX(id) AS lastId FROM expenses';
    
    connection.query(query, (err, result) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      
      const lastId = result[0].lastId;
      res.json({ lastId });
    });
  });




// Define an API endpoint to fetch a transaction by ID
router.get('/:transactionId', (req, res) => {
  const { transactionId } = req.params;


  const query = 'SELECT * FROM expenses WHERE id = ?';

  connection.query(query, [transactionId], (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Transaction not found' });
    } else {
      res.json(results[0]);
    }
  });
});

router.put('/:accountId', (req, res) => {
  const { accountId } = req.params;
  const updatedData = req.body;
  const query = 'UPDATE expenses SET ? WHERE id = ?';

  connection.query(query, [updatedData, accountId], (err, result) => {
    if (err) {
      console.error('Error updating account:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ message: 'Account updated successfully' });
  });
});

  module.exports = router;