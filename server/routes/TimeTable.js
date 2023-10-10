const express=require('express');
const router=express.Router();
const connection=require('../dbconnection');


router.post('/', (req, res) => {
    const { batch_no, class_time, course, lab_teacher } = req.body;
    const sql = 'INSERT INTO time_table (batch_no, class_time, course, lab_teacher) VALUES (?, ?, ?, ?)';
    connection.query(sql, [batch_no, class_time, course, lab_teacher], (err, result) => {
      if (err) {
        console.error('Error inserting data into the database:', err);
        res.status(500).json({ error: 'Error inserting data into the database' });
      } else {
        res.status(200).json({ message: 'Data inserted successfully' });
      }
    });
  });

  router.get('/', (req, res) => {
    const sql = 'SELECT * FROM time_table'; 
    connection.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching data from the database:', err);
        res.status(500).json({ error: 'Error fetching data from the database' });
      } else {
        res.status(200).json(result);
      }
    });
  });
  

  router.put('/:batch_no', (req, res) => {
    const batchNo = req.params.batch_no;
    const { batch_no,class_time, course, lab_teacher } = req.body;
    const sql = 'UPDATE time_table SET batch_no = ?, class_time = ?, course = ?, lab_teacher = ? WHERE batch_no = ?'; 
  
    connection.query(sql, [batch_no, class_time, course, lab_teacher, batchNo], (err, result) => {
      if (err) {
        console.error('Error updating data in the database:', err);
        res.status(500).json({ error: 'Error updating data in the database' });
      } else if (result.affectedRows === 0) {
        
        res.status(404).json({ message: 'Batch not found' });
      } else {
        res.status(200).json({ message: 'Data updated successfully' });
      }
    });
  });
  


  router.delete('/:batch_id', (req, res) => {
    const batchId = req.params.batch_id;
    const sql = 'DELETE FROM time_table WHERE batch_no = ?'; 
  
    connection.query(sql, [batchId], (err, result) => {
      if (err) {
        console.error('Error deleting data from the database:', err);
        res.status(500).json({ error: 'Error deleting data from the database' });
      } else if (result.affectedRows === 0) {
        
        res.status(404).json({ message: 'Batch not found' });
      } else {
        res.status(200).json({ message: 'Data deleted successfully' });
      }
    });
  });


  router.get('/:batch_no', (req, res) => {
    const batchNo = req.params.batch_no;
    const sql = 'SELECT * FROM time_table WHERE batch_no = ?'; 
    connection.query(sql, [batchNo], (err, result) => {
      if (err) {
        console.error('Error fetching data from the database:', err);
        res.status(500).json({ error: 'Error fetching data from the database' });
      } else if (result.length === 0) {
        
        res.status(404).json({ message: 'Batch not found' });
      } else {
        
        res.status(200).json(result[0]);
      }
    });
  });


module.exports = router;