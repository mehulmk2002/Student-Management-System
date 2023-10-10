const express=require('express')
const router=express.Router();
const connection = require("../dbconnection");

router.post("/",(req,res)=>{
    const {full_name,course_name, gender, address, phone_number, inquiry_date, expected_joining_date, inquiry_status,remark_note,education}=req.body;
    var sql = "INSERT INTO admission_inquiry (full_name, gender, course_name, address, phone_number, inquiry_date, expected_joining_date, inquiry_status,remark_note,education)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    connection.query(sql,[full_name,gender, course_name, address, phone_number, inquiry_date, expected_joining_date, inquiry_status,remark_note,education] ,function (err, result) {
        if (err) throw err;
        let success="Inserted Data into inquiry"
        res.json({success});
      });
})

router.get('/get-last-form-no', (req, res) => {
 
  const query = 'SELECT MAX(form_no) AS last_form_no FROM admission_inquiry';
  connection.connect(function(err) {
    if (err) throw err;
    connection.query(query, function (err, result, fields) {
      if (err) throw err;
      res.send(result)
    });
  });
});


router.post("/changeInquiryStatus/:id",(req,res)=>{
  const {id}=req.params
var inquiry_status="Confirm"
  const sql = "UPDATE admission_inquiry SET inquiry_status = ? WHERE form_no = ?";

  connection.query(sql,[inquiry_status, id],function (err, result) {
      if (err) throw err;
    });
  console.log("inquiry Status update SUCCSSEFULLY")
})



router.get('/inquiries', async (req, res) => {
  
  try {
    const { status, fromDate, toDate } = req.query;
    let whereClause = '';
    const params = [];

    if (status) {
      whereClause += 'inquiry_status = ? ';
      params.push(status);
    }

    if (fromDate && toDate) {
      if (status) whereClause += 'AND ';
      whereClause += 'inquiry_date BETWEEN ? AND ?';
      params.push(fromDate, toDate);
    }

    if (whereClause) {
      whereClause = 'WHERE ' + whereClause;
    }

    const sql = `SELECT * FROM admission_inquiry ${whereClause}`;
   
    connection.query(sql, params, (err, results) => {
      if (err) throw err;
      res.json(results);
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Update
router.post("/update/:id",(req,res)=>{
    const {id}=req.params
  
    const {full_name,course_name, gender, address, phone_number, inquiry_date, expected_joining_date, inquiry_status,remark_note,education}=req.body;
    const sql = "UPDATE admission_inquiry SET full_name = ?, gender = ?, course_name = ?, address = ?, phone_number = ?, inquiry_date = ?, expected_joining_date = ?, inquiry_status = ?,remark_note=?,education=? WHERE form_no = ?";
  
    connection.query(sql,[full_name, gender, course_name, address, phone_number, inquiry_date, expected_joining_date, inquiry_status,remark_note,education, id],function (err, result) {
        if (err) throw err;
      });
    console.log("New Inquiry update SUCCSSEFULLY")
  })

//Read whole Data
  router.get("/api",(req,res)=>{

    connection.connect(function(err) {
      if (err) throw err;
      connection.query("SELECT * FROM admission_inquiry", function (err, result, fields) {
        if (err) throw err;
        
        res.send(result)
      });
    });
  });


//Read Specific Data
router.get("/api/:id",(req,res)=>{
    const {id}=req.params;
    connection.connect(function(err) {
        if (err) throw err;
        connection.query("SELECT * FROM admission_inquiry where form_no=?",id,function (err, result, fields) {
          if (err) throw err;
          res.send(result)
        });
      });
    });


//1.5 Delete data
router.delete("/:id",(req,res)=>{
    const {id}=req.params;
    let sql="delete from admission_inquiry where form_no=? "
    connection.query(sql,[id] ,function (err, result) {
      if (err) throw err;
    });
    });



    
    module.exports = router;