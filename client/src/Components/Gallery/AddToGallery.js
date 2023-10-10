// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddToGallery() {
  const [formData, setFormData] = useState({ image_url: '', description: '' });

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Send a POST request to insert data using Axios
    axios.post(`${process.env.REACT_APP_HOST}/gallery`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        console.log("INSERTED DATA")
      })
      .catch((error) => console.error('Error inserting data: ' + error));
  };

  return (
    
    <div style={{margin:'20px     auto'}}>
    <div className='form-container'>
      <h5  style={{textAlign:'center',fontWeight:'700', color:'blueviolet'}}>Add To Gallery</h5>
      <form onSubmit={handleSubmit}>
        <label>Image URL:</label>
          <input className="form-control" 
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleInputChange}
          />
        
        <label>Description: </label>
          <input className="form-control" 
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
       
       <div className="form-row text-center" style={{marginTop:'30px'}}>
                <div className="form-group col-md-12 ">
                    <button type="submit" className="btn btn-lg btn-success">Submit</button>
                    
                </div>
            </div>

      </form>
      
    </div> 
    </div>
  );
}

export default AddToGallery;
