import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Outlet, Route, Routes, useParams } from 'react-router-dom'
import ProfileNavbar from '../Navbar/ProfileNavbar'
import '../PageComponet/Pages.css'
import './style.css'
const Student_Profile = () => {
    const {id}=useParams()
    const [profile_data,setprofile_data]=useState({
        Date_Of_Birth:'',
        address:'',
        board_university:'',
        email:'',
        first_name:'',
        gender:'',
        guardian_name:'',
        guardian_phone_number:'',
        last_name:'',
        last_qualification:'',
        middle_name:'',
        percentage:'',
        phone_number:'',
        student_id:'',
        upload_identity_document:'',
        upload_last_qualification_marksheet:'',
        upload_photo:'',
            })

const loadData = async () => {    
    const getdata = await axios.get(
      `${process.env.REACT_APP_HOST}/api/view_student_profile/${id}`
    );
    setprofile_data({...getdata.data[0]});
  };
  useEffect(() => {loadData();
  }, [id]);

  const [current_flag,set_flag]=useState(true)


  const downloadDocument=(documentUrl)=>{
    window.open(documentUrl, "_blank");
  }


  return (
    <div className='student_profile_back'>
      <ProfileNavbar id={id} flag={set_flag} flag_val={current_flag} img_src={`${process.env.REACT_APP_HOST}/uploads/${profile_data.upload_photo}`}/>
      
      <div className='student_profile_section-box'>
      <br/>
      
      
     
      <Outlet/>



        {
          /* <Link style={{textDecoration:'none'}} to={`/AddPayment/${id}`}>
          <div className="add-inquiry-box" style={{ color: "Red" }}><div className="add-inquiry">Add Payment</div></div>
        </Link> */
        }

    </div>
    </div>
  )
}

export default Student_Profile
