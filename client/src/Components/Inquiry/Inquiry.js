import React, { useEffect, useRef, useState } from "react";
import { Link, json } from "react-router-dom";
import axios from "axios";
import './Inquiry.css'
import '../Pages.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import XLSX from 'sheetjs-style'
import { saveAs } from 'file-saver';
import { ToastContainer, toast } from "react-toastify";
import Dialog from '../Dialog';
import { MdPendingActions } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";


export default function Inquiry() {
  const [isConfirmpage,setConfirmpage]=useState(true);
  //Geting Current Date

  let currentDate = new Date().toJSON().slice(0, 10);
  const endDatedateCopy = new Date(currentDate);
  endDatedateCopy.setFullYear(endDatedateCopy.getFullYear() - 1);
  
  //states for filtering inquiry  records
  const [inquiry_status_filter,setInquiry_status_filter]=useState('Pending')
  const [startDate,setstartDate]=useState(endDatedateCopy.toJSON().slice(0, 10))
  const [endDate,setendDate]=useState(currentDate)

  //states for the stored the record 
  const [all_inquiry_data, setAllinquiry_data] = useState([]);
  const [inquiry_data, setinquiry_data] = useState([]);

  const inquiryFilter=(e)=>{
      const { name, value } = e.target;
      setInquiry_status_filter(value)
    }


//delete Inquiry
//Confirmation BOX
const idForDelete = useRef();
 const [dialog, setDialog] = useState({
  message: "",
  isLoading: false,
  nameProduct: ""
});

const handleDialog = (message, isLoading, nameProduct) => {
  setDialog({
    message,
    isLoading,
    nameProduct
  });
};

const handleDelete = (id) => {
  handleDialog("Are you sure you want to delete?", true, id);
  idForDelete.current = id;

};

const areUSureDelete = async (choose) => {
  if (choose) {
    handleDialog("", false);
    await axios.delete(`${process.env.REACT_APP_HOST}/inquiry/${idForDelete.current}`);
    setTimeout(() => fetchData(), 500);
  } else {
    handleDialog("", false);
  }
};









//delete Inquiry
const changeInquiryStatus = async (id) => {
  try {
    await confirmAlert({
      title: 'Change Status',
      message: 'Are you sure you! want to delete this item?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.post(`${process.env.REACT_APP_HOST}/inquiry/changeInquiryStatus/${id}`);
               fetchData()
            } catch (error) {
              console.error('Error deleting item:', error);
              // Handle the error here, such as showing an error message to the user
            }
           await fetchData()
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  } catch (error) {
    console.error('Error displaying confirmation dialog:', error);
    // Handle the error here, such as showing an error message to the user
  }
};

// this function will export data into excel Sheet
  const exportToExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(excelBlob, 'student-inquiries.xlsx', { autoBom: true });
    toast.success("export successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    });
  };
  
  
//loadData Function will call when following variable value will change
  // useEffect(() => {
  //   loadData();
  // },[inquiry_status_filter,startDate,endDate]);



  const [status, setStatus] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [inquiry_status_filter, startDate, endDate]);


  const fetchData = async () => {
  console.log(typeof(inquiry_status_filter))
    if(inquiry_status_filter==="Panding"){
      setConfirmpage(true)
    }
    if(inquiry_status_filter==="Confirm"){
      setConfirmpage(false)
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}/inquiry/inquiries?status=${inquiry_status_filter}&fromDate=${startDate}&toDate=${endDate}`
      );
      setFilteredData(response.data);
      setinquiry_data(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{padding:'5px 10px'}}>
      <br/>  
      <div className="form-row" style={{justifyContent:'center',columnGap:'10px', alignItems:'center' }}>

        <div  className="form-group col-md-2" >
            <label for="inquiry" style={{marginLeft:'3px'}}>Inquiry Status*</label>
            <select className="form-control" id="inquiry_status"  name="inquiry_status" value={inquiry_status_filter} onChange={inquiryFilter} >
                <option value="Pending">Pending</option>
                <option value="Confirm">Confirm</option>     
            </select>
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
            <button type="Delete" className="btn btn-lg btn-danger form-control" onClick={() => exportToExcel(inquiry_data)} >Export</button>
          </div>
        </div>

    <div className='table-margin'>
      <table >
        <thead>
          <tr>
            <th style={{ padding: "8px" }}>
              Form No
            </th>
            <th style={{ padding: "8px",width:'200px' }}>
              Full Name
            </th>
            <th style={{ padding: "8px" }}>
              Gender
            </th>
            <th style={{ padding: "8px",width:'110px' }}>
              Course Name
            </th>
            <th style={{ padding: "8px",width:'200px' }}>
              Address
            </th>
            <th style={{ padding: "8px" }}>
              Phone Number
            </th>
            <th style={{ padding: "8px",width:'110px' }}>
              Inquiry Date
            </th>
            <th style={{ padding: "8px",width:'110px' }}>
              Expected Joining Date
            </th>
            <th style={{ padding: "8px",textAlign:'center' }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}  style={{ borderBottom: "1px solid blueviolet",height:"30px" }}>
              <td style={{ padding: "8px", fontWeight:'bold' }}>{row.form_no}</td>
              <td style={{ padding: "8px" }}>{row.full_name}</td>
              <td style={{ padding: "8px" }}>{row.gender}</td>
              <td style={{ padding: "8px" }}>{row.course_name}</td>
              <td style={{ padding: "8px" }}>{row.address}</td>
              <td style={{ padding: "8px" }}>{row.phone_number}</td>
              <td style={{ padding: "8px" }}>{row.inquiry_date}</td>
              <td style={{ padding: "8px" }}>{row.expected_joining_date}</td>
              <td  style={{ padding: "8px", alignItems:'center' }}>
              <div style={{display:'flex'}}>
              <Link  style={{textDecoration:'none'}} to={`/Update_Inquiry/${row.form_no}`}>
               <div className="inquieryEdit-btn">  <BiSolidEdit/></div>
              </Link>
              <div  className="inquieryDelete-btn" style={{color:'red'}} onClick={()=>handleDelete(row.form_no)}><RiDeleteBin5Line/></div>
              {inquiry_status_filter=="Pending"?<div className="inquieryconfirm-btn" style={{color:'green'}} onClick={()=>{changeInquiryStatus(row.form_no)}} ><MdPendingActions/></div>:<></> }
             
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <ToastContainer />

      {dialog.isLoading && (
        <Dialog
          nameProduct={dialog.nameProduct}
          onDialog={areUSureDelete}
          message={dialog.message}
        />
      )}
    </div>
  );
}
