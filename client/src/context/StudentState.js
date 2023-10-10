import React, { useState } from 'react'
import StudentContext from './studentContext'

const StudentState = (props) => {
    const [enrollmentList,setEnrollmentData]=useState([])
    const [courseList,setCourses]=useState([])
    const [sidebar, setSidebar] = useState(false);
    const [isAdminLogin,setAdminLoginFlag]=useState(false);
    const [isStaffLogin,setStaffLoginFlag]=useState(false);

    const shareValues={
      enrollmentList,setEnrollmentData,
      courseList,setCourses,
      sidebar, setSidebar,
      isAdminLogin,setAdminLoginFlag,
      isStaffLogin,setStaffLoginFlag
    }
    
  return (
    <>
        <StudentContext.Provider value={shareValues}>
            {props.children}
        </StudentContext.Provider>
    </>
  )
}

export default StudentState