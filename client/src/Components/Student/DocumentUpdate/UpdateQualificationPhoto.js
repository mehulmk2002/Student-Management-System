import axios from 'axios';
import React, { useState } from 'react';
import './style.css';
import { ToastContainer, toast } from "react-toastify";

const UpdateQualificationPhoto = (props) => {
    const studentId = props.id;
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(props.previousImg);
  
    const handlePhotoUpload = async () => {
      if (!selectedFile) {
        console.error('No file selected');
  
        toast.error("No file selected", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        });
        return;
      }
  
  
      const formData = new FormData();
      formData.append('upload_last_qualification_marksheet', selectedFile);
  
      try {
        const response = await axios.put(`http://localhost:4000/registration/student/${studentId}/updateMarksheet`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log(response.data.message);
      } catch (error) {
        console.error('Error updating marksheet:', error);
      }

    };


    
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
  
      // Display the selected image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    };
  
    return (
      <div>
        <div className='form-modal-wrapper' onClick={props.closeModal}></div>
        <div className='update-photo-modal-container'>
        {imagePreviewUrl && (
            <div className="image-preview">
              <img src={imagePreviewUrl} alt="Uploaded" />
            </div>
          )}
          <div >
            <label htmlFor="upload_identity_document" style={{color:'#fff',cursor:'pointer'}} className="custom-file-upload">
              <span className="fas fa-upload"></span> Update-Photo*
            </label>
              <input
              type="file"
              className="form-control-file"
              id="upload_identity_document"
              name="upload_identity_document"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              />
          </div>
        
          <button className="upload-photo-btn" onClick={handlePhotoUpload}>
            Update Photo
          </button>
        </div>
        <ToastContainer />
      </div>
    );
}

export default UpdateQualificationPhoto