import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Update_Enrollment = () => {
  const { id } = useParams();
  
  const navigate=useNavigate()
  const [enrollmentData, setEnrollmentData] = useState({
    enrollment_id: 1,
    student_id: '',
    course_id: '',
    batch_no: '',
    course_start_date: '',
    course_end_date: '',
    entrollment_duration: '',
    course_fee: '',
    given_fee: '',
    reamin_fee: '',
    fee_status: '',
    bag_received: '',
    book_received: '',
    icard_received: '',
    t_shirt_received: '',
    entrollment_status: '',
  });

  const loadEnrollmentData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_HOST}/api/up_enrollment/${id}`);
      const data = response.data[0];
      setEnrollmentData(data);
    } catch (error) {
      console.error("Error retrieving enrollment data:", error);
    }
  };

  useEffect(() => {
    loadEnrollmentData();
  }, [id]);

  useEffect(() => {
   console.log(enrollmentData)
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEnrollmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    confirmAlert({
      title: 'Confirm to Update',
      message: 'Are you sure to do this.',
      buttons: [
        {

          label: 'Yes',
          onClick: () => {
                    axios
                      .put(`${process.env.REACT_APP_HOST}/up_enrollment/${id}`, enrollmentData)
                      .then((response) => {
                        console.log("Data successfully updated:", response.data);
                        navigate(-1)
                        // Add any other logic or actions here after successful update
                      })
                      .catch((error) => {
                        console.error("Error updating data:", error);
                        // Add any error handling logic here
                      });
        }},
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
    


  };



  const [courseData, setcourseData] = useState([]);
  const loadData = async () => {
    const getdata = await axios.get(
      `${process.env.REACT_APP_HOST}/api/read_courses`
    );
    setcourseData(getdata.data);
    console.log('getdata.data')
    console.log(getdata.data)
  };
  useEffect(() => {
    loadData();
  }, []);


  return (
    <div>
    <div className="container mt-5">
        <h1  style={{textAlign:'center', color:'blueviolet'}}>Enrollment Update</h1>
     
    
      <form onSubmit={handleSubmit}>
      <div class="row">
      <div class="col-4 form-group">
        <label> Student ID:</label>
        <input class="form-control" type="number" name="student_id" value={enrollmentData.student_id} onChange={handleChange} disabled required />
     </div>

     <div class="col-4 form-group">
          <label>Course ID:</label>
            <select class="form-control" id="course_id" name="course_id" value={enrollmentData.course_id} onChange={handleChange}>
            <option value="">Select</option>
            {
                courseData.map((row,index)=>(
            
                    <option value={row.course_id}>{row.course_name}</option>
                   
                ))
            }
            </select>
            </div>
            <div class="col-4 form-group">
        <label> Batch No:</label>
        <input class="form-control" type="text" name="batch_no" value={enrollmentData.batch_no} onChange={handleChange} required />

</div>
        <div class="col-4 form-group">
         <label>
            Course Start Date: </label>
            <input class="form-control"
              type="date"
              name="course_start_date"
              value={enrollmentData.course_start_date}
              onChange={handleChange}
              required
            />

</div>
<div class="col-4 form-group">
         <label>
            Course End Date: </label>
            <input class="form-control"
              type="date"
              name="course_end_date"
              value={enrollmentData.course_end_date}
              onChange={handleChange}
              required
            />
         </div>


         <div class="col-4 form-group">
         <label>enrollment_duration:</label>
            <input class="form-control"
              type="text"
              name="enrollment_duration"
              value={enrollmentData.entrollment_duration}
              onChange={handleChange}
              required
            />
            </div>
</div>

<div class="row">
<div class="col-4 form-group">
         <label>Course Fee:</label>
            <input class="form-control"
              type="text"
              name="course_fee"
              value={enrollmentData.course_fee}
              onChange={handleChange}
              required
            />
            </div>

<div class="col-4 form-group">
         <label>Given Fee:</label>
            <input class="form-control"
              type="text"
              name="given_fee"
              value={enrollmentData.given_fee}
              onChange={handleChange}
              required
            />
            </div>
<div class="col-4 form-group">
         <label>Remaining Fee:</label>
            <input class="form-control"
              type="text"
              name="reamin_fee"
              value={enrollmentData.reamin_fee}
              onChange={handleChange}
              required
            />
          </div>
</div>
 <div class="row">

 <div class="col-4 form-group">
        <label>Bag Received:</label>
        <select class="form-control" id="bag_received" name="bag_received" value={enrollmentData.bag_received} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </select></div>
        
 
        <div class="col-4 form-group">
        <label>Book Received:</label>
        <select class="form-control" id="book_received" name="book_received" value={enrollmentData.book_received} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </select></div>
       

        <div class="col-4 form-group">
        <label>ICard Received:</label>
        <select class="form-control" id="icard_received" name="icard_received" value={enrollmentData.icard_received} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </select>
        </div>

        <div class="col-4 form-group">
        <label>T-Shirt Received:</label>
        <select class="form-control" id="t_shirt_received" name="t_shirt_received" value={enrollmentData.t_shirt_received} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </select>
</div>
        
        <div class="col-4 form-group">
        <label>Enrollment Status:</label>
        <select class="form-control" id="entrollment_status" name="entrollment_status" value={enrollmentData.entrollment_status} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Learning">Learning</option>
            <option value="Complete">Complete</option>
            <option value="Left">Left</option>
        </select></div></div>

        
        <br/>
        <button type="submit"  class="btn btn-lg btn-success">Update</button>
      </form>
    </div></div>
  );
};

export default Update_Enrollment;
