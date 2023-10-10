import axios from 'axios';
import React, { useState, useEffect, useContext }  from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import studentContext from '../../context/studentContext';
import CertificateDistributionForm from '../Modal/CertificateDistributionForm';
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

function Certificates_Dist() {
  
  const {sidebar, setSidebar}=useContext(studentContext)
    const {id}=useParams()
    const [certificates, setCertificates] = useState([]);
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_HOST}/api/get_certificate-dist`);
  
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
            axios.delete(`${process.env.REACT_APP_HOST}/api/deleteCertificateDis/remove/${cir_id}`);
            console.log("Delete: "+id)
            setTimeout(()=>fetchData(),500)
          }},
          {
            label: 'No',
            onClick: () => {}
          }]
      });
    }
    
//modal Close

const [showModal,setShowModal]=useState(false)
const closeModal=()=>{ setShowModal(false); fetchData();}
  return (
    <div>
    
<div onClick={()=>{setShowModal(true);setSidebar(false)}} className="add-btn-box" ><div className="add-btn" style={{cursor:'pointer'}}>+ Distribution</div></div>


      <br/>
      <div className='table-margin'>
      <table>
      <thead>
        <tr>
          <th>Certificate Distribution ID</th>
          <th>Certificate ID</th>
          <th>Student ID</th>
          <th>Course ID</th>
          <th>Certificate Distribution Date</th>
          <th>Certificate_received_by</th>
          <th>Action</th>
          {/* Add more table headers for other attributes if needed */}
        </tr>
      </thead>
      <tbody>
        {certificates.map((certificate, index) => (
          <tr key={index}>
            <td>{certificate.certificate_distribution_id}</td>
            <td>{certificate.certificate_id}</td>
            <td>{certificate.student_id}</td>
            <td>{certificate.course_id}</td>
            <td>{certificate.certificate_distribution_date}</td>
            <td>{certificate.certificate_received_by}</td>
            <td><label style={{margin:"0 5px",color:'red',fontSize:'22px'}} onClick={()=>deleteCertificate(certificate.certificate_distribution_id)}><RiDeleteBin5Line/></label></td>
          </tr>
        ))}
      </tbody>
    </table></div>
    {showModal && <CertificateDistributionForm id={id} closeModal={closeModal} />}
    </div>
  )
}

export default Certificates_Dist
