import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { RiDeleteBin5Line } from "react-icons/ri";

function ShowGallery() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ image_url: '', description: '' });

const fetchData=()=>{
    axios.get(`${process.env.REACT_APP_HOST}/gallery`)
    .then((response) => setData(response.data))
    .catch((error) => console.error('Error fetching data: ' + error));
}

  useEffect(() => {
    // Fetch data from the API using Axios
    fetchData();
  }, []);




  const handleDelete = (id) => {
    // Send a DELETE request to remove data using Axios
    axios.delete(`${process.env.REACT_APP_HOST}/gallery/${id}`)
      .then(() => {
        fetchData()
      })
      .catch((error) => console.error('Error deleting data: ' + error));
  };

  return (
    <div className="App">
      <h1 style={{textAlign:'center'}}>Gallery</h1>
      
      <div className="gallery">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image_url} alt={item.description} />
                </td>
                <td>{item.description}</td>
                <tdpx>
                  <div style={{color:'red',fontSize:'24px'}} onClick={() => handleDelete(item.id)}><RiDeleteBin5Line/></div>
                </tdpx>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShowGallery;
