import React, { useEffect, useState } from 'react';
import './Form.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Enrollment_Form = () => {
  let currentDate = new Date().toJSON().slice(0, 10);
  const navigate=useNavigate()
  const {id}=useParams()
var emi_rupees=0;
var courseDuratonInMonth=0
  const [formData, setFormData] = useState({
    studentId: id,
    courseId: '',
    batchNo: '',
    courseStartDate: currentDate,
    courseEndDate: '',
    enrollmentDuration: '',
    courseFee: '0',
    emi:'Yes',
    TotalcourseFee:'',
    givenFee: '0',
    remainFee: '0',
    feeStatus: 'Pending',
    bagReceived: 'No',
    bookReceived: 'No',
    icardReceived: 'No',
    tShirtReceived: 'No',
    enrollmentStatus: 'Learning',
  });


  const [courseData, setcourseData] = useState([]);
  const loadData = async () => {
    const getdata = await axios.get(
      `${process.env.REACT_APP_HOST}/api/read_courses`
    );
    setcourseData(getdata.data);
    console.log('getdata.data')
    console.log(getdata.data)
  };

  const [timeTabledata, settimeTabledata] = useState([]);
  const loadTimeTableData=()=>{
    axios.get(`${process.env.REACT_APP_HOST}/api/getTimeTable`) // Replace this with the endpoint for fetching data from the server
    .then((response) => {
      settimeTabledata(response.data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}


  useEffect(() => {
    loadTimeTableData()
    loadData();
  }, []);


  useEffect(() => {
    console.log("formData.emi: " + formData.emi);
    const emiValue = formData.emi.toString();
    var course_fees=parseInt(formData.courseFee)
    if (emiValue === 'No') {
      const updatedCourseFee = course_fees;
      console.log("NO: " + updatedCourseFee);
      setFormData((prevData) => ({
        ...prevData,
        TotalcourseFee: updatedCourseFee,
        remainFee:updatedCourseFee,
      }));
    }if (emiValue === 'Yes') {
      const updatedCourseFee = course_fees +parseInt(emi_rupees);
      console.log("YES: " + updatedCourseFee);
      setFormData((prevData) => ({
        ...prevData,
        TotalcourseFee: updatedCourseFee,
        remainFee:updatedCourseFee,
      }));
    }
    
    //duration set
    let monthforadd=parseInt(courseDuratonInMonth)
    let currentDate = new Date(formData.courseStartDate);
  currentDate.setMonth(currentDate.getMonth() + monthforadd);
  // Convert the updated current date to a JSON string
  const updatedDateJSON = currentDate.toJSON().slice(0, 10);
  console.log("Current Date minus 3 months:", updatedDateJSON);


  setFormData((prevData) => ({
    ...prevData,
    courseEndDate: updatedDateJSON,
  }));


  }, [formData.emi,formData.courseId]);





  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const {
      studentId,
      courseId,
      batchNo,
      courseStartDate,
      courseEndDate,
      enrollmentDuration,
      courseFee,
      TotalcourseFee,
      givenFee,
      remainFee,
      feeStatus,
      bagReceived,
      bookReceived,
      icardReceived,
      tShirtReceived,
      enrollmentStatus,
    } = formData;
  
confirmAlert({
      title: 'Confirm to enrollment',
      message: 'Are you sure to do this.',
      buttons: [{

          label: 'Yes',
          onClick: () => {
            axios.post(`${process.env.REACT_APP_HOST}/enrollment`, {
              student_id: studentId,
              course_id: courseId,
              batch_no: batchNo,
              course_start_date: courseStartDate,
              course_end_date: courseEndDate,
              entrollment_duration: enrollmentDuration,
              course_fee: courseFee,
              totalcourseFee:TotalcourseFee,
              given_fee: givenFee,
              reamin_fee: remainFee,
              fee_status: feeStatus,
              bag_received: bagReceived,
              book_received: bookReceived,
              icard_received: icardReceived,
              t_shirt_received: tShirtReceived,
              entrollment_status: enrollmentStatus,
            })
            .then((response) => {
              
            })
            .catch((error) => {
              console.error("Error submitting data:", error);
            });
            navigate(-1)
        }},
        {
          label: 'No',
          onClick: () => {}
        }]
    });
  };
  


if(formData.courseId){
    console.log(parseInt(formData.courseId))
    let c_id=formData.courseId
    let output = courseData.filter(courseData => courseData.course_id ==c_id);
    let value=output[0].course_fee
    formData.courseFee=value
    emi_rupees=output[0].emi_fee
    courseDuratonInMonth=output[0].course_duration
    formData.enrollmentDuration=courseDuratonInMonth
}

  return (
    <div className='form-container'>
      <div className='form-title'>Enrollment Form</div>
      <div className='form-box'>
        <form onSubmit={handleSubmit}>
          <label>
            Student ID: </label>
            <input
              type="number"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              disabled required
            />
         
          <br />
          <label>Choose Course:</label>
            <select id="courseId" name="courseId" value={formData.courseId} onChange={handleChange}>
            <option value="">Select</option>
            {
                courseData.map((row,index)=>(
            
                    <option value={row.course_id}>{row.course_name}</option>
                   
                ))
            }
            </select>
          <br />
          <label>
            Batch No:
          </label>
           
         <select id="courseId" name="batchNo" value={formData.batchNo} onChange={handleChange}>
            <option value="">Select</option>
            {
              timeTabledata.map((row,index)=>(
                    <option value={row.batch_no}>{row.batch_no}</option>
                ))
            }
          </select>



          <label>
            Course Start Date: </label>
            <input
              type="date"
              name="courseStartDate"
              value={formData.courseStartDate}
              onChange={handleChange}
              required
            />
         
          <br />
          <label>
            Course End Date:
          </label>
            <input
              type="date"
              name="courseEndDate"
              value={formData.courseEndDate}
              onChange={handleChange}
              required
            />
          <br />
          <label>
            Enrollment Duration In Month:
          </label>
            <input
              type="text"
              name="enrollmentDuration"
              value={formData.enrollmentDuration}
              onChange={handleChange}
              required
            />
          <br />


          <label>EMI required</label>
        <select id="emi" name="emi" value={formData.emi} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </select>
        <br />
        <label>Total Course Fee:</label>
            <input
              type="text"
              name="TotalcourseFee"
              value={formData.TotalcourseFee}
              onChange={handleChange}
              required
            />       
          <br />

          <label>Course Fee:</label>
            <input
              type="text"
              name="courseFee"
              value={formData.courseFee}
              onChange={handleChange}
              required
            />       
          <br />
          <label>Bag Received:</label>
        <select id="bagReceived" name="bagReceived" value={formData.bagReceived} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </select>
        <br />


        <label>Book Received:</label>
        <select id="bookReceived" name="bookReceived" value={formData.bookReceived} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </select>
        <br />


        <label>ICard Received:</label>
        <select id="icardReceived" name="icardReceived" value={formData.icardReceived} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </select>
        <br />
        <label>T-Shirt Received:</label>
        <select id="tShirtReceived" name="tShirtReceived" value={formData.tShirtReceived} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </select>


          <br />

          <label>Enrollment Status:</label>
          <select id="entrollment_status" name="enrollmentStatus" value={formData.enrollmentStatus} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Learning">Learning</option>
              <option value="Complete">Complete</option>
              <option value="Left">Left</option>
          </select>





          <br />
          {/* ... */}
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Enrollment_Form;
