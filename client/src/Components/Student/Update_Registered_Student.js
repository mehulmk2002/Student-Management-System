import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router';

const Update_Registered_Student = () => {
  const navigate=useNavigate()
        const {id}=useParams()
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
          percentage: ''
        });
      
        const handleChange = (event) => {
          const { name, value } = event.target;
          setStudentData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        };

        
          const handleSubmit = async (event) => {
            event.preventDefault();
        

            confirmAlert({
              title: 'Confirm to Update',
              message: 'Are you sure to do this.',
              buttons: [{
        
                  label: 'Yes',
                  onClick: () => {
                    console.log('studentData UPDATE');
                    // Perform your API call using Axios to send a POST request
                    axios.put(`${process.env.REACT_APP_HOST}/update/stud_details/${id}`, studentData)
                      .then((response) => {
                        console.log('Payment created:', response.data);
                        // Reset the form after successful submission
                        setStudentData({
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
                          percentage: ''
                        });
                      })
                      .catch((error) => {
                        console.error('Error creating payment:', error);
                        // Handle error scenarios
                      });
                      navigate(-1)
                }},
                {
                  label: 'No',
                  onClick: () => {}
                }]
            });


           
          };
        
          const loadData = async () => {
    
            const getdata = await axios.get(
              `${process.env.REACT_APP_HOST}/api/view_student_profile/${id}`
            );
            setStudentData({...getdata.data[0]});
            console.log("----------")
            console.log(getdata.data);
          };
          useEffect(() => {
            loadData();
          }, [id]);

  return (
    <div className='form-container'>
    <form onSubmit={handleSubmit}> 
    <br />
    <label>First Name:</label>
      <input type="text" name="first_name" value={studentData.first_name} onChange={handleChange} required />
    

    <br />
    <label>
      Middle Name:</label>
      <input
        type="text" name="middle_name" value={studentData.middle_name} onChange={handleChange} required />
  
    <br />
    <label>
      Last Name:</label>
      <input type="text" name="last_name" value={studentData.last_name} onChange={handleChange} required />
   
    <br />

    <label>
      Date of Birth:</label>
      <input
        type="date"
        name="Date_Of_Birth"
        value={studentData.Date_Of_Birth}
        onChange={handleChange}
        required
      />
   
    <br />
    <label>Gender:</label>
      <input
        type="text"
        name="gender"
        value={studentData.gender}
        onChange={handleChange}
        required
      />
    <br />
    <label>Address:  </label>
      <input
        type="text"
        name="address"
        value={studentData.address}
        onChange={handleChange}
        required
      />
  
    <br />
    <label>
      Email:  </label>
      <input
        type="email"
        name="email"
        value={studentData.email}
        onChange={handleChange}
        required
      />
  
    <br />
    <label>
      Phone Number:  </label>
      <input
        type="text"
        name="phone_number"
        value={studentData.phone_number}
        onChange={handleChange}
        required
      />
  
    <br />
    <label>
      Guardian Name:  </label>
      <input
        type="text"
        name="guardian_name"
        value={studentData.guardian_name}
        onChange={handleChange}
      />
  
    <br />
    <label>
      Guardian Phone Number:  </label>
      <input
        type="text"
        name="guardian_phone_number"
        value={studentData.guardian_phone_number}
        onChange={handleChange}
      />
  
    <br />
    <label>
Last Qualification:  </label>
      <input
        type="text"
        name="last_qualification"
        value={studentData.last_qualification}
        onChange={handleChange}
        required
      />
  
    <br />
    <label>
      Board/University:  </label>
      <input
        type="text"
        name="board_university"
        value={studentData.board_university}
        onChange={handleChange}
        required
      />
   
    <br />
    <label>Percentage:  </label>
      <input
        type="number"
        name="percentage"
        value={studentData.percentage}
        onChange={handleChange}
      />
   
    <br />
     
      <div class="form-row text-center" style={{marginTop:'30px'}}>
          <div class="form-group ">
                     <button type="submit" class="btn btn-lg btn-success">Save</button>  
                        
          </div>
      </div> 
    </form>
  </div> 
  )
}

export default Update_Registered_Student






//   const handleFileUpload = (event) => {
//     const { name, files } = event.target;
//     setStudentData((prevData) => ({
//       ...prevData,
//       [name]: files[0],
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     for (const key in studentData) {
//       if (studentData.hasOwnProperty(key)) {
//         formData.append(key, studentData[key]);
//       }
//     }

//     try {
//       await axios.post('${process.env.REACT_APP_HOST}/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('Files uploaded successfully!');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
   
//   );
// };

// export default Registration_Form
