const express=require('express');
const router=express.Router();
const connection = require("../dbconnection");






router.get('/', (req, res) => {
  const { startDate, endDate, selected_course, selected_batch } = req.query;

  let whereClause = '';
  const params = [];

  if (selected_course) {
    whereClause += 'course_id = ? ';
    params.push(selected_course);
  }

  if (selected_batch) {
    if (selected_course) whereClause += 'AND ';
    whereClause += 'batch_no = ? ';
    params.push(selected_batch);
  }

  if (startDate && endDate) {
    if (selected_course || selected_batch) whereClause += 'AND ';
    whereClause += 'course_start_date BETWEEN ? AND ?';
    params.push(startDate, endDate);
  }

  if (whereClause) {
    whereClause = 'WHERE ' + whereClause;
  }

  const sql = `SELECT * FROM enrollment ${whereClause}`;

  connection.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});




router.post("/",(req,res)=>{
  const { student_id, course_id, batch_no, course_start_date, course_end_date, entrollment_duration, course_fee,totalcourseFee, given_fee, reamin_fee, fee_status, bag_received, book_received, icard_received, t_shirt_received, entrollment_status}=req.body;
  const insertQuery = `INSERT INTO enrollment (student_id, course_id, batch_no, course_start_date, course_end_date, entrollment_duration, course_fee,totalcourseFee, given_fee, reamin_fee, fee_status, bag_received, book_received, icard_received, t_shirt_received, entrollment_status) VALUES (?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(insertQuery,[student_id, course_id, batch_no, course_start_date, course_end_date, entrollment_duration, course_fee,totalcourseFee, given_fee, reamin_fee, fee_status, bag_received, book_received, icard_received, t_shirt_received, entrollment_status] ,function (err, result) {
    if (err) throw err;
    res.send({msg:'enrolled in course'})
  });
  })

router.get('/search/:searchCriteria', (req, res) => {
    const { searchCriteria } = req.params;
    const query = `SELECT * FROM student WHERE student_id = ? OR first_name LIKE ?`;
    
    connection.query(query, [searchCriteria, `%${searchCriteria}%` ], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  router.get('/get-last-new-enrollment-no', (req, res) => {
    // Query to retrieve the last form_no
    const query = 'SELECT MAX(enrollment_id) AS enrollment_id FROM enrollment';
    connection.connect(function(err) {
      if (err) throw err;
      connection.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result)
      });
    });
  });



  router.post("/enrollment-payment",(req,res)=>{
    const { student_id, course_id, batch_no, course_start_date, course_end_date, entrollment_duration, course_fee,totalcourseFee, given_fee, reamin_fee, fee_status, bag_received, book_received, icard_received, t_shirt_received, entrollment_status}=req.body;
  
    const insertQuery = `INSERT INTO enrollment (student_id, course_id, batch_no, course_start_date, course_end_date, entrollment_duration, course_fee,totalcourseFee, given_fee, reamin_fee, fee_status, bag_received, book_received, icard_received, t_shirt_received, entrollment_status) VALUES (?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    connection.query(insertQuery,[student_id, course_id, batch_no, course_start_date, course_end_date, entrollment_duration, course_fee,totalcourseFee, given_fee, reamin_fee, fee_status, bag_received, book_received, icard_received, t_shirt_received, entrollment_status] ,function (err, result) {
      if (err) throw err;
      res.sendStatus(200);
    });
    })


module.exports = router;