import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import './style.css'


const CertificateDistributionForm = (props) => {
  const navigate=useNavigate()
  const {id}=useParams()
  
  let currentDate=new Date().toJSON().slice(0, 10);
  console.log("==id"+id)
  const [formData, setFormData] = useState({
    certificate_id: '',
    student_id: id,
    course_id: '',
    certificate_distribution_date:currentDate,
    certificate_received_by: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_HOST}/api/certificate-distribution`, formData);
      console.log('Certificate distribution data inserted successfully!');
    } catch (error) {
      console.log(error);
    }
    props.closeModal()
  };

  return (
    <div>
    <div className='form-modal-wrapper' onClick={props.closeModal}></div>
       <div className='cd-modal-form-container'>
       
      <div className='form-title' style={{fontSize:'22px',color:'blueviolet'}}>Certificate Distribution Form</div>
      <div className='form-box'>
    
      <form onSubmit={handleSubmit}>
      <br/>
        <label>Certificate ID: </label>
          <input
            type="text"
            name="certificate_id"
            value={formData.certificate_id}
            onChange={handleChange}
            required
          />
       
        <br />
        <label>Student ID:</label>
          <input
            type="text"
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            required
            disabled
          />
        
        <br />
        <label>Course ID:</label>
          <input
            type="text"
            name="course_id"
            value={formData.course_id}
            onChange={handleChange}
            required
          />
        
        <br />
        <label>Certificate Distribution Date:</label>
          <input
            type="date"
            name="certificate_distribution_date"
            value={formData.certificate_distribution_date}
            onChange={handleChange}
            required
          />
        
        <br />
        <label>Certificate Received By:</label>
          <input
            type="text"
            name="certificate_received_by"
            value={formData.certificate_received_by}
            onChange={handleChange}
            required
          />
        
        <br /><br/>
        <button type="submit" class="btn btn-lg btn-success">SAVE</button>
        <button onClick={props.closeModal} class="btn btn-lg btn-danger">CANCEL</button>
      </form>
    </div></div></div>
  );
};

export default CertificateDistributionForm;
