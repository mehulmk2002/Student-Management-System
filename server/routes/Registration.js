const express=require('express');
const router=express.Router();
const connection = require("../dbconnection");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

router.get('/search_by_name_id_date', (req, res) => {
    const { search_by_id_name, startDate, endDate } = req.query;
    // let search_by_id_name='l'
    
    let query = `
    SELECT * FROM student 
    WHERE register_date BETWEEN ? AND ?`;

  const queryParams = [startDate, endDate];
  
  if (search_by_id_name) {
    query += ` AND (student_id = ? OR first_name LIKE ?)`;
    queryParams.push(search_by_id_name, `%${search_by_id_name}%`);
  }

    connection.query(query, queryParams, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  




// ... Other server configuration ...

const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname +
          '-' +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  });
  
  const upload = multer({ storage });
  
  // Update student photo and delete previous photo
  router.put('/students/:student_id/photo', upload.single('upload_photo'), (req, res) => {
    const studentId = req.params.student_id;
    const newPhotoFilename = req.file.filename;
    // Query to update the student's photo
    const updatePhotoQuery = 'UPDATE student SET upload_photo = ? WHERE student_id = ?';
  
    connection.query(updatePhotoQuery, [newPhotoFilename, studentId], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating student photo' });
      }
      return res.status(200).json({ message: 'updated student photo' });
    });
  });

// Update identity document endpoint
router.put('/student/:student_id/update_identity_document', upload.single('new_upload_identity_document'), (req, res) => {
  const studentId = req.params.student_id;
  const newIdentityDocument = req.file.filename;
  // Query to update the identity document of a student
  const updateQuery = 'UPDATE student SET upload_identity_document = ? WHERE student_id = ?';

  // Query to fetch the previous identity document filename
  const fetchPreviousFilenameQuery = 'SELECT upload_identity_document FROM student WHERE student_id = ?';

  // Execute the fetch query to get the previous filename
  connection.query(fetchPreviousFilenameQuery, [studentId], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Error fetching previous identity document filename' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Student not found' });
        return;
      }

      const previousFilename = results[0].upload_identity_document;

      // Execute the update query to change the identity document filename
      connection.query(updateQuery, [newIdentityDocument, studentId], (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ message: 'Error updating identity document' });
        } else {
          // Remove the previous identity document from the server-side directory
          const filePath = path.join('./uploads', previousFilename);
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log('Previous identity document deleted');
            }
          });

          res.status(200).json({ message: 'Identity document updated successfully' });
        }
      });
    }
  });
});





// API endpoint to update last_qualification_marksheet
router.put('/student/:student_id/updateMarksheet', upload.single('upload_last_qualification_marksheet'), (req, res) => {
  const { student_id } = req.params;
  const newMarksheet = req.file;
  
  if (!newMarksheet) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  connection.query('UPDATE student SET upload_last_qualification_marksheet = ? WHERE student_id = ?', [newMarksheet.filename, student_id], (updateError) => {
    if (updateError) {
      return res.status(500).json({ message: 'Error updating marksheet' });
    }

    res.status(200).json({ message: 'Marksheet updated successfully' });
    console.log("Marksheet updated successfully")
  });

});




module.exports = router;