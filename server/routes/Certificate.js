const express=require('express');
const router=express.Router();
const connection = require("../dbconnection");


///Certificate Insert
router.post('/Certificate_Generated', (req, res) => {
    const { enrl_id,std_is,course_id,c_date } = req.body;
  


    const query = 'SELECT * FROM certificate WHERE enrollment_id = ?';
    connection.query(query, [enrl_id], (err, results) => {
      if (err) {
        console.error('MySQL error:', err);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
      } else if (results.length > 0) {
        res.json({ status: 'exists', message: 'Enrollment ID exists' });
      } else {

        const sql =
        'INSERT INTO certificate (student_id, course_id, enrollment_id, certificate_generate_date) VALUES (?, ?, ?, ?)';
    
      connection.query(sql, [std_is, course_id, enrl_id, c_date], (err, result) => {
        if (err) {
          console.error('Error inserting certificate:', err);
          res.status(500).send('Error inserting certificate');
        } else {
          console.log('Certificate inserted successfully');
          res.send({status:'success',msg:'Generated Cirti'})
        }
      });
      }
    });



    
  });

module.exports = router;