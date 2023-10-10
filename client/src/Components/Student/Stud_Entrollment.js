import axios from 'axios'
import { Link, NavLink, useParams } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../Pages.css'
import studentContext from '../../context/studentContext';
import { ToastContainer, toast } from "react-toastify";
import EnrollmentForm from '../Modal/EnrollmentForm';
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

const Stud_Entrollment = () => {
    const {sidebar, setSidebar}=useContext(studentContext)
    const p=useContext(studentContext)
    const {id}=useParams()    
    const [showModal,setShowModal]=useState(false)
    const [Enrollment_data,setEnrollment_data]=useState([])

    //Load Enrolled Data
    const loadEnrlData = async () => {
        const getdata = await axios.get(
          `${process.env.REACT_APP_HOST}/api/enrollment/${id}`
        );
        setEnrollment_data(getdata.data);
         p.setEnrollmentData(getdata.data)
        
      };
      
      //Delete Enrolled Record
      const deleteStud_Enrollment=(id)=>{
        confirmAlert({
          title: 'Confirm to Delete',
          message: 'Are you sure to do this.',
          buttons: [{
    
              label: 'Yes',
              onClick: () => {
                console.log(id)
                axios.delete(`${process.env.REACT_APP_HOST}/del_enrollment/remove/${id}`);
                console.log("Delete: "+id)
                setTimeout(()=>loadEnrlData(),500)
            }},
            {
              label: 'No',
              onClick: () => {}
            }]
        });
        
      }

      //Generate Ceritifcate
      const Certificate_Generated=(enrl_id,std_is,course_id)=>{
        confirmAlert({
          title: 'Confirm to Genereted',
          message: 'Are you sure to do this.',
          buttons: [{
    
              label: 'Yes',
              onClick: () => {
                var today = new Date(),
                c_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

                axios.post(`${process.env.REACT_APP_HOST}/certificate/Certificate_Generated`,{
                  enrl_id,std_is,course_id,c_date
                }).then((response)=>{
                  console.log(response.data);
                  if(response.data.status=='success'){
                    toast.success("Generate Successfully", {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      draggable: true,
                    });
                  }
                  else{
                    toast.error("Already Generated", {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      draggable: true,
                    });
                  }

                })
            }},
            {
              label: 'No',
              onClick: () => {}
            }]
        });
      }

  //Generate ID Card
  const generatingIDcard=(enrl_id)=>{

  axios.get(`${process.env.REACT_APP_HOST}/stud-icard-download/${enrl_id}`, { responseType: 'blob' })
  .then((response) => {

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = enrl_id+'_receipt.pdf'; // Set the filename for the download
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("Download Successful", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    });
  })
  .catch((error) => {
    toast.error("Download Unsuccessful", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    });
    console.error('Error downloading the PDF:', error);
  });
console.log(enrl_id)
}

//modal Close
const closeModal=()=> setShowModal(false);

useEffect(() => {
  loadEnrlData();
}, [id]);

  return (
<div>
      {/* <Link style={{textDecoration:'none'}} to={`/new_enrollment/${id}`} > */}
      <div onClick={()=>{setShowModal(true);setSidebar(false)}} className="add-btn-box" ><div className="add-btn" style={{cursor:'pointer'}}>+ Enrollment</div></div>

      <div className='table-margin' >
      <table>
            <thead>
              <tr>
                <th>Enrollment ID</th>
                <th>Student ID</th>
                <th>Course ID</th>
                <th>Batch No</th>
                <th>Start Date</th>
                  <th>course_end_date</th>
                  <th>entrollment_duration</th>
                  <th>course_fee</th>
                  <th>Total_course_fee</th>
                  <th>given_fee</th>
                  <th>reamin_fee</th>
                  <th>fee_status</th>
                  <th>bag_received</th>
                  <th>enrollment.icard_received</th>                 
                  <th>t_shirt_received</th>
                  <th>entrollment_status</th>
                  <th>Action</th>
                  <th>Certificate_Generated</th>
                  <th>ID Card</th>
              </tr>
            </thead>

            <tbody>
                {Enrollment_data.map((enrollment) => (
                <tr key={enrollment.enrollment_id}>
                  <td>{enrollment.enrollment_id}</td>
                  <td>{enrollment.student_id}</td>
                  <td>{enrollment.course_id}</td>
                  <td>{enrollment.batch_no}</td>
                  <td>{enrollment.course_start_date}</td>
                  <td>{enrollment.course_end_date}</td>
                  <td>{enrollment.entrollment_duration}</td>
                  <td>{enrollment.course_fee}</td>
                  <td>{enrollment.totalcourseFee}</td>
                  <td>{enrollment.given_fee}</td>
                  <td>{enrollment.reamin_fee}</td>
                  <td>{enrollment.fee_status}</td>
                  <td>{enrollment.bag_received}</td>
                  <td>{enrollment.icard_received}</td>                  
                  <td>{enrollment.t_shirt_received}</td>
                  <td>{enrollment.entrollment_status}</td>

                  <td style={{display:'flex'}}>
                    <Link to={`/Update_Enrollment/${enrollment.enrollment_id}`}>
                     <div className="inquieryEdit-btn"> <BiSolidEdit/></div>
                    </Link>
                    <div  className="inquieryDelete-btn" onClick={()=>{deleteStud_Enrollment(enrollment.enrollment_id)}} style={{marginLeft:'10px',color:'red'}}><RiDeleteBin5Line/></div>
                  </td>

                  <td>
                    <label style={{marginLeft:'20px',color:'#cc7000',cursor:'pointer'}} onClick={()=>{
                      Certificate_Generated(enrollment.enrollment_id,enrollment.student_id,enrollment.course_id) }} >
                        Click me
                    </label>
                  </td>

                  <td>
                    <label onClick={()=>{generatingIDcard(enrollment.enrollment_id)}} >
                    Download
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
      <ToastContainer />
      {showModal && <EnrollmentForm id={id} closeModal={closeModal} />}
</div>
  )
}

export default Stud_Entrollment
