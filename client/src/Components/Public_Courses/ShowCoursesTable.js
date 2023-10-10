import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiDeleteBin5Line } from "react-icons/ri";
function ShowCoursesTable() {
  const [courses, setCourses] = useState([]);

  useEffect(()=>{

    axios.get(`${process.env.REACT_APP_HOST}/ourCourses`).then((response)=>{
        setCourses(response.data)
        console.log(response.data)
    }).catch((error)=>{
        console.log(error)
    })
},
[])

  const handleDelete = (id) => {
    // Send a delete request to your API endpoint to remove the course
    axios.delete(`${process.env.REACT_APP_HOST}/ourCourses/${id}`)
      .then((response) => {
        // If the deletion is successful, update the courses state to reflect the changes
        setCourses(courses.filter((course) => course.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2 style={{textAlign:'center'}}>Course List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Action</th> {/* Add a new column for delete action */}
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>
                <img src={course.image_url} alt={course.course_name} />
              </td>
              <td>{course.course_name}</td>
              <td>{course.course_description}</td>
              <td>{course.course_duration}</td>
              <td>{course.course_price}</td>
              <td>
                <div style={{color:'red',fontSize:'24px'}} onClick={() => handleDelete(course.id)}><RiDeleteBin5Line/></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowCoursesTable;
