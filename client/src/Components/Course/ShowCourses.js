import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Dialog from '../Dialog';

import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

const Courses= () => {

const [courses, setCourses] = useState([]);

 
 //Fetch Data 
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_HOST}/api/read_courses`);
      setCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

//Confirmation BOX
const idForDelete = useRef();
 const [dialog, setDialog] = useState({
  message: "",
  isLoading: false,
  nameProduct: ""
});

const handleDialog = (message, isLoading, nameProduct) => {
  setDialog({
    message,
    isLoading,
    nameProduct
  });
};

const handleDelete = (id) => {
  handleDialog("Are you sure you want to delete?", true, id);
  idForDelete.current = id;

};

const areUSureDelete = (choose) => {
  if (choose) {
    handleDialog("", false);
    axios.delete(`${process.env.REACT_APP_HOST}/api/course/remove/${idForDelete.current}`);
    setTimeout(()=>fetchData(),500) 

  } else {
    handleDialog("", false);
  }
};



    return (
    <>
    <br/>
     <h2 class="form-categori-lable " style={{textAlign:'center'}}>Course Infomation</h2>

      <table>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Course Duration</th>
            <th>Course Description</th>
            <th>Course Fee</th>
            <th>EMI Fee</th>
            <th>Course Eligibility</th>
            <th>Action</th>
          </tr>
        </thead> 
        <tbody>
          {courses.map((course) => (
            <tr key={course.course_id}>
              <td >{course.course_id}</td>
              <td>{course.course_name}</td>
              <td>{course.course_duration}</td>
              <td>{course.course_description}</td>
              <td>{course.course_fee}</td>
              <td>{course.emi_fee}</td>
              <td>{course.course_eligibility}</td>

              <td style={{ padding: "8px",display:'flex' }}>
              <Link to={`/Update_Course/${course.course_id}`}>
              <div className="inquieryEdit-btn"><BiSolidEdit/></div>
              </Link>
              <label className="inquieryDelete-btn" style={{margin:"0 5px",color:'red', cursor:'pointer'}} onClick={(e)=>{handleDelete(course.course_id)}}><RiDeleteBin5Line/></label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {dialog.isLoading && (
        <Dialog
          nameProduct={dialog.nameProduct}
          onDialog={areUSureDelete}
          message={dialog.message}
        />
      )}
      </>
    );
  };
  


export default Courses
