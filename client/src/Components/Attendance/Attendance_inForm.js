import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

const Attendance_inForm = () => {
  const firstInputRef = useRef(null);
  const [isIn,setIn]=useState(true)
    const [formData, setFormData] = useState({
      student_id: '',
      enrollment_id: '',
      date: new Date().toJSON().slice(0, 10),
      in_time:new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async () => {
      
      try {
        console.log("Hello")
        await axios.post(`${process.env.REACT_APP_HOST}/attendance/in`, formData);
        // alert('Data inserted successfully');
        toast.success("Data inserted successfully", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        });
        // You can clear the form or perform any other actions here
        setFormData({ ...formData, enrollment_id:'' });
        firstInputRef.current.focus();
      } catch (error) {
        setFormData({ ...formData, enrollment_id:'' });
        firstInputRef.current.focus();
        console.error('Error inserting data:', error);

        toast.error("Error inserting data", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        });

      }
    };



    const [studentData, setStudentData] = useState({
      upload_photo:'mctclogo.jpg',
      student_id:'0',
      first_name:'Firstname',
      last_name:'Lastname'
    });
  
  
    const fetchStudentData = async () => {
      try {
        const enrollmentResponse = await axios.get(`${process.env.REACT_APP_HOST}/attendance/student/${formData.enrollment_id}`);

        
        setStudentData(enrollmentResponse.data);
        formData.student_id=enrollmentResponse.data.student_id
        setFormData({ ...formData, in_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) });
       
        await axios.post(`${process.env.REACT_APP_HOST}/attendance/in-out`, formData).then((res)=>{
console.log(res.data)
if(res.data.status=='in'){
  setIn(true)
}
else{
  setIn(false);
}
        });
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
  
    useEffect(()=>{
      
      fetchStudentData();
    },[formData.enrollment_id])





//Confirmation-Box
const [autoSubmition, setAutoSubmition] = useState(false);
const handleCheckboxChange = (e) => {
  setAutoSubmition(e.target.checked);
};

const [showConfirmation, setShowConfirmation] = useState(false);
const [progress, setProgress] = useState(0);

useEffect(() => {
  let progressBarInterval;

  if (showConfirmation) {
    // Update the progress bar every second
    progressBarInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 10;
        } else {
          // If the progress bar reaches 100%, trigger submission
          handleSubmit();
          setShowConfirmation(false); // Hide the confirmation modal
          clearInterval(progressBarInterval); 
          // Stop the interval
          setProgress(0);
          return prevProgress;
        }
      });
    }, 200);

    // Clear the interval when the confirmation box is closed
    return () => {
      clearInterval(progressBarInterval);
    };
  }
  else{
      clearInterval(progressBarInterval);
      setProgress(0)
  }
}, [showConfirmation]);


const handleShowConfirmation = () => {


  setTimeout(() => {
    setShowConfirmation(true);
  }, 2000);


};

const handleCancel = () => {
  setFormData({ ...formData, enrollment_id:'' });
  firstInputRef.current.focus();
  setShowConfirmation(false);
};








useEffect(() => {
  // Set focus to the first input element when the component mounts
  firstInputRef.current.focus();
}, []);



    return (
      <div style={{margin:'0 auto'}}>
        <div className='form-container'>
        <h2 style={{textAlign:'center'}}>Attendance Form</h2>
        <div>

         
          <label>
            Enrollment ID:</label>
            <input className="form-control" type="number" name="enrollment_id" value={formData.enrollment_id} onChange={(e) => { handleChange(e); autoSubmition && handleShowConfirmation(); }} autoComplete='off'  ref={firstInputRef}/>

          <label>
            Date:</label>
            <input class="form-control"  type="date" name="date" value={formData.date} onChange={handleChange} />
          
          <label>
            In Time:</label>
            <input  className="form-control" style={{width:'100%'}} type="time" name="in_time" value={formData.in_time} onChange={handleChange} />
      

   


            <div className="form-row text-center" style={{marginTop:'15px',marginBottom:'0'}}>
                <div className="col-md-12 ">
                    <div  className="btn btn-lg btn-success" onClick={handleSubmit}>Add Attendance</div>
                   
                </div>
            </div>


            <div className="form-check">
              <div  style={{width:'100%',display:'flex',justifyContent:'center',columnGap:'5px',alignItems:'center'}}  >
              <div htmlFor="autoSubmitCheckbox" style={{fontSize:'20px'}}>Auto Submit</div>
              <input className="form-control"
                type="checkbox"
                id="autoSubmitCheckbox"
                checked={autoSubmition}
                onChange={handleCheckboxChange}
                style={{width: "20px",marginRight:'20px'}}
              /> 
              </div>
           </div>
        </div>
      </div>
      
      
      {showConfirmation && (
  <div className="modal-container">
    <div className="modal modal-dialog-centered" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" style={{minWidth:'280px',fontWeight:'700',fontSize:'26px'}}>{isIn? <span style={{color:'green'}}> Your Now In</span>:<span style={{color:'red'}}> Your Now Out</span>}</h5>
            <button type="button" className="close" onClick={handleCancel}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="image-preview" style={{width:'100%',display:'flex',justifyContent:'center'}}>
            <img  style={{display:'flex',alignContent:'center'}} src={`${process.env.REACT_APP_HOST}/uploads/${studentData.upload_photo}`} alt="Uploaded" />
          </div>
          
          <div style={{textAlign:'center'}} >Student ID: {studentData.student_id}</div>
          <div style={{textAlign:'center',fontWeight:'700',fontSize:'20px'}}>{studentData.first_name} {studentData.last_name}</div>
          <div style={{textAlign:'center'}}>Enrollment Id:{formData.enrollment_id} </div>
          
          <div className="modal-body">
            <p>Do you want to submit?</p>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {progress}%
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Yes
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

      
      
      <ToastContainer />

      </div>
    );
}

export default Attendance_inForm