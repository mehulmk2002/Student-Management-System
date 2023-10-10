import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

const Update_CertificateDistribution = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("==id" + id);
  const [formData, setFormData] = useState({
    certificate_id: '',
    student_id: id,
    course_id: '',
    certificate_distribution_date: '',
    certificate_received_by: '',
  });

  useEffect(() => {
    // Fetch existing data for the certificate distribution from the server using axios
    fetchCertificateDistributionData();
  }, [id]);

  const fetchCertificateDistributionData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_HOST}/api/certificate-distribution/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
      await axios.put(`${process.env.REACT_APP_HOST}/api/certificate-distribution/${id}`, formData);
      console.log('Certificate distribution data updated successfully!');
      navigate(-1); // Redirect back to the previous page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='form-container'>
        <div className='form-title'>Certificate Distribution Form</div>
        <div className='form-box'>
          <form onSubmit={handleSubmit}>
            <br />
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
            <br /><br />
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update_CertificateDistribution;
