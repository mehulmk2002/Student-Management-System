const express = require("express");
const connection = require("../dbconnection");
const router = express.Router();


//New Students in Current Month
router.get("/newStudent/:date", (req, res) => {
  const { date } = req.params;
  const [year, month] = date.split("-");

  const query = `
    SELECT
      CONCAT(YEAR(register_date), '-', LPAD(MONTH(register_date), 2, '0')) AS registration_month,
      COUNT(*) AS student_count
    FROM student
    WHERE YEAR(register_date) = ? AND MONTH(register_date) = ?
    GROUP BY YEAR(register_date), MONTH(register_date)
    ORDER BY YEAR(register_date), MONTH(register_date)
  `;
  connection.query(query, [year, month], (error, results) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.json(results);
    }
  });
});

//Number of Students Pending for Confirmation
router.get("/pendingStudentCount", (req, res) => {
    const query = `
      SELECT COUNT(*) AS pending_student_count
      FROM admission_inquiry
      WHERE inquiry_status IS NULL OR inquiry_status = 'Pending'
    `;
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred" });
      } else {
        res.json(results[0]);
      }
    });
  });

//Number of Students Learning

router.get("/learningStudentCount", (req, res) => {
  const query = `
    SELECT COUNT(*) AS learning_student_count
    FROM enrollment
    WHERE entrollment_status = 'learning'
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.json(results[0]);
    }
  });
});

//Number of students that Left the Course
  router.get("/leftStudentsCount", (req, res) => {
    const query = `
      SELECT COUNT(*) AS left_students_count
      FROM enrollment
      WHERE entrollment_status = 'left'
      AND STR_TO_DATE(course_end_date, '%Y-%m-%d') > CURDATE() 
    `;
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred" });
      } else {
        res.json(results[0]);
      }
    });
  });


//Total Fees collected in Today and Number of Students Paid the fees
  router.get('/paymentStats', (req, res) => {
    const query = `SELECT COUNT(payment_id) AS payment_count, SUM(payment_amount) AS total_amount
                   FROM payment
                   WHERE DATE(payment_date) = CURDATE()`;
    
    connection.query(query, (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    });
  });


//Batch-wise and Course-wise Student Counts
router.get("/batchStudentCounts", (req, res) => {
  const query = `
  SELECT e.batch_no, c.course_name, COUNT(*) AS student_count
  FROM enrollment e
  JOIN course c ON e.course_id = c.course_id
  GROUP BY e.batch_no, c.course_name
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.json(results);
    }
  });
});

//batch wise Student Counts
router.get("/batchStudentCounts", (req, res) => {
  const query = `SELECT batch_no, SUM(student_count) AS total_students
  FROM (
    SELECT batch_no, COUNT(*) AS student_count
    FROM enrollment
    GROUP BY batch_no
  ) AS batch_counts
  GROUP BY batch_no
  `;
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.json(results);
    }
  });
});





module.exports = router;
