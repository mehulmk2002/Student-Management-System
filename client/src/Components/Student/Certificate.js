import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { RiDeleteBin5Line } from "react-icons/ri";

const Certificate = () => {
  const [certificates, setCertificates] = useState([]);
  const {id}=useParams()
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_HOST}/api/certificates`);

      var result=response.data.filter(obj=> obj.student_id == id);
      console.log(result);
      setCertificates(result)
      //setCertificates(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCertificate=(cir_id)=>{
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this.',
      buttons: [{

          label: 'Yes',
          onClick: () => {                   
          axios.delete(`${process.env.REACT_APP_HOST}/api/deleteCertificate/remove/${cir_id}`);
          console.log("Delete: "+id)
          setTimeout(()=>fetchData(),500)
        }},
        {
          label: 'No',
          onClick: () => {}
        }]
    });
  }
  return (
    <div>
      <div style={{margin:'10 50px',color:'blueviolet'}}>
      <h2 style={{textAlign:'center'}}    >List Of Certificate</h2> </div> 
      <div className='table-margin'>
      <table>
        <thead>
          <tr>
            <th>Certificate ID</th>
            <th>Student ID</th>
            <th>Course ID</th>
            <th>Enrollment ID</th>
            <th>Generate Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((certificate) => (
            <tr key={certificate.certificate_id}>
              <td>{certificate.certificate_id}</td>
              <td>{certificate.student_id}</td>
              <td>{certificate.course_id}</td>
              <td>{certificate.enrollment_id}</td>
              <td>{certificate.certificate_generate_date}</td>
              <td><label style={{margin:"0 5px",color:'red',cursor:'pointer',fontSize:'22px'}} onClick={()=>deleteCertificate(certificate.certificate_id)}> <RiDeleteBin5Line/></label></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Certificate;
