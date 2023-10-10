import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import Loader from '../Loader'
import './style.css'

const EnrollmentForm = (props) => {
    const [hasLoaderOpened,setLoaderOpened]=useState(false)
    var emi_rupees=0;
    var courseDuratonInMonth=0
    let currentDate = new Date().toJSON().slice(0, 10);
    const [lastEnrollmentmNo, setLastEnrollmentNo] = useState(null);
    const [courseData, setcourseData] = useState([]);
    const [timeTabledata, settimeTabledata] = useState([]);
  
    const [formData, setFormData] = useState({
      studentId: 0,
      courseId: '',
      batchNo: '',
      courseStartDate: currentDate,
      courseEndDate: '',
      enrollmentDuration: '',
      courseFee: '0',
      emi:'Yes',
      TotalcourseFee:'',
      givenFee: '0',
      remainFee: '0',
      feeStatus: 'Pending',
      bagReceived: 'No',
      bookReceived: 'No',
      icardReceived: 'No',
      tShirtReceived: 'No',
      enrollmentStatus: 'Learning',
      entrollment_id: lastEnrollmentmNo,
      payment_amount: 0,
      payment_mode: 'Cash',
    });
    
  
  
      /////////////////=============LOADING-DATA=========
  
      //Get-last-new-enrollment-no
        const loadEnrollmentNO=async ()=>{
          axios.get(`${process.env.REACT_APP_HOST}/enrollment/get-last-new-enrollment-no`)
            .then((response) => {
              setLastEnrollmentNo(response.data[0].enrollment_id+1);
            })
            .catch((error) => {
              console.error('Error fetching last form_no:', error);
            });
        }

      //Get-Courses
      const loadCourses = async () => {
        const getdata = await axios.get(
          `${process.env.REACT_APP_HOST}/api/read_courses`
        );
        setcourseData(getdata.data);
        console.log('getdata.data')
        console.log(getdata.data)
      };
    
      //Get-Batches
      const loadBatches=()=>{
        axios.get(`${process.env.REACT_APP_HOST}/api/getTimeTable`) // Replace this with the endpoint for fetching data from the server
        .then((response) => {
          settimeTabledata(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
     }
    
      useEffect(() => {
        setFormData((prevData) => ({...prevData,studentId:props.id, }));
        loadEnrollmentNO();
        loadCourses();
        loadBatches();
      }, []);
    
      //==============EMI Operation====
      useEffect(() => {
        console.log("formData.emi: " + formData.emi);
        const emiValue = formData.emi.toString();
        var course_fees=parseInt(formData.courseFee)
  
        if (emiValue === 'No') {
          const updatedCourseFee = course_fees;
          console.log("NO: " + updatedCourseFee);
          setFormData((prevData) => ({
            ...prevData,
            TotalcourseFee: updatedCourseFee,
            remainFee:updatedCourseFee,
          }));
        }
        if (emiValue === 'Yes') {
          const updatedCourseFee = course_fees +parseInt(emi_rupees);
          console.log("YES: " + updatedCourseFee);
          setFormData((prevData) => ({
            ...prevData,
            TotalcourseFee: updatedCourseFee,
            remainFee:updatedCourseFee,
          }));
        }
        
        //duration set
        let monthforadd=parseInt(courseDuratonInMonth)
        let currentDate = new Date(formData.courseStartDate);
      currentDate.setMonth(currentDate.getMonth() + monthforadd);
      // Convert the updated current date to a JSON string
      const updatedDateJSON = currentDate.toJSON().slice(0, 10);
      console.log("Current Date minus 3 months:", updatedDateJSON);
    
    
      setFormData((prevData) => ({
        ...prevData,
        courseEndDate: updatedDateJSON,
      }));
    
    
      }, [formData.emi,formData.courseId]);
    
    
    
    
      //=====FORM OPERATIONS=====
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
  

      const handleSubmit = async(event) => {
        event.preventDefault();
      
    // Create an object with the form data
    const paymentDataToSend = {
      entrollment_id:lastEnrollmentmNo,
      student_id:formData.studentId,
      course_id: formData.courseId,
      payment_amount: formData.payment_amount,
      payment_mode: formData.payment_mode,
    };
  
  const enrollmentDataToSend={
    student_id:formData.studentId,
    course_id:formData.courseId,
    batch_no:formData.batchNo,
    course_start_date:formData.courseStartDate,
    course_end_date:formData.courseEndDate,
    entrollment_duration:formData.enrollmentDuration,
    course_fee:formData.courseFee,
    totalcourseFee:formData.TotalcourseFee,
    given_fee:formData.payment_amount,
    reamin_fee:formData.TotalcourseFee-formData.payment_amount,
    fee_status:formData.feeStatus,
    bag_received:formData.bagReceived,
    book_received:formData.bookReceived,
    icard_received:formData.icardReceived,
    t_shirt_received:formData.tShirtReceived,
    entrollment_status:formData.enrollmentStatus,
  }
  


        setLoaderOpened(true)
        try {
          // Make an asynchronous POST request using Axios
          const responseOfEnrollment = await axios.post(`${process.env.REACT_APP_HOST}/enrollment/enrollment-payment`, enrollmentDataToSend);
          const responseOfPayment =await axios.post(`${process.env.REACT_APP_HOST}/Payment/first_payment`, paymentDataToSend)
          // If the request was successful, display a success toast

          toast.success("Add Successfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
          });
      
          // Reset the courseData state after a delay of 1 seconds (1000 milliseconds)
          setTimeout(() => {
            setLoaderOpened(false)
            props.closeModal()
            loadEnrollmentNO();
          }, 1000); // Adjust the delay as needed (1000 milliseconds = 2 seconds)
         
        } catch (error) {
            setTimeout(() => {
                setLoaderOpened(false)
              }, 1000);
          // Handle any errors that occur during the request
          console.error("Error:", error);
          toast.error("Add Unsuccessfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
          });
        }
      };
    
    if(formData.courseId){
        console.log(parseInt(formData.courseId))
        let c_id=formData.courseId
        let output = courseData.filter(courseData => courseData.course_id ==c_id);
        let value=output[0].course_fee
        formData.courseFee=value
        emi_rupees=output[0].emi_fee
        courseDuratonInMonth=output[0].course_duration
        formData.enrollmentDuration=courseDuratonInMonth
    }
  

    useEffect(() => {
      document.body.style.overflowY = "hidden";
      return () => {
        document.body.style.overflowY = "auto";
      };
    }, []);
  
  
  
  return (
    <div >
    <div className='form-modal-wrapper' onClick={props.closeModal}></div>
    <div className='form-modal-container'>
    <div>{hasLoaderOpened? <Loader desc='Submiting '/>:
    <div >        
    <div style={{fontSize:'30px',textAlign:'end',width:'100%',padding:'0 18px', color:'red' }}  ><span style={{cursor:'pointer'}} onClick={props.closeModal}>X</span></div>
    
        <div className="container">
     

        <h4 class="form-categori-lable"  >Enrollment Details</h4><hr/>
        <form onSubmit={handleSubmit}> 
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="batch_no">Batch Number</label>
                <select id="courseId" class="form-control" name="batchNo" value={formData.batchNo} onChange={handleChange} required>
                    <option value="">Select</option>
                    {
                      timeTabledata.map((row,index)=>(
                            <option value={row.batch_no}>{row.batch_no}</option>
                        ))
                    }
                  </select>


              </div>
                <div class="form-group col-md-4">
                    <label for="course_id">Course Name</label>
                      <select class="form-control"  id="courseId" name="courseId" value={formData.courseId} onChange={handleChange} required>
                    <option value="">Select</option>
                    {
                        courseData.map((row,index)=>(
                            <option value={row.course_id}>{row.course_name}</option>
                        ))
                    }
                    </select>
                </div>                
                <div class="form-group col-md-4">
                    <label for="course_start_date">Course Start Date</label>
                    <input type="date" class="form-control" id="course_start_date" name="courseStartDate"
              value={formData.courseStartDate}
              onChange={handleChange}
              required disabled />
                </div>
                <div class="form-group col-md-4">
                    <label for="course_end_date">Course End Date</label>
                    <input type="date" class="form-control" id="course_end_date"   name="courseEndDate"
              value={formData.courseEndDate}
              onChange={handleChange}
              required disabled />
                </div>   
                <div class="form-group col-md-4">
                    <label for="course_end_date">Course Duration</label>
                    <input type="number" class="form-control" id="course_end_date" name="enrollmentDuration"
              value={formData.enrollmentDuration}
              onChange={handleChange}
              required disabled />
                </div>
               
                <div class="form-group col-md-4">
                    <label for="entrollment_status">Enrollment Status</label>
                    <input type="text" class="form-control" id="entrollment_status" name="entrollment_status"  value={formData.enrollmentStatus} onChange={handleChange} disabled />
                </div>
                        
            </div>
            <h4 class="form-categori-lable"  >Fee Details</h4><hr/>
            <div class="form-row">
                
                <div class="form-group col-md-4">
                    <label for="totalcourseFee">Course Fee</label>
                    <input type="text" class="form-control" id="totalcourseFee"   name="courseFee" value={formData.courseFee} onChange={handleChange} required disabled />
                </div>
                <div class="form-group col-md-4">
                    <label for="given_fee">Payment Option</label>
                    <select class="form-control" id="emi" name="emi" value={formData.emi} onChange={handleChange} required>
                        <option value="No">Advance</option>
                        <option value="Yes">EMI</option>                        
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label for="reamin_fee">Total Fee</label>
                    <input type="text" class="form-control" id="reamin_fee" name="reamin_fee" value={formData.TotalcourseFee} onChange={handleChange} required disabled />
                </div>
            </div> 

            <h4 class="form-categori-lable"  >Payment Details</h4><hr/>
            <div class="form-row">
                
                <div class="form-group col-md-4">
                    <label for="totalcourseFee">Amount</label>
                    <input type="text" class="form-control" id="totalcourseFee" value={formData.payment_amount} onChange={handleChange} name="payment_amount" />
                </div>
                <div class="form-group col-md-4">
                    <label for="given_fee">Payment Mode</label>
                    <select class="form-control" id="course" name="payment_mode" value={formData.payment_mode} onChange={handleChange}  required>
                        <option value="Cash">Cash</option>
                        <option value="UPI / Online">UPI / Online</option>                        
                    </select>
                </div>
             
                <div class="form-group col-md-4">
                    <label for="reamin_fee">Remaining Fee</label>
                    <input type="text" class="form-control" id="reamin_fee" name="reamin_fee" value={formData.TotalcourseFee-formData.payment_amount} placeholder='0' disabled />
                </div>
            </div>           
            <div class="form-row text-center" style={{marginTop:'30px'}} >
                <div class="form-group col-md-12 ">
                    <button type="submit" class="btn btn-lg btn-success">SAVE</button>
                    <button type="reset" class="btn btn-lg btn-info">RESET</button>
                </div>
            </div> 
            
         </form>  
        </div>

    </div>
}
    <ToastContainer />
    </div>
    </div></div>
  )
}

export default EnrollmentForm