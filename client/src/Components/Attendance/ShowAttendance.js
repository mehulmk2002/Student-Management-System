// Frontend (React.js) code

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import XLSX from 'sheetjs-style'
import { saveAs } from 'file-saver';
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";
const ShowAttendance = () => {
  


  const [attendanceData, setAttendanceData] = useState([]);
  const [filters, setFilters] = useState({
    student_id: '',
    enrollment_id: '',
    course_id: '',
    batch_no: '',
    startDate: new Date().toJSON().slice(0, 10),
    endDate: new Date().toJSON().slice(0, 10),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const loadAttendanceData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_HOST}/attendance/filter`, { params: filters });
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };


  const exportToTransformExcel = (data) => {

    const newData = data.map(({ attendance_id, in_time, attendanceVal, out_time, ...rest }) => rest);



    const mergeData = (data) => {
      const mergedData = {};
      
      data.forEach((item) => {
        const studentKey = `${item.student_id}_${item.enrollment_id}_${item.course_id}_${item.batch_no}`;
        
        if (!mergedData[studentKey]) {
          mergedData[studentKey] = { ...item };
          mergedData[studentKey].date = [item.date];
        } else {
          mergedData[studentKey].date.push(item.date);
        }
      });
      
      return Object.values(mergedData);
    };
    
    const mergedData = mergeData(newData);
  
  
    const addPToDates = (data) => {
      const newData = data.map((item) => ({
        ...item,
        date: item.date.reduce((acc, date) => {
          acc[date] = 'P';
          return acc;
        }, {})
      }));
      
      return newData;
    };
    
    const newDataWithP = addPToDates(mergedData);
   
    
    const spreadDatesAndRemoveDateProp = (data) => {
      return data.map((item) => {
        const { date, ...rest } = item;
        return {
          ...rest,
          ...date
        };
      });
    };

    const  mergedNamesArray= spreadDatesAndRemoveDateProp(newDataWithP);
    

const newDataWithoutDateProp = mergedNamesArray.map(obj => {
  const { first_name, middle_name, last_name, ...rest } = obj;
  return { student_id: obj.student_id,
    full_name: `${first_name} ${middle_name} ${last_name}`,
  
    ...rest,
    
  };
});



    console.log(newDataWithoutDateProp)
    const worksheet = XLSX.utils.json_to_sheet(newDataWithoutDateProp);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(excelBlob, 'enrollment.xlsx', { autoBom: true });
  };


  const exportToExcel = (data) => {

    const mergedNamesArray = data.map(obj => {
      const { first_name, middle_name, last_name, ...rest } = obj;
      return { 
        student_id: obj.student_id,
        full_name: `${first_name} ${middle_name} ${last_name}`,
      
        ...rest,
        
      };
    });


    const worksheet = XLSX.utils.json_to_sheet(mergedNamesArray);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(excelBlob, 'student-attendance.xlsx', { autoBom: true });
    toast.success("export successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    });
  };


  const handleDelete = async (attendanceId) => {
    try {
      // Send a DELETE request to delete the attendance data
      await axios.delete(`${process.env.REACT_APP_HOST}/attendance/${attendanceId}`);
      // Handle success, maybe show a success message or redirect to another page
      toast.success("Delete Successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      loadAttendanceData()
    } catch (error) {
     console.log(error)
    }
  };

  useEffect(()=>{
    loadAttendanceData();
  },[filters.student_id,filters.enrollment_id,filters.batch_no,filters.course_id,filters.startDate,filters.endDate])

  return (
    <div>
      <h2 style={{textAlign:'center'}}>Show Attendance</h2>
      <div className="form-row" style={{justifyContent:'center',columnGap:'10px', alignItems:'center' }}>
      
        <div className="form-group col-md-2" >
                <label  style={{marginLeft:'3px'}}> Student ID</label>
                <input  className="form-control" type="text" name="student_id" placeholder="Student ID" value={filters.student_id} onChange={handleChange} />
       </div>
       

         <div className="form-group col-md-2" >
                <label  style={{marginLeft:'3px'}}> Enrollment ID</label>
                <input  className="form-control" type="text" name="enrollment_id" placeholder="Enrollment ID" value={filters.enrollment_id} onChange={handleChange} />
          </div>

         <div className="form-group col-md-2" >
                <label  style={{marginLeft:'3px'}}> Course ID</label>
                <input  className="form-control" type="text" name="course_id" placeholder="Course ID" value={filters.course_id} onChange={handleChange} />
         </div>


         <div className="form-group col-md-2" >
                <label  style={{marginLeft:'3px'}}> Batch NO</label>
                <input  className="form-control" type="text" name="batch_no" placeholder="Batch No" value={filters.batch_no} onChange={handleChange} />
           </div>
        </div>

           <div className="form-row" style={{justifyContent:'center',columnGap:'10px', alignItems:'center' }}>
           <div className="form-group col-md-2" >
                <label  style={{marginLeft:'3px'}}> Start Date</label>
                
         <input  className="form-control" type="date" name="startDate" placeholder="Start Date" value={filters.startDate} onChange={handleChange} />
         </div>

           <div className="form-group col-md-2" >
                <label  style={{marginLeft:'3px'}}> End Date</label>
                <input  className="form-control" type="date" name="endDate" placeholder="End Date" value={filters.endDate} onChange={handleChange} />
          </div>

          <div className="form-group col-md-2" style={{marginTop:'25px'}}>
            <button  className="btn btn-lg btn-danger form-control" style={{fontSize:'18px'}} onClick={() => exportToExcel(attendanceData)} >Normal Export</button>
          </div>

          <div className="form-group col-md-2" style={{marginTop:'25px'}}>
            <button  className="btn btn-lg btn-danger form-control" style={{fontSize:'18px'}} onClick={() => exportToTransformExcel(attendanceData)} >Transform Export</button>
          </div>

      </div>
      
    <div className='table-margin'>
      <table>
        {/* Table headers */}
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Enrollment ID</th>
            <th>Course ID</th>
            <th>Batch No</th>
            <th>Date</th>
            <th>In Time</th>
            <th>Out Time</th>
            <th>Attendance Value</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* Table rows */}
        <tbody>
          {attendanceData.map((attendance) => (
            <tr key={attendance.attendance_id}>
              <td>{attendance.student_id}</td>
              <td>{attendance.first_name} {attendance.middle_name} {attendance.middle_name}</td>

              <td>{attendance.enrollment_id}</td>
              <td>{attendance.course_id}</td>
              <td>{attendance.batch_no}</td>
              <td>{attendance.date}</td>
              <td>{attendance.in_time}</td>
              <td>{attendance.out_time}</td>
              <td>{attendance.attendanceVal}</td>
              <td > <Link style={{fontSize:'20px'}}  to={`/attendanceEdit/${attendance.attendance_id}`}><BiSolidEdit/></Link>{' '}
              <label style={{fontSize:'20px',color:'red',cursor:'pointer'}} onClick={()=>{handleDelete(attendance.attendance_id)}}><RiDeleteBin5Line/></label>
              </td>
            </tr>
          ))}
        </tbody>
      </table></div>
    <ToastContainer />
    </div>
  );
};

export default ShowAttendance;
