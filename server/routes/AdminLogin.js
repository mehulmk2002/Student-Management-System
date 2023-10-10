const express=require('express')
const router=express.Router();

var mysql = require('mysql2');
var db= require("../dbconnection");
 
// API endpoint for handling login
router.post('/', (req, res) => {
    const { username, userType, password } = req.body;
    const query = `SELECT * FROM control_panel_users WHERE username = ? AND userType = ? AND password = ?`;
    
    db.query(query, [username, userType, password], (err, result) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).json({ message: 'An error occurred' });
      } else if (result.length === 1) {
        res.status(200).json({ status:'success',message: 'Login successful' });
      } else {
        res.status(200).json({ status:'failed',message: 'Login failed' });
      }
    });
  });

  module.exports=router