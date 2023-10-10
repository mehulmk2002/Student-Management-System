import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Sidebar
import Sidebar from '../../Components/Navbar/Sidebar/Sidebar';
//pange note-found
import NoPage from '../../Components/NoPage';

//inquiry-section
import Update_Inquiry from '../../Components/Inquiry/Update_Inquiry';
import Inquiry from '../../Components/Inquiry/Inquiry';
import InquiryForm from '../../Components/Inquiry/Inquiry_form';

import ShowCourses from '../../Components/Course/ShowCourses'
import PaymentForm from '../../Components/Modal/PaymentForm';



import Registration_Form from '../../Components/Forms/Registration_Form';
import Search_Profile from '../../Components/Student/Search_Profile';
import Student_Profile from '../../Components/Student/Student_Profile';
import StudentInfo from '../../Components/Student/StudentInfo';
import Stud_Entrollment from '../../Components/Student/Stud_Entrollment';
import Stud_Transaction from '../../Components/Student/Stud_Transaction';
import Update_Registered_Student from '../../Components/Student/Update_Registered_Student';
import View_Registered from '../../Components/Student/View_Registered';

// import Student_Profile from '../../Components/PageComponet/Student_Profile';
import Enrollment_Form from '../../Components/Forms/Enrollment_Form';
import Update_Enrollment from '../../Components/Forms/Update_Enrollment';
import Update_Payment from '../../Components/Forms/Update_Payment';
import Certificate from '../../Components/Student/Certificate';
import Certificates_Dist from '../../Components/Student/Certificates_Dist';

import './Admin_Control.css'

import WelcomeHome from '../../Components/PageComponet/WelcomeHome';
import studentContext from '../../context/studentContext';
import AdminLogin from './AdminLogin.js'
import Dashboard from '../../Components/Dashboard'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import styled from "styled-components";
import AddNewTransactions from '../../Components/Expense/AddNewTransactions';
import ShowTransactions from '../../Components/Expense/ShowTransactions';
import Major_Payment_Form from '../../Components/Forms/Major_Payment_Form';
import AddCourse_Form from '../../Components/Course/AddCourse_Form';
import UpdateCourseData from '../../Components/Course/UpdateCourseData';
import ShowBatchesTime from '../../Components/BatchesTime/ShowBatchesTime';
import AddTimeTable from '../../Components/BatchesTime/AddTimeTable';
import UpdateTimeTableData from '../../Components/BatchesTime/UpdateTimeTableData';
import NewEnrollment from '../../Components/Enrollment/NewEnrollment';
import ShowEnrollment from '../../Components/Enrollment/ShowEnrollment';
import UpdateAccount from '../../Components/Expense/UpdateAccount';
import Attendance_inForm from '../../Components/Attendance/Attendance_inForm';
import ShowAttendance from '../../Components/Attendance/ShowAttendance';

import "../../Bootstrap/css/bootstrap.min.css";
import EditAttendance from '../../Components/Attendance/EditAttendance';
import '../../Components/Pages.css'

// ======== Public Page Componets ======= 
import TopNavbar from '../Public_Page/Navbar/TopNavbar';
import User_Courses from '../Public_Page/User_Courses';
import Gallery from '../Public_Page/Gallery';
import AboutUs from '../Public_Page/AboutUs';
import ContactUs from '../Public_Page/ContactUs';
import HomePage from '../Public_Page/Public_Home/HomePage';
import Footer from '../Public_Page/BottomFooter/Footer'
import Add_Courses from '../../Components/Public_Courses/Add_Courses';
import ShowCoursesTable from '../../Components/Public_Courses/ShowCoursesTable';
import AddToGallery from '../../Components/Gallery/AddToGallery';
import ShowGallery from '../../Components/Gallery/ShowGallery';

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;


export default function Admin_Control() {
  let [innerWidth, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);
  let navigate = useNavigate();
const {sidebar, setSidebar,isAdminLogin,setAdminLoginFlag,isStaffLogin,setStaffLoginFlag}=useContext(studentContext)

const showSidebar = () => setSidebar(!sidebar);

useEffect(() => {
  const userName = localStorage.getItem("userName");
  const userType = localStorage.getItem("userType");
  if (userName && userType=='admin') {
    setAdminLoginFlag(true);
  }
  else if (userName && userType=='staff') {
    setStaffLoginFlag(true);
  }
}, [setAdminLoginFlag]);


let onClickLogout = () => {
  localStorage.clear();
  onClickRefresh();
};
let onClickRefresh = () => {
  navigate(0);
};

  return (<>
{isAdminLogin || isStaffLogin ?
            <div className='admin-page'>
            {/* ======== Admin Page ======= */}
              <Nav>
                    <NavIcon to="#">
                      <FaIcons.FaBars style={{color:'#ffff'}}  className='FaBars-bar' onClick={showSidebar} />
                    </NavIcon>
                    <div className='top-header-navbar'>
                    {innerWidth > 800&&( <h1
                      style={{
                        textAlign: "center",
                        marginRight: "200px",
                        color: "#ced6cf"
                      }}
                    >
                      MEET COMPUTER TRAINING CENTER
                    </h1>)}
                  
                    <div className='logout-btn' onClick={onClickLogout}>Logout</div></div>
              </Nav>

            <div className='sub-admin-box'>
              <Sidebar/>
              <div className={`${sidebar ? 'admin_control_right_section' : 'admin_control_right_section_with_nomargin'}`}>
            
                  <Routes>
                      <Route ><Route path='/' element={<Dashboard/>}/>
                      <Route path='/inquiry' element={<Inquiry/>}/>
                      <Route path='/AddInquiry' element={<InquiryForm/>}/>
                      <Route path='/Update_Inquiry/:id' element={<Update_Inquiry/>}/>

                      {/* Student */}
                      <Route path='/searchProfile' element={<Search_Profile/>}/>


                      <Route path='/viewStudents' element={<View_Registered/>}/>
                      <Route path='/addStudent' element={<Registration_Form/>}/>
                      <Route path='/updateStudent/:id' element={<Update_Registered_Student/>}/>
                      

                      <Route path='/AddPayment/:id' element={<PaymentForm/>}/>
                      <Route path='/new_enrollment/:id' element={<Enrollment_Form/>}/>

                      <Route path='/student_profile/' element={<Student_Profile/>}>
                          <Route path='entrollment/:id' element={<Stud_Entrollment/>}>
                            <Route path='Update_Enrollment/:id' element={<Update_Enrollment/>}/>
                          </Route>
                          <Route path='transaction/:id' element={<Stud_Transaction/>}/>
                          <Route path='studentInfo/:id' element={<StudentInfo/>}/>
                          <Route path='certificates/:id' element={<Certificate/>}/>
                          <Route path='certificates_dist/:id' element={<Certificates_Dist/>}/>    
                      </Route>

                      <Route path='/Update_Enrollment/:id' element={<Update_Enrollment/>}/>
                      <Route path='/Update_Payment/:id' element={<Update_Payment/>}/>

                      <Route path='/AddCourse' element={<AddCourse_Form/>}/>
                      <Route path='/Courses' element={<ShowCourses/>}/>
                      <Route path='/Update_Course/:id' element={<UpdateCourseData/>}/>

                      <Route path='/Enrollment' element={<ShowEnrollment/>}/>

                      <Route path='/AddTimeTable' element={<AddTimeTable/>}/>
                      <Route path='/TimeTable' element={<ShowBatchesTime/>}/>
                      <Route path='/Update_TimeTable/:batch_no' element={<UpdateTimeTableData/>}/>

                      <Route path='/AddNewTransactions' element={<AddNewTransactions/>}/>
                      <Route path='/ShowTransactions' element={<ShowTransactions/>}/>
                      <Route path='/Account/:id' element={<UpdateAccount/>}/>

                      <Route path='/NewEnrollment' element={<NewEnrollment/>}/>
                      <Route path='/NewPayment' element={<Major_Payment_Form/>}/>


                      <Route path='/inAttendance' element={<Attendance_inForm/>}/>
                      <Route path='/ShowAttendance' element={<ShowAttendance/>}/>
                      <Route path='/attendanceEdit/:attendanceId' element={<EditAttendance/>}/>
                      <Route path='/Add_CoursesPublic' element={<Add_Courses/>}/>
                      <Route path='/showCoursesPublish' element={<ShowCoursesTable/>}/>

                      <Route path='/addGallery' element={<AddToGallery/>}/>
                      <Route path='/ShowGallery' element={<ShowGallery/>}/>
                      <Route path='/*' element={<NoPage/>}/></Route>
                  </Routes> 
                </div>
             </div>
            </div>
            :<>
                {/* ======== Public Page ======= */}
                <TopNavbar/>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/AdminLogin' element={<AdminLogin/>}/>
                    <Route path='/cources' element={<User_Courses/>}/>
                    <Route path='/gallery' element={<Gallery/>}/>
                    <Route path='/about-us' element={<AboutUs/>}/>
                    <Route path='/contact-us' element={<ContactUs/>}/>
                </Routes>
                <br/>
                <Footer/>
            </>
}
    </>
  )
}
