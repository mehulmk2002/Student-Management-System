

import React, { useEffect, useState } from 'react';
import '../Form.css';
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Update_Inquiry = () => {
  
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    form_no: 0,
    full_name: 'mk',
    gender: '',
    course_name: '',
    address: '',
    phone_number: '',
    inquiry_date: '',
    expected_joining_date: '',
    inquiry_status: '',
    remark_note:'',
    education:''
  });

const {id}=useParams()


const loadData = async () => {
  const getdata = await axios.get(
    `${process.env.REACT_APP_HOST}/inquiry/api/${id}`
  );
  setFormData({...getdata.data[0]});
  console.log("----------")
  console.log(getdata.data);
};
useEffect(() => {
  loadData();
}, [id]);


const [courseData, setcourseData] = useState([]);
 //get course data from server
 const loadCourseData = async () => {
  const getdata = await axios.get(
    `${process.env.REACT_APP_HOST}/api/read_courses`
  );
  setcourseData(getdata.data);
  console.log('getdata.data')
  console.log(getdata.data)
};
useEffect(() => {
  loadCourseData();
}, []);


  const [formErrors, setFormErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };
 

  const handleSubmit = (e) => {

    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Perform form submission here

      //destructured
    const {
      full_name,
      gender,
      course_name,
      address,
      phone_number,
      inquiry_date,
      expected_joining_date,
      inquiry_status,
      remark_note,
      education
    } = formData;




    confirmAlert({
      title: 'Confirm to Update',
      message: 'Are you sure to do this.',
      buttons: [{

          label: 'Yes',
          onClick: () => {
            axios.post(`${process.env.REACT_APP_HOST}/inquiry/update/${id}`,{
              full_name,
              gender,
              course_name,
              address,
              phone_number,
              inquiry_date,
              expected_joining_date,
              inquiry_status,
              remark_note,
              education
            })
            navigate(-1)
        }},
        {
          label: 'No',
          onClick: () => {}
        }]
    });

      console.log(formData);
    } else {
        console.log(formData);
     setFormErrors(errors);
    console.log("hello INNQUIRYY")

    }
  };

  const validateForm = () => {
    const errors = {};
    if (formData.full_name.trim() === '') {
      errors.full_name = 'Full Name is required';
    }
    if (formData.gender.trim() === '') {
      errors.gender = 'Gender is required';
    }
    if (formData.course_name.trim() === '') {
      errors.course_name = 'Course ID is required';
    }
    if (formData.address.trim() === '') {
      errors.address = 'Address is required';
    }
    if (formData.phone_number.trim() === '') {
      errors.phone_number = 'Phone Number is required';
    }
    if (formData.inquiry_date.trim() === '') {
      errors.inquiry_date = 'Inquiry Date is required';
    }
    if (formData.expected_joining_date.trim() === '') {
      errors.expected_joining_date = 'Expected Joining Date is required';
    }
    if (formData.inquiry_status.trim() === '') {
      errors.inquiry_status = 'Inquiry Status is required';
    }
    return errors;
  };

  return (
    <div>
    <div>
        <div className="container mt-5">
            <h1  style={{ textAlign: 'center', color: 'blueviolet' }}>* Admission Inquiry * </h1>
            
            <form onSubmit={handleSubmit} style={{ marginTop: '50px' }}>
                <h4 className="form-categori-lable">Inquiry Details</h4><hr/>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label for="inquiry_number">Inquiry Number*</label>
                        <input type="number" className="form-control" id="inquiry_number" name="inquiry_number" value={formData.form_no} disabled />
                    </div>
                    <div className="form-group col-md-4">
                        <label for="select_date">Select Date*</label>
                        <input type="date" className="form-control" id="inquiry_date" name="inquiry_date" value={formData.inquiry_date} onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-4">
                        <label for="inquiry">Inquiry Status*</label>
                        <select className="form-control" id="inquiry_status" name="inquiry_status" value={formData.inquiry_status} onChange={handleChange} required >
                            <option value="Pending" selected >Pending</option>
                            <option value="Confirm">Confirm</option>     
                        </select>
                    </div>                
                </div>                 
                <h4 className="form-categori-lable"  >Personal & Contact Information</h4><hr/>


                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label for="first_name">Full Name*</label>
                        <input type="text" className="form-control" id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required />
                    </div>
                    <div className="form-group col-md-4">
                        <label for="gender">Gender*</label>
                        <select className="form-control" id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                           <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="address">Address*</label>
                        <input type="text" className="form-control" id="address" name="address"  value={formData.address} onChange={handleChange} required />
                    </div>
                    <div className="form-group col-md-4">
                        <label for="education">Education</label>
                        <input type="text" className="form-control" id="education" name="education" value={formData.education} onChange={handleChange} required />
                    </div>
                    <div className="form-group col-md-4">
                        <label for="phone_number">Phone Number*</label>
                        <input type="tel" className="form-control" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
                    </div>  
                </div>
                <h4 className="form-categori-lable">Course & Joining Details</h4><hr/>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label for="Course">Select Course*</label>
                        <select className="form-control" id="select_course"  name="course_name" value={formData.course_name} onChange={handleChange} required >
                            <option value="">Select</option>
                            {courseData.map((row,index)=>(
                                    <option value={row.course_name}>{row.course_name}</option>
                                ))}
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="Joining_date">Joining Date*</label>
                        <input type="date" className="form-control" id="joining_date"  name="expected_joining_date"
        value={formData.expected_joining_date}
        onChange={handleChange}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="inquiry_note">Remark / Note</label>
                        <input type="text" className="form-control" id="remark_note" name="remark_note"   value={formData.remark_note} onChange={handleChange}/>
                    </div>
                </div>        
                
                <div className="form-row text-center" style={{ marginTop: '30px' }}>
                    <div className="form-group col-md-12 ">
                        <button type="submit" className="btn btn-lg btn-success">SAVE</button>
                       
                    </div>
                </div>
            </form>
        </div>

        </div> </div>
);
};

export default Update_Inquiry;
