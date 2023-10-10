import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Update_Payment = () => {
  const navigate=useNavigate()
  const { id } = useParams();

  const [paymentData, setPaymentData] = useState({
    entrollment_id: '',
    student_id: '',
    course_id: '',
    payment_amount: '',
    payment_mode: '',
  });




  const loadEnrollmentData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_HOST}/api/up_payment/${id}`);
      const data = response.data[0];
      setPaymentData(data);
      console.log(data)
    } catch (error) {
      console.error("Error retrieving enrollment data:", error);
    }
  };

  useEffect(() => {
    loadEnrollmentData();
  }, [id]);



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment UPDATE');
    // Perform your API call using Axios to send a POST request
    axios.put(`${process.env.REACT_APP_HOST}/update/payment_data/${id}`, paymentData)
      .then((response) => {
        console.log('Payment created:', response.data);
        // Reset the form after successful submission
        setPaymentData({
          entrollment_id: '',
          student_id: '',
          course_id: '',
          payment_amount: '',
          payment_mode: '',
        });
      })
      .catch((error) => {
        console.error('Error creating payment:', error);
        // Handle error scenarios
      });
      navigate(-1)

  };

  return (
    <div className='form-container'>
      <div className='form-title'>Add Payment</div>
      <div className='form-box'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="entrollmentId">Entrollment ID:</label>
          <input
            type="text"
            id="entrollmentId"
            value={paymentData.entrollment_id}
            onChange={(e) => setPaymentData({ ...paymentData, entrollment_id: e.target.value })}
          />

          <label htmlFor="studentId">Student ID:</label>
          <input
            type="text"
            id="studentId"
            value={paymentData.student_id}
            onChange={(e) => setPaymentData({ ...paymentData, student_id: e.target.value })}
          />

          <label htmlFor="courseId">Course ID:</label>
          <input
            type="text"
            id="courseId"
            value={paymentData.course_id}
            onChange={(e) => setPaymentData({ ...paymentData, course_id: e.target.value })}
          />

          <label htmlFor="paymentAmount">Payment Amount:</label>
          <input
            type="text"
            id="paymentAmount"
            value={paymentData.payment_amount}
            onChange={(e) => setPaymentData({ ...paymentData, payment_amount: e.target.value })}
          />

          <label htmlFor="paymentMode">Payment Mode:</label>
          <input
            type="text"
            id="paymentMode"
            value={paymentData.payment_mode}
            onChange={(e) => setPaymentData({ ...paymentData, payment_mode: e.target.value })}
          />
          <br/><br/>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Update_Payment;
