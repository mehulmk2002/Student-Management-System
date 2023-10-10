const express =require('express');
const router=express.Router();
const connection=require('../dbconnection');

router.get('/',(req,res)=>{
    const sqlQuery='select * from our_courses';
    connection.query(sqlQuery,(error,result)=>{
        if(error){
            console.log(error);
            res.status(500).send('Error retrieving data');
             return;
        }
        res.status(200).json(result);
    })
})


router.post('/', (req, res) => {
 
    const {
      image_url,
      course_name,
      course_description,
      course_duration,
      course_price,
    } = req.body;
  
    const sql = `INSERT INTO our_courses (image_url, course_name, course_description, course_duration, course_price)
                 VALUES (?, ?, ?, ?, ?)`;
  
    connection.query(
      sql,
      [image_url, course_name, course_description, course_duration, course_price],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Error inserting data' });
        } else {
          res.json({ message: 'Data inserted successfully' });
        }
      }
    );
  });


  router.delete('/:id', (req, res) => {
    console.log("DELETE COURSES")
    const courseId = req.params.id;
  
    const sql = `DELETE FROM our_courses WHERE id = ?`;
  
    connection.query(sql, [courseId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting the course' });
      } else {
        res.json({ message: 'Course deleted successfully' });
      }
    });
  });



module.exports=router