import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import studentContext from '../../context/studentContext';
import './style.css'

const PaymentForm = (props) => {
  const p=useContext(studentContext)
  
  let currentDate=new Date().toJSON().slice(0, 10);
  const navigate=useNavigate()
  const [entrollmentId, setEntrollmentId] = useState('');
  const [studentId, setStudent_id] = useState('');
  const [courseId, setCourseId] = useState('0');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const id=props.id;

  console.log("STSTST"+id)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the form data
    const paymentData = {
      entrollment_id: entrollmentId,
      student_id:props.id,
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



   
  };
const [student_reamin_fee,setStudent_reamin_fee]=useState('0')
  
  useEffect(() => {
    if(entrollmentId){
   const re= p.enrollmentList.filter((obj) => obj.enrollment_id == entrollmentId)
  
   let val=re[0].reamin_fee || 0
   setStudent_reamin_fee(val)}
  }, [entrollmentId]);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);


  return (
    <div>
    <div className='form-modal-wrapper' onClick={props.closeModal}></div>
    <div className='tran-form-modal-container'>
      <div className='form-box'>
        <form onSubmit={handleSubmit}>
            <h4 className="form-categori-lable "  >Enter Payment Details</h4><hr/> 
                    <div className="form-row">
                    <div className="form-group col-md-4">
                    <label htmlFor="entrollmentId">Select Entrollment ID:</label>
                <select className="form-control" id="entrollmentId" name="entrollmentId"   value={entrollmentId}
                  onChange={(e) => setEntrollmentId(e.target.value)}  required>
                  <option value="">Select</option>
                  {
                      p.enrollmentList.map((row,index)=>(
                  
                          <option value={row.enrollment_id}>{row.enrollment_id}</option>
                          
                      ))
                  }


                  </select>
</div>
                        <div className="form-group col-md-4">
                            <label for="totalcourseFee">Date</label>
                            <input type="date" className="form-control" value={currentDate} id="totalcourseFee" name="totalcourseFee" required />
                        </div>
                        <div className="form-group col-md-4">
                            <label for="totalcourseFee">Amount</label>
                            <input type="text" className="form-control" id="totalcourseFee" name="totalcourseFee"    value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} required />
                        </div>
                        <div className="form-group col-md-4">
                            <label for="totalcourseFee">Remaining Amount</label>
                            <input type="text" className="form-control" id="totalcourseFee" name="totalcourseFee"  value={student_reamin_fee} required />
                        </div>

                        <div className="form-group col-md-4">
                          <label htmlFor="paymentMode">Payment Mode:</label>
                          <select class="form-control" name="mode"  id="paymentMode" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}  required>
                            <option value="">Select</option>
                            <option value="Cash">Cash</option>
                            <option value="Online">Online</option>
                            </select>
                         </div>

                    </div>

                    <div class="form-row text-center" style={{marginTop:'30px'}} >
                <div class="form-group col-md-12 ">
         
          <button type="submit" class="btn btn-lg btn-success">SAVE</button>
          
        <button onClick={props.closeModal} class="btn btn-lg btn-danger">CANCEL</button>
          </div></div>
        </form>
      </div>
    </div> </div>
  );
}; 

export default PaymentForm;
