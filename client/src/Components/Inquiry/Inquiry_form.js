import React, { useEffect, useRef, useState } from 'react';
import '../Form.css';
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import Dialog from '../Dialog';

const InquiryForm = () => {
//navigation object
  const navigate=useNavigate()

  //get current date
  let currentDate = new Date().toJSON().slice(0, 10);

////==============================

 //You can put all product information into diaglog
 const [dialog, setDialog] = useState({
  message: "",
  isLoading: false,
  //Update
  nameProduct: ""
});
const idProductRef = useRef();
const handleDialog = (message, isLoading, nameProduct) => {
  setDialog({
    message,
    isLoading,
    //Update
    nameProduct
  });
};

const handleDelete = (id) => {
  //Update
  //const index = data.findIndex((p) => p.id === id);

  handleDialog("Are you sure you want to delete?", true, "M2K");
  idProductRef.current = id;
};

const areUSureDelete = (choose) => {
  if (choose) {
    //setProducts(products.filter((p) => p.id !== idProductRef.current));
    handleDialog("", false);
  } else {
    handleDialog("", false);
  }
};





  //state declare
  const [lastFormNo, setLastFormNo] = useState(null);
  const [courseData, setcourseData] = useState([]);
  const [errorMsg,setErrorMsg]=useState('')
  const [successMsg,setSuccessMsg]=useState('')
  const [formData, setFormData] = useState({
    full_name: '',
    gender: '',
    course_name: '',
    address: '',
    phone_number: '',
    inquiry_date: currentDate,
    expected_joining_date: '',
    inquiry_status: 'Pending',
    remark_note:'',
    education:'',
  });
//Reset Form
const resetForm=()=>{
  setFormData({
    full_name: '',
    gender: '',
    course_name: '',
    address: '',
    phone_number: '',
    inquiry_date: currentDate,
    expected_joining_date: '',
    inquiry_status: 'Pending',
    remark_note:'',
    education:'',
  })
}
  //get course data from server
  const loadData = async () => {
    const getdata = await axios.get(
      `${process.env.REACT_APP_HOST}/api/read_courses`
    );
    setcourseData(getdata.data);
    console.log('getdata.data')
    console.log(getdata.data)
  };
  useEffect(() => {
    loadData();
  }, []);


//it function will call when user will entered value in input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 

//when user will click add button then it will call
  const handleSubmit = (e) => {
    e.preventDefault();
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
if(phone_number.length==10){
  confirmAlert({
    title: 'Confirm to Inquiry',
    message: 'Are you sure to do this.',
    buttons: [{

        label: 'Yes',
        onClick: () => {
          axios.post(`${process.env.REACT_APP_HOST}/inquiry`,{
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
          }).then((response) => {
            setFormData({
              full_name: '',
              gender: '',
              course_name: '',
              address: '',
              phone_number: '',
              inquiry_date: currentDate,
              expected_joining_date: '',
              inquiry_status: 'Pending',
              remark_note:'',
              education:'',
            })
            setSuccessMsg("Inserted Data into inquiry");
          })
      }},
      {
        label: 'No',
        onClick: () => {}
      }]
  });

}
else{
  setErrorMsg("*Mobile number must be 10 digits")
}
    
  };

  useEffect(() => {
    // Make an HTTP GET request to the server endpoint
    axios.get(`${process.env.REACT_APP_HOST}/inquiry/get-last-form-no`)
      .then((response) => {
        setLastFormNo(response.data[0].last_form_no+1);
      })
      .catch((error) => {
        console.error('Error fetching last form_no:', error);
      });
  }, []);

  return (
    <div>
    <div>
        <div className="container mt-5">
            <h1  style={{ textAlign: 'center', color: 'blueviolet' }}>* Admission Inquiry * </h1>
            <div style={{color:'green'}}>{successMsg}</div>
            <form onSubmit={handleSubmit} style={{ marginTop: '50px' }}>
                <h4 className="form-categori-lable">Inquiry Details</h4><hr/>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label for="inquiry_number">Inquiry Number*</label>
                        <input type="number" className="form-control" id="inquiry_number" name="inquiry_number" value={lastFormNo} disabled />
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
              <span style={{color:'red'}}>{errorMsg}</span>

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
                    <div className="form-group col-md-12 " >
                        <button type="submit" className="btn btn-lg btn-success" style={{marginRight:'10px'}}>SAVE</button>
                        <button type="reset" onClick={resetForm} className="btn btn-lg btn-info">RESET</button>
                    </div>
                </div>
            </form>
        </div>

        </div> 
        
        {dialog.isLoading && (
        <Dialog
          //Update
          nameProduct={dialog.nameProduct}
          onDialog={areUSureDelete}
          message={dialog.message}
        />
      )}
        </div>
);
};

export default InquiryForm;
