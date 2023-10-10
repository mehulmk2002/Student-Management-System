import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import Loader from '../Loader'
import { useNavigate, useParams } from 'react-router';


const UpdateTimeTableData = () => {
    
  const { batch_no } = useParams();
  const navigate=useNavigate();
  const [hasLoaderOpened,setLoaderOpened]=useState(false);
  const [formData, setFormData] = useState({
    batch_no: '',
    class_time: '',
    course: '',
    lab_teacher: '',
  });
 
  useEffect(() => {
    // Fetch data for the selected batch from the server using axios
    axios.get(`${process.env.REACT_APP_HOST}/timetable/${batch_no}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [batch_no]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
  setLoaderOpened(true)
    try {
      // Make an asynchronous POST request using Axios
      const response = await axios.put(`${process.env.REACT_APP_HOST}/timetable/${batch_no}`, formData);
  
      // If the request was successful, display a success toast
      toast.success("Update Successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
  
      // Reset the courseData state after a delay of 1 seconds (1000 milliseconds)
      setTimeout(() => {
        setLoaderOpened(false)
        navigate(-1)
      }, 1000); // Adjust the delay as needed (1000 milliseconds = 2 seconds)
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error:", error);
      toast.error("Update Unsuccessfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  };
  return (
    <div>{hasLoaderOpened? <Loader desc='Updating'/>:
        <div class="container mt-5">
            <h2 class="form-categori-lable "  style={{textAlign:'center'}}>Classes Schedule</h2>
             <div class="form-row">        
            <div class="form-group col-4" >
                <input type="text" class="form-control" id="student_id" name="studnet_id" placeholder="Enter Batch ID" />
            </div>
            <div class="form-group col-4">                
                <button class="btn btn-success" > Search </button>
            </div>            
        </div>
       
            
            <form onSubmit={handleSubmit}>
                <h4 class="form-categori-lable "  >Batch /  Classes Details</h4><hr/> 
                <div class="row">
                    <div class="col-4 form-group">
                        <label for="course_id">Batch Number</label>
                        <input type="text" class="form-control"  name="batch_no" value={formData.batch_no} onChange={handleChange} required />
                    </div>

                    <div class="col-4 form-group">
                        <label for="course_id">Class Time:</label>
                        <input type="text" class="form-control"  name="class_time" value={formData.class_time} onChange={handleChange} required />
                    </div>


             
                    <div class="col-4 form-group">
                        <label for="course_duration">Cours Name</label>
                        <input type="text" class="form-control" name="course" value={formData.course} onChange={handleChange} required />
                    </div>

                    <div class="col-4 form-group">
                        <label for="course_description">Lab Assistent /  Teacher</label>
                        <input type="text" class="form-control" name="lab_teacher" value={formData.lab_teacher} onChange={handleChange} rows="3" required />
                    </div>
                   
                </div>
                   
                <div class="form-row text-center" style={{marginTop:"30px"}}>
                    <div class="form-group col-md-12 ">
                        <button type="submit" class="btn btn-lg btn-success">Save</button>
                        <button type="reset" class="btn btn-lg btn-info">Reset Form</button>
                        <button type="Delete" class="btn btn-lg btn-danger">Delete Course</button>
                    </div>
                </div>
              </form> 
           
        </div>
      }
    <ToastContainer />
        </div>
  )
}

export default UpdateTimeTableData