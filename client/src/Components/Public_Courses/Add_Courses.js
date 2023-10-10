import React, { useState } from 'react';
import axios from 'axios';

function Add_Courses() {
  const [courseData, setCourseData] = useState({
    image_url: '',
    course_name: '',
    course_description: '',
    course_duration: '',
    course_price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_HOST}/OurCourses`, courseData) // Adjust the URL as needed
      .then((response) => {
        console.log(response.data);
        // Reset the form after successful submission
        setCourseData({
          image_url: '',
          course_name: '',
          course_description: '',
          course_duration: '',
          course_price: '',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{margin:'20px     auto'}}>
    <div className='form-container'>
      <h5  style={{textAlign:'center',fontWeight:'700', color:'blueviolet'}}>Add Courses</h5>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Image URL:</label>
          <input className="form-control" 
            type="text"
            name="image_url"
            value={courseData.image_url}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Course Name:</label>
          <input className="form-control" 
            type="text"
            name="course_name"
            value={courseData.course_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Course Description:</label>
          <textarea className="form-control" 
            name="course_description"
            value={courseData.course_description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Course Duration:</label>
          <input className="form-control" 
            type="text"
            name="course_duration"
            value={courseData.course_duration}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Course Price:</label>
          <input className="form-control" 
            type="text"
            name="course_price"
            value={courseData.course_price}
            onChange={handleChange}
          />
        </div>


        <div className="form-row text-center" style={{marginTop:'30px'}}>
                <div className="form-group col-md-12 ">
                    <button type="submit" className="btn btn-lg btn-success">Submit</button>
                    
                </div>
            </div>

      </form>
    </div>  </div>
  );
}

export default Add_Courses;
