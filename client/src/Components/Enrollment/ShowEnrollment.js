import axios from 'axios'
import { Link, NavLink, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../PageComponet/Pages.css'
import XLSX from 'sheetjs-style'
import { saveAs } from 'file-saver';
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

const ShowEnrollment = () => {
    const [isLoading, setLoading] = useState(false);
    const [courseData, setcourseData] = useState([]);
    const loadData = async () => {
      const getdata = await axios.get(
        `${process.env.REACT_APP_HOST}/api/read_courses`
      );
      setcourseData(getdata.data);
      console.log('getdata.data')
      console.log(getdata.data)
    };
    useEffect(() => {
      loadData();
    }, []);
  
    const [selected_course,set_Course]=useState('')
    const [selected_batch,set_Batch]=useState('')
    let currentDate = new Date().toJSON().slice(0, 10);
    const endDatedateCopy = new Date(currentDate);
    endDatedateCopy.setFullYear(endDatedateCopy.getFullYear() - 1);
    const [startDate,setstartDate]=useState(endDatedateCopy.toJSON().slice(0, 10))
    const [endDate,setendDate]=useState(currentDate)
    
     const [Enrollment_data,setEnrollment_data]=useState([])


      const handleFilter = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_HOST}/enrollment`, {
            params: { startDate, endDate, selected_batch, selected_course },
          });
          setEnrollment_data(response.data);
          console.log("responseFFFFFF.data")
          console.log(response.data)
        } catch (error) {
          console.error(error);
        }
      };
        useEffect(() => {
          handleFilter();
        }, [selected_course,selected_batch,startDate,endDate]);
  
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
                  setTimeout(()=>handleFilter(),500)
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

  
  
  const exportToExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(excelBlob, 'enrollment.xlsx', { autoBom: true });
  };
  
  //check box
  
  const [selectedEnrollment, setSelectedEnrollment] = useState([]);
  const [flag, setFlag] = useState(true);
  let allEnrollment_id=[]
  
  Enrollment_data.map((enrollment) => {
    allEnrollment_id.push(enrollment.enrollment_id)
    })
  
  const selectAll=()=>{
    if(flag)
    {
      setSelectedEnrollment(allEnrollment_id)
      setFlag(false)
    }
    else{
      setSelectedEnrollment([])
      setFlag(true)
    }
  
  }
  
  
  
  
  
  const handleCheckboxChange = (enrl) => {
    if (selectedEnrollment.includes(enrl)) {
      setSelectedEnrollment(selectedEnrollment.filter((h) => h !== enrl));
    } else {
      setSelectedEnrollment([...selectedEnrollment, enrl]);
    }
  };
  
  const handleDownloadIDCard = async() => {
  
  
    setLoading(true);
  
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    console.log('Selected Enrollment:', selectedEnrollment);
    try {
          const response = await axios.get(`${process.env.REACT_APP_HOST}/icard-download`, {
            params: { enrl_id_list: selectedEnrollment },
          }).then((response) => {
            toast.success(" Now You Can Download", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
            });
          }).then(()=>{})
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
          window.open(`${process.env.REACT_APP_HOST}/uploads/fee_receipt.pdf`, "_blank")
          //setEnrollmentDetails(response.data);
        } catch (error) {
          console.error('Error fetching enrollment details:', error);
        }
  };
  
  
  
  const downloadIdCard=()=>{
    window.open(`${process.env.REACT_APP_HOST}/uploads/fee_receipt.pdf`, "_blank");
  }




  return (
    <div>
     <br/>  
      <div className="form-row" style={{justifyContent:'center',columnGap:'10px', alignItems:'center' }}>
        <div  className="form-group col-md-2" >
            <label for="inquiry" style={{marginLeft:'3px'}}>Select Course*</label>
            <select 
            className="form-control"
              id="inquiry_status"
              name="inquiry_status"
              value={selected_course}
              onChange={(e)=>{set_Course(e.target.value)}}>
               <option value="">All</option>
               {
                courseData.map((row,index)=>(
            
                    <option value={row.course_id}>{row.course_name}</option> 
                ))
            }
          </select>
        </div>  

        <div className="form-group col-md-2" >
                <label for="totalcourseFee" style={{marginLeft:'3px'}}> Batch</label>
                <input type="text" className="form-control" id="totalcourseFee"  value={selected_batch} onChange={(e)=>{set_Batch(e.target.value)}} />
         </div>

            <div className="form-group col-md-2" >
                <label for="totalcourseFee" style={{marginLeft:'3px'}}> Start Date</label>
                <input type="date" className="form-control" id="totalcourseFee" name="totalcourseFee" value={startDate} onChange={(e)=>setstartDate(e.target.value)} />
            </div>
            <div className="form-group col-md-2">
                <label for="totalcourseFee" style={{marginLeft:'3px'}}>End Date</label>
                <input type="date" className="form-control" id="totalcourseFee" name="totalcourseFee" value={endDate} onChange={(e)=>setendDate(e.target.value)} />
            </div>

            <div className="form-group col-md-2" style={{marginTop:'25px'}}>
            <button type="Delete" className="btn btn-lg btn-danger form-control" onClick={() => exportToExcel(Enrollment_data)} >Export</button>
          </div>
        </div>
    
        <div className='download-generate-idcard-box'>
            <div className='generate-idcard-btn'  onClick={() => {handleDownloadIDCard()}}  >{isLoading ? 'Generating...' : 'GENERATE ID-CARD'}</div>
           <div className='download-idcard-btn'  onClick={(e) => {downloadIdCard()}}>DOWNLOAD ID-CARD</div>
    </div>
{/* <Link style={{textDecoration:'none'}} to={`/new_enrollment/${id}`} >
  <div className="add-inquiry-box" style={{ color: "Red" }}><div className="add-inquiry">New Enrollment</div></div>
</Link> */}<br/>
<div className='table-margin'>
<table>
      <thead>
        <tr>
          <th style={{cursor:'pointer',textAlign:'center'}} onClick={()=>{selectAll()}}>Select <input type='checkbox' checked={!flag} id='checked'/></th>
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
            <th>Certificate_Generation</th>
        </tr>
      </thead>
      <tbody>
       

      {Enrollment_data.map((enrollment) => (
          <tr key={enrollment.enrollment_id}>

         
          <td style={{textAlign:'center'}} >
            <label>
              <input
                id={enrollment.enrollment_id}
                type="checkbox"
                value={enrollment.enrollment_id}
                checked={selectedEnrollment.includes(enrollment.enrollment_id)}
                onChange={() => handleCheckboxChange(enrollment.enrollment_id)}
              />
            </label>
          </td>

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
            <div className="inquieryEdit-btn"><BiSolidEdit/></div>
           </Link>
          <div className="inquieryDelete-btn" onClick={()=>{deleteStud_Enrollment(enrollment.enrollment_id)}} style={{marginLeft:'10px',color:'red'}}><RiDeleteBin5Line/></div>
            </td>

            <td>
              <label style={{marginLeft:'10px',color:'orange'}} onClick={()=>{
                Certificate_Generated(enrollment.enrollment_id,enrollment.student_id,enrollment.course_id)
              }} >Click Me</label>
            </td>
            {/* Add more table cells as needed */}
          </tr>
        ))}

      </tbody>
    </table>
</div>
<ToastContainer />
    </div>
  )
}

export default ShowEnrollment