import axios from 'axios';
import React, { useState } from 'react'
import nothingTosee from '../../images/nothingTosee.png'
import { useNavigate } from 'react-router';

const Search_Profile = () => {
    const navigator=useNavigate()
    const [searchCriteria, setSearchCriteria] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  //Searching
  const handleSearch = () => {
   // setConditionRendering(true)
      axios.get(`${process.env.REACT_APP_HOST}/enrollment/search/${searchCriteria}`)
        .then((response) => {
          setSearchResults(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const setDataOnForm=(data)=>{
        console.log(data.student_id)
        let url='/student_profile/studentInfo/'+data.student_id;
        navigator(url)
        }
  return (
    <div className="container mt-5">        
    <div className="form-row">        
        <div className="form-group col-4" >
            <input type="text" className="form-control" id="student_id" name="studnet_id" placeholder="Enter Student ID / Name"  value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)} />
        </div>
        <div className="form-group col-6">                
            <button class="btn btn-success" onClick={handleSearch} > Search </button>
        </div>            
    </div>
    {searchResults.length>0?(
    <>


<br/>

    <div class=" student-search-box">
    {searchResults.map((student) => (
    <div class="student-search-card"  onClick={()=>{setDataOnForm(student)}} key={student.student_id}>
    
        <div class="student-search-img-box">
            <img src={`${process.env.REACT_APP_HOST}/uploads/${student.upload_photo}`} />
        </div>
      
        <div class="other-details">Student ID: {student.student_id}</div>
        <div class="student-name"style={{fontWeight:'bold'}} >{student.first_name} {student.last_name}</div>
         <div class="other-details">Mobile No.: {student.phone_number}</div>
    </div>

    ) )}  
    </div>
</>):<><img style={{height:'200px',width:'420px'}} src={nothingTosee} /><h1>Nothing to see here -yet.</h1></>}
   
    </div>
  )
}

export default Search_Profile