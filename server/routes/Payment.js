const express=require('express');
const router=express.Router();
const connection = require("../dbconnection");

router.get('/search/:searchCriteria', (req, res) => {
    const { searchCriteria } = req.params;
    const query = `SELECT
    s.upload_photo AS Student_Photo,
    s.student_id AS Student_ID,
    s.first_name AS First_Name,
    s.middle_name AS Middle_Name,
    s.last_name AS Last_Name,
    e.enrollment_id AS Enrollment_ID,
    c.course_name AS Course_Name,
    c.course_duration AS Course_Duration,
    e.course_start_date AS Start_Date,
    e.course_end_date AS End_Date,
    e.batch_no AS Batch_No,
    e.course_id AS Course_ID,
    e.entrollment_status AS Status,
    e.totalcourseFee AS Total_Course_Fee,
    e.given_fee AS Total_Paid_Amount,
    e.reamin_fee AS Remaining_Amount
FROM student s
LEFT JOIN enrollment e ON s.student_id = e.student_id
LEFT JOIN course c ON e.course_id = c.course_id
WHERE s.student_id = ? OR s.first_name LIKE ? OR e.enrollment_id = ?;
`;
    
    connection.query(query, [searchCriteria, `%${searchCriteria}%`,searchCriteria ], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });



  router.post("/first_payment",(req,res)=>{
    const { entrollment_id,student_id, course_id, payment_amount, payment_mode}=req.body;
    
        let sql="INSERT INTO payment (entrollment_id,student_id, course_id, payment_amount, payment_date, payment_mode) VALUES (?, ?,?, ?, CURRENT_TIMESTAMP, ?)"
        connection.query(sql,[entrollment_id,student_id, course_id, payment_amount, payment_mode] ,function (err, result) {
          if (err) throw err;
          res.sendStatus(200);
        });
      //select student data and update
    })


module.exports = router;