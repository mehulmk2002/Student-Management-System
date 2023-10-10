import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Loader from '../Loader'

import nothingTosee from '../../images/nothingTosee.png'
const Major_Payment_Form = () => {
    
    let currentDate=new Date().toJSON().slice(0, 10);

    const [entrollmentId, setEntrollmentId] = useState('');
    const [studentId, setStudent_id] = useState('');
    const [courseId, setCourseId] = useState('0');
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentMode, setPaymentMode] = useState('');
    
    const [searchCriteria, setSearchCriteria] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchResultsEmpty, setIsSearchResultsEmpty] = useState(true);
    const [conditionRendering,setConditionRendering]=useState(true)
    const [studentData, setStudentData] = useState([]);


    const handleSearch = () => {
      setConditionRendering(true)
        axios.get(`${process.env.REACT_APP_HOST}/Payment/search/${searchCriteria}`)
          .then((response) => {
            console.log(response.data)
            
            
            setSearchResults(response.data);
         
          })
          .catch((error) => {
            console.error(error);
          });
      };

    const setDataOnForm=(data)=>{
    setConditionRendering(!conditionRendering)
    setStudentData(data)
    setCourseId(data.course_ID)
    setStudent_id(data.Student_ID)
    setEntrollmentId(data.Enrollment_ID)
    console.log(data)
    }



    /////////////////======================
    const navigate=useNavigate()
    const {id}=useParams()
  var emi_rupees=0;
  var courseDuratonInMonth=0
    
    const [courseData, setcourseData] = useState([]);
    const loadData = async () => {
      const getdata = await axios.get(
        `${process.env.REACT_APP_HOST}/api/read_courses`
      );
      setcourseData(getdata.data);
      console.log('getdata.data')
      console.log(getdata.data)
    };
  
    const [timeTabledata, settimeTabledata] = useState([]);
    const loadTimeTableData=()=>{
      axios.get(`${process.env.REACT_APP_HOST}/api/getTimeTable`) // Replace this with the endpoint for fetching data from the server
      .then((response) => {
        settimeTabledata(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  
  
    useEffect(() => {
      loadTimeTableData()
      loadData();
    }, []);

    useEffect(()=>{
      if(searchResults.length>0)
      {
        setIsSearchResultsEmpty(false)
      }else{
        setIsSearchResultsEmpty(true)
      }
    },[searchResults])
  
  
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Create an object with the form data
      const paymentData = {
        entrollment_id: entrollmentId,
        student_id:studentId,
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
                setConditionRendering(true)
                setSearchResults([])
              })
              .catch((error) => {
                console.error('Error creating payment:', error);
                // Handle error scenarios
              });
              setConditionRendering(true)
          }},
          {
            label: 'No',
            onClick: () => {}
          }]
      });
  
    };
    

  return (
    <div className="container mt-5">        
      <h2 class="form-categori-lable "  style={{textAlign:'center'}}>Student Fee Entry</h2>
             <div class="form-row">        
                <div class="form-group col-4" >
                <input type="text" className="form-control" id="student_id" name="studnet_id" placeholder="Enter Enrollment ID/ Student ID/ Name"  value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)} />
                </div>
                <div class="form-group col-4">                
                <button class="btn btn-success" onClick={handleSearch} > Search </button>
                </div>            
         </div>
     
  {conditionRendering?(isSearchResultsEmpty?
   <><img style={{height:'200px',width:'420px'}} src={nothingTosee} /><h1>Nothing to see here -yet/.</h1></>:
      <>
        <h2>Search Results:</h2>
        <div>
            <table className="table" style={{marginTop:'20px'}} >
                <thead>
                  <tr>
                    <th>Student Photo</th>
                    <th>Enrollment ID</th>
                    <th>Student ID</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Last Name</th>
                  </tr>
                </thead>
                <tbody style={{cursor:'pointer'}}>
                  {searchResults.map((student) => (
                    <tr onClick={()=>{setDataOnForm(student)}} key={student.student_id}>
                    <td> <img src={`${process.env.REACT_APP_HOST}/uploads/${student.Student_Photo}`} /> </td>
                    <td>{student.Enrollment_ID}</td>
                    <td>{student.Student_ID}</td>
                    <td>{student.First_Name}</td>
                    <td>{student.Middle_Name}</td>
                    <td>{student.Last_Name}</td>
                    </tr>
                  ))}
                  
                </tbody>
              </table>
        </div>
      </>):<>


      <h4 className="form-categori-lable "  >Student Infomation</h4><hr/> 
         <div>
            <table className="table" style={{marginTop:'20px'}}>
                <thead>
                  <tr>
                    <th>Student Photo</th>
                    <th>Student ID</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Last Name</th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><img src={`${process.env.REACT_APP_HOST}/uploads/${studentData.Student_Photo}`} /></td>
                    <td>{studentData.Student_ID}</td>
                    <td>{studentData.First_Name}</td>
                    <td>{studentData.Middle_Name}</td>
                    <td>{studentData.Last_Name}</td>
                    
                  </tr>
                  
                </tbody>
              </table>
        </div>

        <h4 className="form-categori-lable "  >Enrollment & Course Details</h4><hr/> 
                <div>
                    <table className="table" style={{marginTop:'20px'}}>
                        <thead>
                          <tr>
                            <th>Enrollment ID</th>
                            <th>Course Name</th>
                            <th>Course Duration</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Batch No</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{studentData.Enrollment_ID}</td>
                            <td>{studentData.Course_Name}</td>
                            <td>{studentData.Course_Duration} Months</td>
                            <td>{studentData.Start_Date}</td>
                            <td>{studentData.End_Date}</td>
                            <td>{studentData.Batch_No}</td>
                            <td>{studentData.Status}</td>
                          </tr>
                          
                        </tbody>
                      </table>
                </div>  

<form onSubmit={handleSubmit}>

                <h4 className="form-categori-lable "  >Course Fee</h4><hr/> 
                    <div className="form-row">
                
                        <div className="form-group col-md-4">
                            <label for="totalcourseFee">Total Course Fee</label>
                            <input type="text" className="form-control" id="totalcourseFee" name="totalcourseFee" value={studentData.Total_Course_Fee} disabled />
                        </div>
                        <div className="form-group col-md-4">
                            <label for="totalcourseFee">Total Paid Amount</label>
                            <input type="text" className="form-control" id="totalcourseFee" name="totalcourseFee" value={studentData.Total_Paid_Amount} disabled />
                        </div>
                        <div className="form-group col-md-4">
                            <label for="totalcourseFee">Remaining Amount</label>
                            <input type="text" className="form-control" id="totalcourseFee" name="totalcourseFee" value={studentData.Remaining_Amount} disabled />
                        </div>
                    </div>


                    <h4 className="form-categori-lable "  >Enter Payment Details</h4><hr/> 
                    <div className="form-row">
                
                        <div className="form-group col-md-4">
                            <label for="totalcourseFee">Date</label>
                            <input type="date" className="form-control" value={currentDate} id="totalcourseFee" name="totalcourseFee" required />
                        </div>
                        <div className="form-group col-md-4">
                            <label for="totalcourseFee">Amount</label>
                            <input type="text" className="form-control" id="totalcourseFee" name="totalcourseFee"  value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} required />
                        </div>
                        <div className="form-group col-md-4">
                            <label for="totalcourseFee">Remaining Amount</label>
                            <input type="text" className="form-control" id="totalcourseFee" name="totalcourseFee" value={studentData.Remaining_Amount-paymentAmount} />
                        </div>

                        <div className="form-group col-md-4">
                          <label htmlFor="paymentMode">Payment Mode:</label>
                          <select class="form-control" name="mode"  id="paymentMode"
                            value={paymentMode}
                            onChange={(e) => setPaymentMode(e.target.value)}  required>
                            <option value="">Select</option>
                            <option value="Cash">Cash</option>
                            <option value="Online">Online</option>
                            </select>
                         </div>

                    </div>

                
                   
                <div className="form-row text-center" style={{marginTop:'30px'}}>
                    <div className="form-group col-md-12 ">
                        <button type="submit" className="btn btn-lg btn-success">Save</button>
                    </div>
                </div>
</form>
<br/><br/>
       
</>}

    </div>
  )
}

export default Major_Payment_Form