import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import studentContext from '../../context/studentContext';

const PaymentForm = () => {
  const p=useContext(studentContext)
  const navigate=useNavigate()
  const [entrollmentId, setEntrollmentId] = useState('');
  const [studentId, setStudent_id] = useState('');
  const [courseId, setCourseId] = useState('0');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const {id}=useParams()
  console.log("STSTST"+id)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the form data
    const paymentData = {
      entrollment_id: entrollmentId,
      student_id:id,
      course_id: courseId,
      payment_amount: paymentAmount,
      payment_mode: paymentMode,
    };
    confirmAlert({
      title: 'Confirm to Add',
      message: 'Are you sure to do this.',
      buttons: [{

          label: 'Yes',
          onClick: () => {
            axios.post(`${process.env.REACT_APP_HOST}/payment_data`, paymentData)
            .then((response) => {
              console.log('Payment created:', response.data);
              // Reset the form after successful submission
              setEntrollmentId('');
              setCourseId('');
              setPaymentAmount('');
              setPaymentMode('');
            })
            .catch((error) => {
              console.error('Error creating payment:', error);
              // Handle error scenarios
            });
            navigate(-1)
        }},
        {
          label: 'No',
          onClick: () => {}
        }]
    });




    // Perform your API call using Axios to send a POST request
   
  };
const [student_reamin_fee,setStudent_reamin_fee]=useState('0')
  
  useEffect(() => {
    if(entrollmentId){
   const re= p.enrollmentList.filter((obj) => obj.enrollment_id == entrollmentId)
  
   let val=re[0].reamin_fee || 0
   setStudent_reamin_fee(val)}
  }, [entrollmentId]);

  return (
    <div className='form-container'>
      <div className='form-title'>Add Payment</div>
      <div className='form-box'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="entrollmentId">Select Entrollment ID:</label>
         
          <select id="entrollmentId" name="entrollmentId"   value={entrollmentId}
            onChange={(e) => setEntrollmentId(e.target.value)}  required>
            <option value="">Select</option>
            {
                p.enrollmentList.map((row,index)=>(
            
                    <option value={row.enrollment_id}>{row.enrollment_id}</option>
                   
                ))
            }


            </select>


            <label htmlFor="paymentAmount">Remaining Amount:</label>
          <input
            type="text"
            id="paymentAmount"
            value={student_reamin_fee}
            required
          />

          {/* <label htmlFor="courseId">Course ID:</label>
          <input
            type="text"
            id="courseId"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          /> */}

          <label htmlFor="paymentAmount">Payment Amount:</label>
          <input
            type="text"
            id="paymentAmount"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            required
          />

          <label htmlFor="paymentMode">Payment Mode:</label>
        

          <select  name="mode"  id="paymentMode"
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}  required>
            <option value="">Select</option>
            <option value="Cash">Cash</option>
            <option value="Online">Online</option>
            </select>


          <br/><br/>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
