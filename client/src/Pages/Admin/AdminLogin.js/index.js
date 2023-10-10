import React, { useContext, useState } from 'react';
import './style.css'
import axios from 'axios';
import studentContext from '../../../context/studentContext';
import { Navigate } from 'react-router';
import { useNavigate } from "react-router-dom";
import '../../../Components/Pages.css'
const Index = () => {
    let navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('');
  const [password, setPassword] = useState('');
  const [invalidDetail,setInvalidDetail]= useState('');
    const {isAdminLogin,setAdminLoginFlag,isStaffLogin,setStaffLoginFlag}=useContext(studentContext)

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_HOST}/adminLogin`, {
        username: userName,
        userType,
        password,
      });

      if('success'==response.data.status){
        console.log(response.data);
        if(userType=='admin'){
            console.log("Admin");
            localStorage.setItem("userName",userName);
            localStorage.setItem("userType",userType);
            setAdminLoginFlag(true)
        }
        if(userType=='staff'){
            console.log("Staff");
            localStorage.setItem("userName",userName);
            localStorage.setItem("userType",userType);
            setStaffLoginFlag(true)
        }
      }

      else{
        console.log("Invalid Details")
        setInvalidDetail("*Invalid Details")
      }
     // Display the server response message
     navigate('/')
    } catch (error) {
      console.error('Error:', error);
    }
  };


  
  return (
    <div style={{margin:'0 auto'}}>
    <div className='form-container'>
    <h2 style={{textAlign:'center'}}>Login</h2>
    
  <div style={{color:'red',textAlign:'center'}}>{invalidDetail}</div>
      <form onSubmit={handleLogin}>
        <label>User Name:</label>
          <input className="form-control"  type="text" autoComplete='off' value={userName} onChange={(e) => setUserName(e.target.value)} />
        
       
        <label>User Type:  </label>
          <select className="form-control"  value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="">Select User Type</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
      
       
        <label>
          Password:  </label>
          <input className="form-control"  type="password" autoComplete='off' value={password} onChange={(e) => setPassword(e.target.value)} />
      
      <br/> 
      <div className="form-row text-center" >
                    <div className="form-group col-md-12 " >
        <button className="btn btn-lg btn-success" type="submit">Login</button>
        </div></div>
      </form>
      </div>
    </div>
  );
};

export default Index;
