import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import UpdatePhoto from './DocumentUpdate/UpdatePhoto';
import UpdateIdentityPhoto from './DocumentUpdate/UpdateIdentityPhoto';
import UpdateQualificationPhoto from './DocumentUpdate/UpdateQualificationPhoto';

const StudentInfo = () => {
    const {id} =useParams();
    const [isEditable,setEditableFlag]=useState(false);
    const [studentData, setStudentData] = useState({});
    const [current_flag,set_flag]=useState(true)
    const [openUpdatePhoto,setOpenUpdatePhoto]=useState(false)
    const [openUpdateIdentity ,setOpenUpdateIdentity ]=useState(false)
    const [openUpdateQualification ,setOpenUpdateQualification ]=useState(false)

    const loadData = async () => {    
        const getdata = await axios.get(
          `${process.env.REACT_APP_HOST}/api/view_student_profile/${id}`
        );
        setStudentData({...getdata.data[0]});
      };
      useEffect(() => {loadData();
      }, [id]);



      const downloadDocument=(documentUrl)=>{
        window.open(documentUrl, "_blank");
      }
      const handleChange = (event) => {
        const { name, value } = event.target;
        setStudentData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit = async (event) => {
        event.preventDefault();

        // Perform your API call using Axios to send a POST request
        axios.put(`${process.env.REACT_APP_HOST}/update/stud_details/${id}`, studentData)
          .then((response) => {
            console.log('Payment created:', response.data);
            // Reset the form after successful submission
            loadData();
            setEditableFlag(false)
          })
          .catch((error) => {
            console.error('Error creating payment:', error);
            // Handle error scenarios
          });
       
      };
      const CloseUpdatePhoto=()=>{ setOpenUpdatePhoto(false);loadData()}
      const CloseUpdateIdentity=()=>{ setOpenUpdateIdentity(false);loadData()}
      const CloseUpdateQualification=()=>{ setOpenUpdateQualification(false);loadData()}
  return (
    <div>

      <div class="container mt-1">
            <form style={{marginTop:'50px'}} onSubmit={handleSubmit}>
                <h4 class="form-categori-lable "  >Student Informaiton</h4><hr/>       
        <div class="form-row">
            <div class="form-group col-md-4 text-center" style={{padding:'20px'}}>
                <div class="col-md-12 mx-auto d-block " style={{cursor:'pointer'}} onClick={()=>{downloadDocument(`${process.env.REACT_APP_HOST}/uploads/${studentData.upload_photo}`)}}>
                    <img class="rounded-circle shadow-strong border  border-dark" alt="student photo" src={`${process.env.REACT_APP_HOST}/uploads/${studentData.upload_photo}`} style={{width:"170px", height:"170px"}} />
                </div>     
                {isEditable&& <div style={{color:'blue',cursor:'pointer'}} onClick={()=>setOpenUpdatePhoto(true)}><span className="fas fa-pencil-alt"></span>Edit</div>}        
            </div>               
            <div class="form-group col-md-4">
                <div class="row">
                    <div class="col-12">
                        <label for="first_name">First Name</label>
                        <input type="text" class="form-control" id="first_name" name="first_name" value={studentData.first_name} onChange={handleChange} required {...(isEditable ? {} : { disabled: true })} />
                    </div>
                    <div class="col-12">
                        <label for="middle_name">Middle Name</label>
                         <input type="text" class="form-control" id="middle_name" name="middle_name" value={studentData.middle_name} onChange={handleChange} required {...(isEditable ? {} : { disabled: true })} />
                    </div>  
                    <div class="col-12">
                        <label for="last_name">Last Name</label>
                        <input type="text" class="form-control" id="last_name" name="last_name" value={studentData.last_name} onChange={handleChange} required   {...(isEditable ? {} : { disabled: true })} />
                    </div>      
                </div>
            </div>
            <div class="form-group col-md-4">
                <div class="row">
                    <div class="col-12">
                        <label for="student_id">Student ID</label>
                        <input type="text" class="form-control" id="first_name" name="student_id"  value={studentData.student_id}   {...(isEditable ? {} : { disabled: true })} />
                    </div>
                    <div class="col-12">
                        <label for="Date_Of_Birth">Date of Birth</label>
                        <input type="date" class="form-control" id="Date_Of_Birth"  name="Date_Of_Birth" value={studentData.Date_Of_Birth} onChange={handleChange} required   {...(isEditable ? {} : { disabled: true })} />
                    </div>
                    <div class=" col-12">
                        <label for="gender">Gender</label>
                        <select class="form-control" id="gender"  name="gender" value={studentData.gender} onChange={handleChange} required {...(isEditable ? {} : { disabled: true })}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                </div>
                
            </div>
        </div>    
                <h4 class="form-categori-lable">Guardian / Parents Information</h4><hr/>
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label for="guardian_name">Guardian / Parents Name</label>
                        <input type="text" class="form-control" id="guardian_name"  name="guardian_name" value={studentData.guardian_name} onChange={handleChange}  {...(isEditable ? {} : { disabled: true })} />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="guardian_phone_number">Guardian /  Phone Number</label>
                        <input type="tel" class="form-control" id="guardian_phone_number" name="guardian_phone_number" value={studentData.guardian_phone_number} onChange={handleChange}  {...(isEditable ? {} : { disabled: true })} />
                    </div>
                </div>
                
                <h4 class="form-categori-lable">Contact Infomation</h4><hr/>
                
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label for="address">Address</label>
                        <input type="text" class="form-control" id="address"  name="address" value={studentData.address} onChange={handleChange} required  {...(isEditable ? {} : { disabled: true })} />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email"  name="email" value={studentData.email} onChange={handleChange} required  {...(isEditable ? {} : { disabled: true })} />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="phone_number">Phone Number</label>
                        <input type="tel" class="form-control" id="phone_number" name="phone_number" value={studentData.phone_number} onChange={handleChange} required {...(isEditable ? {} : { disabled: true })} />
                    </div>                    
                </div>
                
           
            <h4 class="form-categori-lable">Education Details </h4><hr/>
                <div class="form-row">                   
                    <div class="form-group col-md-4">
                        <label for="last_qualification">Last Qualification</label>
                        <input type="text" class="form-control" id="last_qualification" name="last_qualification"
        value={studentData.last_qualification}
        onChange={handleChange}
        required {...(isEditable ? {} : { disabled: true })}/>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="board_university">Board/University</label>
                        <input type="text" class="form-control" id="board_university"  name="board_university"
        value={studentData.board_university}
        onChange={handleChange}
        required {...(isEditable ? {} : { disabled: true })}/>
                    </div>               
                    <div class="form-group col-md-4">
                        <label for="percentage">Percentage</label>
                        <input type="number" step="0.01" class="form-control" id="percentage" name="percentage"
        value={studentData.percentage}
        onChange={handleChange} {...(isEditable ? {} : { disabled: true })} />
                    </div>                   
                </div>
                <h4 class="form-categori-lable">Uploaded Documents</h4> <hr/>
                <div class="form-row " >
                   
                    <div class="form-group col-md-4 mx-auto d-block">
                        <label class=" fas fa-file-upload"></label>
                        <label for="upload_identity_document">Identity Document*</label>
                        <div class="card" style={{width:"150px", height: "200px",padding:'2px'}}>
                            <img style={{width:"146px", height: "120px"}} src={`${process.env.REACT_APP_HOST}/uploads/${studentData.upload_identity_document}`} class="card-img-top" alt="Image" />
                            <div style={{cursor:'pointer'}} class="card-body" onClick={()=>{downloadDocument(`${process.env.REACT_APP_HOST}/uploads/${studentData.upload_identity_document}`)}}>
                              <p class="card-text">click to view Image.</p>
                            </div>
                          </div>
                          {isEditable&& <div style={{color:'blue',cursor:'pointer'}} onClick={()=>setOpenUpdateIdentity(true)}><span className="fas fa-pencil-alt"></span>Edit</div>}   
                    </div>             
                   

                    <div class="form-group col-md-4">
                        <label class=" fas fa-file-upload"></label>
                        <label for="upload_last_qualification_marksheet">Qualification Marksheet*</label>
                        <div class="card" style={{width:"150px", height: "200px",padding:'2px'}}>
                            <img style={{width:"146px", height: "120px"}} src={`${process.env.REACT_APP_HOST}/uploads/${studentData.upload_last_qualification_marksheet}`} class="card-img-top" alt="Image" />

                            <div  style={{cursor:'pointer'}} class="card-body" onClick={()=>{downloadDocument(`${process.env.REACT_APP_HOST}/uploads/${studentData.upload_last_qualification_marksheet}`)}}>
                              <p class="card-text">click to view Image.</p>
                            </div>
                          </div>
                          {isEditable&& <div style={{color:'blue',cursor:'pointer'}} onClick={()=>setOpenUpdateQualification(true)}><span className="fas fa-pencil-alt"></span>Edit</div>}   
                    </div>
                   
                </div>
                <div class="form-row text-center" style={{marginTop:'30px'}}>
                    <div class="form-group col-md-12 ">
                     {isEditable?<><button type="submit" class="btn btn-lg btn-success">Save</button></>:
                     <><div onClick={()=>{setEditableFlag(true)}}  class="btn btn-lg btn-info">Edit</div></>}   
                        
                    </div>
                </div> 
            </form>
        </div>
    
    {openUpdatePhoto&&<UpdatePhoto id={studentData.student_id} closeModal={CloseUpdatePhoto} previousImg={`${process.env.REACT_APP_HOST}/uploads/${studentData.upload_photo}`}/>}
    {openUpdateIdentity&&<UpdateIdentityPhoto id={studentData.student_id} closeModal={CloseUpdateIdentity} previousImg={`${process.env.REACT_APP_HOST}/uploads/${studentData.upload_identity_document}`}/>}
    {openUpdateQualification&&<UpdateQualificationPhoto id={studentData.student_id} closeModal={CloseUpdateQualification} previousImg={`${process.env.REACT_APP_HOST}/uploads/${studentData.upload_last_qualification_marksheet}`}/>}
 
    </div>
  )
}

export default StudentInfo