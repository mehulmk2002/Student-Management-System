import React, { useState } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router';

const Registration_Form = () => {
  const navigate=useNavigate()
  const [studentData, setStudentData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    Date_Of_Birth: '',
    gender: '',
    address: '',
    email: '',
    phone_number: '',
    guardian_name: '',
    guardian_phone_number: '',
    last_qualification: '',
    board_university: '',
    percentage: '',
    upload_identity_document: null,
    upload_photo: null,
    upload_last_qualification_marksheet: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = (event) => {
    const { name, files } = event.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (const key in studentData) {
      if (studentData.hasOwnProperty(key)) {
        formData.append(key, studentData[key]);
      }
    }

    // Display confirmation alert before submitting
    confirmAlert({
      title: 'Confirm Submission',
      message: 'Are you sure you want to submit the form?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.post(`${process.env.REACT_APP_HOST}/api/upload`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }).then( window.location.reload());
              console.log('Files uploaded successfully!');
            } catch (error) {
              console.log(error);
            }
           
          },
        },
        {
          label: 'No',
          // No action needed for 'No' button
        },
      ],
    });
  };

  return (
    <div>
    <div className="container mt-5">
        <h1  style={{textAlign:'center', color:'blueviolet'}}>Student Registration</h1>
        <form style={{marginTop:'50px'}} onSubmit={handleSubmit}>
            <h4 className="form-categori-lable"  >Personal Information</h4><hr/>
            <div className="form-row">
                <div className="form-group col-md-4">
                    <label for="first_name">First Name</label>
                    <input type="text" className="form-control" id="first_name" name="first_name" value={studentData.first_name} onChange={handleChange} required />
                </div>
                <div className="form-group col-md-4">
                    <label for="middle_name">Middle Name</label>
                    <input type="text" className="form-control" id="middle_name" name="middle_name" value={studentData.middle_name} onChange={handleChange} required />
                </div>
                <div className="form-group col-md-4">
                    <label for="last_name">Last Name</label>
                    <input type="text" className="form-control" id="last_name"  name="last_name" value={studentData.last_name} onChange={handleChange} required />
                </div>
                <div className="form-group col-md-4">
                    <label for="Date_Of_Birth">Date of Birth</label>
                    <input type="date" className="form-control" id="Date_Of_Birth"  name="Date_Of_Birth"
                    value={studentData.Date_Of_Birth}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-4">
                    <label for="gender">Gender</label>
                    <select className="form-control" id="gender"  name="gender" value={studentData.gender} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        </select>
                </div>
            </div>
            <h4 className="form-categori-lable">Guardian / Parents Information</h4><hr/>
            <div className="form-row">
                <div className="form-group col-md-4">
                    <label for="guardian_name">Guardian / Parents Name</label>
                    <input type="text" className="form-control" id="guardian_name" name="guardian_name"
                    value={studentData.guardian_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-md-4">
                    <label for="guardian_phone_number">Guardian /  Phone Number</label>
                    <input type="tel" className="form-control" id="guardian_phone_number"  name="guardian_phone_number"
                    value={studentData.guardian_phone_number}
                    onChange={handleChange}
                  />
                </div>
            </div>
            
            <h4 className="form-categori-lable">Contact Infomation</h4><hr/>
            
            <div className="form-row">
                <div className="form-group col-md-4">
                    <label for="address">Address</label>
                    <input type="text" className="form-control" id="address" name="address"
                    value={studentData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-4">
                    <label for="email">Email</label>
                    <input type="email" className="form-control" id="email"  name="email"
                    value={studentData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-4">
                    <label for="phone_number">Phone Number</label>
                    <input type="tel" className="form-control" id="phone_number"  name="phone_number"
                    value={studentData.phone_number}
                    onChange={handleChange}
                    required
                  />
                </div>                    
            </div>
            <h4 className="form-categori-lable">Education Details </h4><hr/>
            <div className="form-row">                   
                <div className="form-group col-md-4">
                    <label for="last_qualification">Last Qualification</label>
                    <input type="text" className="form-control" id="last_qualification" name="last_qualification"
                    value={studentData.last_qualification}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-4">
                    <label for="board_university">Board/University</label>
                    <input type="text" className="form-control" id="board_university"     name="board_university"
                    value={studentData.board_university}
                    onChange={handleChange}
                    required
                  />
                </div>               
                <div className="form-group col-md-4">
                    <label for="percentage">Percentage</label>
                    <input type="number" step="0.01" className="form-control" id="percentage" name="percentage"
                    value={studentData.percentage}
                    onChange={handleChange}
                  />
                </div>                   
            </div>
            <h4 className="form-categori-lable">Upload Documents</h4> <hr/>
            <div className="form-row " >
                <div className="form-group col-md-4 ">
                    <label className=" fas fa-upload"></label>
                    <label for="upload_photo">Upload Photo*</label>
                    <input type="file" className="form-control-file" id="upload_photo"  name='upload_photo'
                    onChange={handleFileUpload}
                    required
                  />
                </div>
                <div className="form-group col-md-4">
                    <label className=" fas fa-file-upload"></label>
                    <label for="upload_identity_document">Upload Identity Document*</label>
                    <input type="file" className="form-control-file" id="upload_identity_document"
                    name='upload_identity_document'
                    onChange={handleFileUpload}
                    required
                  />
                </div>                    
                <div className="form-group col-md-4">
                    <label className=" fas fa-file-upload"></label>
                    <label for="upload_last_qualification_marksheet">Upload Last Qualification Marksheet*</label>
                    <input type="file" className="form-control-file" id="upload_last_qualification_marksheet"
                    name='upload_last_qualification_marksheet'
                    onChange={handleFileUpload}
                    required
                  />
                </div>
               
            </div>
            <div className="form-row text-center" style={{marginTop:'30px'}}>
                <div className="form-group col-md-12 ">
                    <button type="submit" className="btn btn-lg btn-success" style={{marginRight:'10px'}}>SAVE</button>
                    <button type="reset" className="btn btn-lg btn-info">RESET</button>
                </div>
            </div>
        </form>
    </div></div>
  );
};

export default Registration_Form;
