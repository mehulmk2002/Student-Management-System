//imported library
const express =require("express");
const multer = require('multer');
const path = require('path');
var mysql = require('mysql2');
const cors=require('cors')
const ejs = require('ejs');
const bodyParser=require('body-parser');
const puppeteer = require('puppeteer'); //for pdf converting
const bwipjs = require('bwip-js');
const fs = require('fs');
const numberToWords = require('number-to-words');

const app=express();
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));
app.use('/pdfs', express.static('pdfs'));
app.set('view engine', 'ejs')

const adminLoginRout=require("./routes/AdminLogin")
const dashboard=require('./routes/Dashboard')
const newExpenses=require('./routes/Expenses')
const inquiryRout=require('./routes/Inquiry')
const EnrollmentRout=require('./routes/Enrollment')
const PaymentRout=require('./routes/Payment')
const CertificateRout=require('./routes/Certificate')
const RegistrationRout=require('./routes/Registration')
const AttendanceRout=require('./routes/Attendance')
const TimeTableRout=require('./routes/TimeTable')
const GalleryRout=require('./routes/Gallery')
const OurCoursesRout=require('./routes/OurCourses')
//Database Connection
var con = require("./dbconnection");


app.use('/dashboard',dashboard)  
app.use('/adminLogin',adminLoginRout)
app.use('/expenses',newExpenses)
app.use('/inquiry',inquiryRout)
app.use('/enrollment',EnrollmentRout)
app.use('/Payment',PaymentRout)
app.use('/certificate',CertificateRout)
app.use('/registration',RegistrationRout)
app.use('/attendance',AttendanceRout)
app.use('/timetable',TimeTableRout)
app.use('/gallery',GalleryRout);
app.use('/ourCourses',OurCoursesRout);
//For dashboard,adminLogin,expenses,inquiry,attendance,timetable,gallery,courses publish has => separate Rout
//For Registration,certificate,enrollment,Payment has some routes here and some created separatly
//For IDCard and Receipt Generating code written here

//=====2)Registration Operastion==================================================================================================
// 2.1 Insert Data
//2.1.1 Set up storage for uploaded files
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

//2.1.2 Initialize multer middleware
const upload = multer({ storage });

//2.1.3 Query Fire
app.post('/api/upload', upload.fields([
  { name: 'upload_identity_document' },
  { name: 'upload_photo' },
  { name: 'upload_last_qualification_marksheet' },
]), (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    Date_Of_Birth,
    gender,
    address,
    email,
    phone_number,
    guardian_name,
    guardian_phone_number,
    last_qualification,
    board_university,
    percentage,
  } = req.body;
  let current_Date = new Date().toJSON().slice(0, 10);
  const upload_identity_document = req.files['upload_identity_document'][0].filename;
  const upload_photo = req.files['upload_photo'][0].filename;
  const upload_last_qualification_marksheet = req.files['upload_last_qualification_marksheet'][0].filename;

  const sql =
    'INSERT INTO student (first_name, middle_name, last_name, Date_Of_Birth, gender, address, email, phone_number, guardian_name, guardian_phone_number, last_qualification, board_university, percentage,register_date, upload_identity_document, upload_photo, upload_last_qualification_marksheet) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
  con.query(
    sql,
    [
      first_name,
      middle_name,
      last_name,
      Date_Of_Birth,
      gender,
      address,
      email,
      phone_number,
      guardian_name,
      guardian_phone_number,
      last_qualification,
      board_university,
      percentage,
      current_Date,
      upload_identity_document,
      upload_photo,
      upload_last_qualification_marksheet,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: 'Error uploading files' });
      } else {
        res.status(200).json({ message: 'Files uploaded successfully' });
      }
    }
  );
});

///===Update student Detail
app.put('/update/stud_details/:id', (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    Date_Of_Birth,
    gender,
    address,
    email,
    phone_number,
    guardian_name,
    guardian_phone_number,
    last_qualification,
    board_university,
    percentage,
  } = req.body;

  const sql =
    'UPDATE student SET first_name=?, middle_name=?, last_name=?, Date_Of_Birth=?, gender=?, address=?, email=?, phone_number=?, guardian_name=?, guardian_phone_number=?, last_qualification=?, board_university=?, percentage=? WHERE student_id=?';

  con.query(
    sql,
    [
      first_name,
      middle_name,
      last_name,
      Date_Of_Birth,
      gender,
      address,
      email,
      phone_number,
      guardian_name,
      guardian_phone_number,
      last_qualification,
      board_university,
      percentage,
      req.params.id, // Assuming you pass the ID in the URL parameters
    ],
    (err, result) => {
      if (err) {
        console.error('Error updating student:', err);
        res.status(500).send('Error updating student');
      } else {
        res.sendStatus(200);
      }
    }
  );
});


//2.2 Read All Data
app.get("/api/view_registered",(req,res)=>{
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM student", function (err, result, fields) {
      if (err) throw err;
      res.send(result)
    });
  });

});

//2.3 Read Specific Data
app.get("/api/view_student_profile/:id",(req,res)=>{
  const {id}=req.params;
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM student where student_id=?",[id], function (err, result, fields) {
      if (err) throw err;
      res.send(result)
    });
  });
});

//2.4 Update Data

//2.5 Delete Data
app.delete("/api/student_profile/remove/:id",(req,res)=>{
  const {id}=req.params;
  let sql="delete from student where student_id=? "
  con.query(sql,[id] ,function (err, result) {
    if (err) throw err;
  });
  });


//=====3)Enrollment Operation======================================================================================================
//3.1 Insert Data


//3.2 Read Specific Data
app.get("/api/enrollment/:id",(req,res)=>{
  const {id}=req.params;
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM enrollment where student_id=?",[id], function (err, result, fields) {
      if (err) throw err;
      res.send(result)
    });
  });
});


//3.3 Read All Data
app.get("/api/enrollment",(req,res)=>{
  
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM enrollment", function (err, result, fields) {
      if (err) throw err;
      res.send(result)
    });
  });
});

//3.4 Read Specific Data for update
app.get("/api/up_enrollment/:id",(req,res)=>{
  const {id}=req.params;
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM enrollment where enrollment_id=?",[id], function (err, result, fields) {
      if (err) throw err;
      res.send(result)
    });
  });
});


//3.5 Update
app.put("/up_enrollment/:id", (req, res) => {
  const enrollmentId = req.params.id;
  const { student_id, course_id, batch_no, course_start_date, course_end_date, entrollment_duration, course_fee, given_fee, reamin_fee, fee_status, bag_received, book_received, icard_received, t_shirt_received, entrollment_status } = req.body;

  const updateQuery = `UPDATE enrollment SET student_id = ?, course_id = ?, batch_no = ?, course_start_date = ?, course_end_date = ?, entrollment_duration = ?, course_fee = ?, given_fee = ?, reamin_fee = ?, fee_status = ?, bag_received = ?, book_received = ?, icard_received = ?, t_shirt_received = ?, entrollment_status = ? WHERE enrollment_id = ?`;

  con.query(updateQuery, [student_id, course_id, batch_no, course_start_date, course_end_date, entrollment_duration, course_fee, given_fee, reamin_fee, fee_status, bag_received, book_received, icard_received, t_shirt_received, entrollment_status, enrollmentId], (err, result) => {
    if (err) {
      console.error("Error updating enrollment data:", err);
      res.status(500).send("Error updating enrollment data");
    } else {
      res.send("Enrollment data updated successfully");
    }
  });
});


//3.6 Delete
app.delete("/del_enrollment/remove/:id",(req,res)=>{
  const {id}=req.params;
  let sql="delete from enrollment where enrollment_id=?"
  con.query(sql,[id] ,function (err, result) {
    if (err) throw err;
  });
  });





//=====4)Course Operastion======================================================================================
//4.1 Insert Data and update
app.post("/courseform", (req, res) => {
  const { course_name, course_duration, course_description, course_fee,emi_fee, course_eligibility } = req.body;

  if (req.body.course_id) {
    // Update existing course
    const { course_id } = req.body;
    let sql = "UPDATE course SET course_name=?, course_duration=?, course_description=?, course_fee=?,emi_fee=?, course_eligibility=? WHERE course_id=?";
    con.query(sql, [course_name, course_duration, course_description, course_fee,emi_fee, course_eligibility, course_id], function (err, result) {
      if (err) throw err;
     
      res.sendStatus(200);
    });
  } else {
    // Create new course
    let sql = "INSERT INTO course (course_name, course_duration, course_description, course_fee,emi_fee, course_eligibility) VALUES (?, ?, ?, ?, ?,?)";
    con.query(sql, [course_name, course_duration, course_description, course_fee, emi_fee, course_eligibility], function (err, result) {
      if (err) throw err;
      res.sendStatus(200);
    });
  }
});


//4.2 Delete Data
app.delete("/api/course/remove/:id",(req,res)=>{
  const {id}=req.params;
  let sql="delete from course where course_id=? "
  con.query(sql,[id] ,function (err, result) {
    if (err) throw err;
  });
  });


//4.3 Read All Data
app.get("/api/read_courses",(req,res)=>{
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM course", function (err, result, fields) {
      if (err) throw err;
      res.send(result)
    });
  });

}); 

//=====5)Payment Operastion============================================================================
app.post("/payment_data",(req,res)=>{
  const { entrollment_id,student_id, course_id, payment_amount, payment_mode}=req.body;
  var enrl_course_id='0'

    con.query("SELECT * FROM enrollment where enrollment_id=?",[entrollment_id], function (err, result, fields) {
      if (err) throw err;
      //res.send(result)
      enrl_course_id=result[0].course_id


      let sql="INSERT INTO payment (entrollment_id,student_id, course_id, payment_amount, payment_date, payment_mode) VALUES (?, ?,?, ?, CURRENT_TIMESTAMP, ?)"
      con.query(sql,[entrollment_id,student_id, enrl_course_id, payment_amount, payment_mode] ,function (err, result) {
        if (err) throw err;
        res.send({status:'success',msg:'Generated Cirti'})
      });
    });

  
//select student data and update
var total_given_fee=0;
var total_reamin_fee=0;
  con.query("SELECT totalcourseFee, given_fee, reamin_fee, fee_status FROM enrollment where student_id=? AND enrollment_id=?",[student_id,entrollment_id], function (err, result, fields) {
    if (err) throw err;
    total_given_fee=parseInt(result[0].given_fee)+parseInt(payment_amount);
    total_reamin_fee=parseInt(result[0].totalcourseFee)-total_given_fee;
    
    if (parseInt(total_reamin_fee) <= 0) {
    let  updateQuery = "UPDATE enrollment SET given_fee = ?, fee_status = 'Done', reamin_fee = ? WHERE enrollment_id = ?";
      con.query(updateQuery,[total_given_fee,total_reamin_fee,entrollment_id],function (err, result) {
        if (err) throw err;
      });  
    }
    
    else{
     let updateQuery = `UPDATE enrollment SET given_fee = ?, reamin_fee = ? WHERE enrollment_id = ?`;
     con.query(updateQuery,[total_given_fee,total_reamin_fee,entrollment_id],function (err, result) {
      if (err) throw err;
    });  
    } 

  
  });
  })


//2.3 Read Specific Data
app.get("/api/payment/:id",(req,res)=>{
  const {id}=req.params;
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM payment where student_id=?",[id], function (err, result, fields) {
      if (err) throw err;
      res.send(result)
    });
  });
});

app.delete("/del_payment/remove/:id",(req,res)=>{
  const {id}=req.params;
  let sql="delete from payment where payment_id=?"
  con.query(sql,[id] ,function (err, result) {
    if (err) throw err;
  });
  });


  app.get("/api/up_payment/:id",(req,res)=>{
    const {id}=req.params;
    let sql="SELECT * from payment where payment_id=?"
    con.query(sql,[id] ,function (err, result) {
      if (err) throw err;
      res.send(result)
    });
    });

    app.put("/update/payment_data/:id", (req, res) => {
      const { id } = req.params;
      const { entrollment_id, student_id, course_id, payment_amount, payment_mode } = req.body;
    
      let sql = "UPDATE payment SET entrollment_id = ?, student_id = ?, course_id = ?, payment_amount = ?, payment_mode = ? WHERE payment_id = ?";
      con.query(sql, [entrollment_id, student_id, course_id, payment_amount, payment_mode, id], function (err, result) {
        if (err) throw err;
        res.sendStatus(200);
      });
    });
    






///certificates==================================================================================================================================

app.get('/api/certificates', (req, res) => {
  const sql = 'SELECT * FROM certificate';

  con.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching certificates:', err);
      res.status(500).send('Error fetching certificates');
    } else {
      res.json(result);
    }
  });
});


app.delete("/api/deleteCertificate/remove/:id",(req,res)=>{
  const {id}=req.params;
  let sql="delete from certificate where certificate_id=? "
  con.query(sql,[id] ,function (err, result) {
    if (err) throw err;
  });
  });





///Select certificates-distribution============================================================================================
app.post('/api/certificate-distribution', (req, res) => {
  const {
    certificate_id,
    student_id,
    course_id,
    certificate_distribution_date,
    certificate_received_by,
  } = req.body;

  const sql =
    'INSERT INTO certificate_distribution (certificate_id, student_id, course_id, certificate_distribution_date, certificate_received_by) VALUES (?, ?, ?, ?, ?)';

  con.query(
    sql,
    [certificate_id, student_id, course_id, certificate_distribution_date, certificate_received_by],
    (err, result) => {
      if (err) {
        console.error('Error inserting certificate distribution:', err);
        res.status(500).send('Error inserting certificate distribution');
      } else {
        res.sendStatus(200);
      }
    }
  );
});


app.get('/api/get_certificate-dist', (req, res) => {
  const sql = 'SELECT * FROM certificate_distribution';

  con.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching certificates:', err);
      res.status(500).send('Error fetching certificates');
    } else {
      res.json(result);
    }
  });
});



app.delete("/api/deleteCertificateDis/remove/:id",(req,res)=>{
  const {id}=req.params;
  let sql="delete from certificate_distribution where certificate_distribution_id=? "
  con.query(sql,[id] ,function (err, result) {
    if (err) throw err;
  });
  });

//Download Receipt============================================================================

app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, 'pdfs', 'sample.pdf');
  res.sendFile(filePath);
});

app.get('/receipt-download/:id', async (req, res) => { 
  const id=req.params.id
  let payment_receipt_detail={}
  const sql = 'SELECT s.first_name, s.last_name, s.middle_name,e.given_fee, e.reamin_fee,e.course_fee, c.course_name, c.course_duration, p.payment_amount, p.payment_date,p.payment_id FROM payment p JOIN enrollment e ON p.entrollment_id = e.enrollment_id JOIN student s ON e.student_id = s.student_id JOIN course c ON e.course_id = c.course_id WHERE p.payment_id = ?;'; 

  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error fetching data from the database:', err);
      res.status(500).json({ error: 'Error fetching data from the database' });
    } else if (result.length === 0) {
      
      res.status(404).json({ message: 'Batch not found' });
    } else {
      payment_receipt_detail=result[0]     
    }
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  var event = new Date(payment_receipt_detail.payment_date.toString());
  let receipt_date = JSON.stringify(event)
  receipt_date = receipt_date.slice(1,11)
  
  const numberInWords = numberToWords.toWords(parseInt(payment_receipt_detail.payment_amount))

  const data = {...payment_receipt_detail, numberInWords: numberInWords,payment_date:receipt_date};

  
  const template = fs.readFileSync('fee_receipt.ejs', 'utf-8');
  const htmlContent = ejs.render(template, data);
  
  await page.setContent(htmlContent);
  
  const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
  });

  fs.writeFileSync('fee_receipt.pdf', pdfBuffer);
  await browser.close();
  res.send(pdfBuffer);
});

//ID Card Generator================================================================================

app.get('/icard-download', async (req, res) => { 
  const enrl_id_list = req.query.enrl_id_list || [];
  
  for (let i = 0; i < enrl_id_list.length; i++) {
    function formatToFixedDigits(number, digits) {
      const numberString = String(number);
      const leadingZeros = '0'.repeat(digits - numberString.length);
      return leadingZeros + numberString;
    }
    
    const fixedDigitsNumber = formatToFixedDigits(enrl_id_list[i], 12);
    const barcode_Data =""+fixedDigitsNumber;

    const barcodeOptions = {
      bcid: 'code128', 
      text: barcode_Data, 
      scale: 3, 
      height: 10, 
      includetext: true, 
      textxalign: 'center', 
    };
    
    // Generate the barcode
    bwipjs.toBuffer(barcodeOptions, (err, pngBuffer) => {
      if (err) {
        console.error('Error generating barcode:', err);
        return;
      }
      const fs = require('fs');
      barcodefilename='barcode_'+enrl_id_list[i]+'.png'
     // fs.rmdir('./uploads/barcode')
      //fs.mkdirSync('./uploads/barcode');
      fs.writeFileSync('./uploads/barcode/'+barcodefilename, pngBuffer);
    });
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let datal=[]
try {
  for (let i = 0; i < enrl_id_list.length; i++) {
    const enrollmentId = enrl_id_list[i];
    
    const idcard_detail = await new Promise((resolve, reject) => {
      const sql = 'SELECT s.student_id, s.first_name, s.middle_name, s.last_name, s.phone_number, s.Date_Of_Birth, s.upload_photo, e.enrollment_id, e.course_end_date, e.course_end_date, c.course_name FROM enrollment e JOIN student s ON e.student_id = s.student_id JOIN course c ON e.course_id = c.course_id WHERE e.enrollment_id = ?;';
      
      con.query(sql, [enrollmentId], (err, result) => {
        if (err) {
          reject(err);
        } else if (result.length === 0) {
          reject(new Error('Batch not found'));
        } else {
        resolve(result[0]);
      }
    });
  });

  var event = new Date(idcard_detail.course_end_date);
  event.setMonth(event.getMonth() + 3);
  let valid_date = JSON.stringify(event)
  valid_date = valid_date.slice(1,11)
        
   const student_idinsixDig = formatToFixedDigits(idcard_detail.student_id, 6);

   const idcard_detailforpush = {...idcard_detail,validationDate:valid_date,student_id:student_idinsixDig};

   datal.push(idcard_detailforpush);
  }
}catch (error) {
  console.error('Error:', error);
  res.status(500).json({ error: 'Error fetching data from the database' });
}
  
  const template = fs.readFileSync('StudentIDcard.ejs', 'utf-8');
  const htmlContent = ejs.render(template, {datal});
  
  await page.setContent(htmlContent);

  
  const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      
  });

  await fs.writeFileSync('fee_receipt.pdf', pdfBuffer);
  await fs.writeFileSync('./uploads/fee_receipt.pdf', pdfBuffer);
  await browser.close();

  res.send(pdfBuffer);
});

//Only for one student============================================================================

app.get('/stud-icard-download/:id', async (req, res) => { 
  const id=req.params.id
  // Barcode text or data
  
  function formatToFixedDigits(number, digits) {
    const numberString = String(number);
    const leadingZeros = '0'.repeat(digits - numberString.length);
    return leadingZeros + numberString;
  }
  
  const originalNumber = id;
  const fixedDigitsNumber = formatToFixedDigits(originalNumber, 12);

  const barcodeData =""+fixedDigitsNumber;

  const barcodeOptions = {
    bcid: 'code128', 
    text: barcodeData, 
    scale: 3, 
    height: 10, 
    includetext: true, 
    textxalign: 'center', 
  };
  
  
  bwipjs.toBuffer(barcodeOptions, (err, pngBuffer) => {
    if (err) {
      console.error('Error generating barcode:', err);
      return;
    }
    const fs = require('fs');
    fs.writeFileSync('./uploads/barcode/barcode_'+id+'.png', pngBuffer);
  });

  let idcard_detail={}
  const sql = 'SELECT s.student_id, s.first_name, s.middle_name, s.last_name,s.phone_number, s.Date_Of_Birth, s.upload_photo, e.enrollment_id,e.course_end_date, e.course_end_date, c.course_name FROM enrollment e  JOIN student s ON e.student_id = s.student_id  JOIN course c ON e.course_id = c.course_id  WHERE e.enrollment_id = ?;'
  
  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error fetching data from the database:', err);
      res.status(500).json({ error: 'Error fetching data from the database' });
    } else if (result.length === 0) {
      
      res.status(404).json({ message: 'Batch not found' });
    } else {
      idcard_detail=result[0]            
    }
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

   var event = new Date(idcard_detail.course_end_date);
   event.setMonth(event.getMonth() + 3);
   let valid_date = JSON.stringify(event)
   valid_date = valid_date.slice(1,11)
  
  const student_idinsixDig = formatToFixedDigits(idcard_detail.student_id, 6);
  const idcard_detailforpush = {...idcard_detail,validationDate:valid_date,student_id_six:student_idinsixDig};
  const data = {...idcard_detail,validationDate:valid_date,student_id_six:student_idinsixDig};

  let datal=[]

  datal.push(data)
  
  const template = fs.readFileSync('StudentIDcard.ejs', 'utf-8');
  const htmlContent = ejs.render(template, {datal});
  
  await page.setContent(htmlContent);

  
  const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true, 
  });

  const pngBuffer = await page.screenshot({
    encoding: 'binary', 
    fullPage: true, 
  });
  
  fs.writeFileSync('student_id_card.png', pngBuffer);

  fs.writeFileSync('fee_receipt.pdf', pdfBuffer);

  await browser.close();

  res.send(pdfBuffer);
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
