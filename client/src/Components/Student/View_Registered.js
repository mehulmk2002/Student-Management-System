import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Pages.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import XLSX from 'sheetjs-style'
// import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { LuView } from "react-icons/lu";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";


const View_Registered = () => {
  let currentDate = new Date().toJSON().slice(0, 10);
  const endDatedateCopy = new Date(currentDate);
  endDatedateCopy.setFullYear(endDatedateCopy.getFullYear() - 1);

  const [startDate,setstartDate]=useState(endDatedateCopy.toJSON().slice(0, 10))
  const [endDate,setendDate]=useState(currentDate)

  const [details, setDetails] = useState([]);
  const [search_by_id_name,set_id_name]=useState()

  const [all_inquiry_data, setAllStud_data] = useState([]);
  const [inquiry_data, setinquiry_data] = useState([]);

//Fetch Data
const loadDataStudent = async () => {

  const getdata = await axios.get(
    `${process.env.REACT_APP_HOST}/registration/search_by_name_id_date`,
    {
      params: { search_by_id_name: search_by_id_name,startDate:startDate,endDate:endDate },
    }
  );
  var a_startDate = new Date(startDate);
  var a_endDate = new Date(endDate);
  console.log(getdata.data)

  setDetails(getdata.data);
  setAllStud_data(getdata.data)
};

useEffect(() => {
  loadDataStudent();
},[search_by_id_name,startDate,endDate]);


  const deleteIquery=(id)=>{
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this.',
      buttons: [{

          label: 'Yes',
          onClick: () => {                   
          axios.delete(`${process.env.REACT_APP_HOST}/api/student_profile/remove/${id}`);
          console.log("Delete: "+id)
          setTimeout(()=>loadDataStudent(),500)
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
    saveAs(excelBlob, 'data.xlsx', { autoBom: true });
  };


  return (
    <div>
<div className="form-row" style={{justifyContent:'center',columnGap:'10px', alignItems:'center' }}>
    
        <div className="form-group col-md-2" >
                <label for="totalcourseFee" style={{marginLeft:'3px'}}> ID & Name</label>
                <input type="text" className="form-control" id="totalcourseFee"  value={search_by_id_name}  onChange={(e)=>{set_id_name(e.target.value)}} />
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
            <button type="Delete" className="btn btn-lg btn-danger form-control" onClick={() => exportToExcel(details)} >Export</button>
          </div>
        </div>



    <div className='table-margin'>
      <table style={{width:'100px'}}>
        <thead>
          <tr>
          <th>Goto Profile</th>
           <th>Student ID</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Guardian Name</th>
            <th>Guardian Phone Number</th>
            <th>Last Qualification</th>
            <th>Board/University</th>
            <th>Percentage</th>
            <th>register_date</th>
            <th>Identity Document</th>
            <th>Photo</th>
            <th>Last Qualification Marksheet</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail) => (
            
            <tr key={detail.id}>
            <td> <Link style={{margin:"0 5px",fontSize:'25px'}}  to={`/student_profile/studentInfo/${detail.student_id}`}>
            <LuView/>
              </Link>
              </td>
            <td>{detail.student_id}</td>
              <td>{detail.first_name}</td>
              <td>{detail.middle_name}</td>
              <td>{detail.last_name}</td>
              <td>{detail.Date_Of_Birth}</td>
              <td>{detail.gender}</td>
              <td>{detail.address}</td>
              <td>{detail.email}</td>
              <td>{detail.phone_number}</td>
              <td>{detail.guardian_name}</td>
              <td>{detail.guardian_phone_number}</td>
              <td>{detail.last_qualification}</td>
              <td>{detail.board_university}</td>
              <td>{detail.percentage}</td>
              <td>{detail.register_date}</td>
              <td><img src={`${process.env.REACT_APP_HOST}/uploads/${detail.upload_identity_document}`} /></td>
              <td> <img src={`${process.env.REACT_APP_HOST}/uploads/${detail.upload_photo}`} /> </td>
              <td> <img src={`${process.env.REACT_APP_HOST}/uploads/${detail.upload_last_qualification_marksheet}`} /> </td>
              <td  style={{display:'flex'}} >
              <Link style={{margin:"0 5px"}} to={`/updateStudent/${detail.student_id}`}>
              <div className="inquieryEdit-btn"> <BiSolidEdit/></div>
              </Link>
              <Link style={{margin:"0 5px"}}  to={`/student_profile/studentInfo/${detail.student_id}`}>
               <div className='inquieryconfirm-btn'><LuView/></div> 
              </Link>
              <div className="inquieryDelete-btn"  style={{color:'red'}}  onClick={()=>deleteIquery(detail.student_id)}><RiDeleteBin5Line/></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div></div>
  );
};

export default View_Registered;
