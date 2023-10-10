import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import Loader from '../Loader'
import { useNavigate, useParams } from 'react-router';

const UpdateCourseData = () => {
    const {id}=useParams()
    const navigate=useNavigate()
    const [hasLoaderOpened,setLoaderOpened]=useState(false)
    const [courseData, setCourseData] = useState({
        courses_id:0,
        course_name: '',
        course_duration: '',
        course_description: '',
        course_fee: '',
        emi_fee:'',
        course_eligibility: ''
      });



      useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_HOST}/api/read_courses`);
          var result=response.data.filter(obj=> obj.course_id == id);
          console.log(result);
          setCourseData(...result)
        } catch (error) {
          console.log(error);
        }
      };


      const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(courseData);
      setLoaderOpened(true)
        try {
          // Make an asynchronous POST request using Axios
          const response = await axios.post(`${process.env.REACT_APP_HOST}/courseform`, courseData);
      
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
        
        <div class="container mt-5">
        <h2 class="form-categori-lable " style={{textAlign:'center'}}>Add Course</h2>
         
        
        <form onSubmit={handleSubmit}>
            <h4 class="form-categori-lable "  >Course Details</h4><hr/> 
            <div class="row">
               
                <div class="col-4 form-group">
                    <label for="course_name">Course Name</label>
                    <input type="text" class="form-control" id="course_name"  name="course_name" value={courseData.course_name} onChange={handleChange} required />
                </div>

                <div class="col-4 form-group">
                    <label for="course_duration">Course Duration</label>
                    <input type="number" class="form-control" id="course_duration" name="course_duration" value={courseData.course_duration} onChange={handleChange} required />
                </div>

                <div class="col-4 form-group">
                    <label for="course_description">Course Description</label>
                    <input type="text" class="form-control" id="course_description"  rows="3"  name="course_description" value={courseData.course_description} onChange={handleChange} required />
                </div>

                <div class=" col-4 form-group">
                    <label for="course_eligibility">Course Eligibility</label>
                    <input type="text" class="form-control" id="course_eligibility"  rows="3" name="course_eligibility" value={courseData.course_eligibility} onChange={handleChange} required />
                </div>
            </div>

            <h4 class="form-categori-lable "  >Course Fee</h4><hr/> 
            <div class="row">
                <div class="col-4 form-group">
                    <label for="course_fee">Course Fee</label>
                    <input type="number" class="form-control" id="course_fee" name="course_fee" value={courseData.course_fee} onChange={handleChange} required />
                </div>

                <div class="col-4 form-group">
                   <label for="number">EMI Fee / Extra</label>
                  <input type="text" class="form-control" id="emi_fee" name="emi_fee" value={courseData.emi_fee} onChange={handleChange} required />
                </div>   
            </div>

            <div class="form-row text-center" style={{marginTop:'30px'}}>
                <div class="form-group col-md-12 ">
                    <button type="submit" class="btn btn-lg btn-success">Update</button>
                </div>
            </div>
          </form> 
          </div>
       
    </div>}
    <ToastContainer />
    </div>
  )
}

export default UpdateCourseData