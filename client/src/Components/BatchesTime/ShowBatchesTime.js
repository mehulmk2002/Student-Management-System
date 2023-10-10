import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dialog from '../Dialog';
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

const ShowBatchesTime = () => {
    const [data, setData] = useState([]);
   
    useEffect(() => {
      // Fetch data from the server using axios
      loadData()
    }, []);
  
  const loadData=()=>{
      axios.get(`${process.env.REACT_APP_HOST}/timetable`) // Replace this with the endpoint for fetching data from the server
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }  

//Confirmation BOX
const idForDelete = useRef();
 const [dialog, setDialog] = useState({
  message: "",
  isLoading: false,
  nameProduct: ""
});

const handleDialog = (message, isLoading, nameProduct) => {
  setDialog({
    message,
    isLoading,
    nameProduct
  });
};

const handleDelete = (id) => {
  handleDialog("Are you sure you want to delete?", true, id);
  idForDelete.current = id;

};

const areUSureDelete = (choose) => {
  if (choose) {
    handleDialog("", false);
    axios.delete(`${process.env.REACT_APP_HOST}/timetable/${idForDelete.current}`);
    setTimeout(()=>loadData(),500) 

  } else {
    handleDialog("", false);
  }
};

    return (
      <div>
           <br/> 
           <div className='table-margin'>
        <table>
          <thead>
            <tr>
              <th>Batch Number</th>
              <th>Class Time</th>
              <th>Course ID</th>
              <th>Lab Teacher</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((batch) => (
              <tr key={batch.batch_no}>
                <td>{batch.batch_no}</td>
                <td>{batch.class_time}</td>
                <td>{batch.course}</td>
                <td>{batch.lab_teacher}</td>
                <td style={{ padding: "8px" ,display:'flex'}}>
                <Link style={{textDecoration:'none',margin:"0 5px"}} to={`/Update_TimeTable/${batch.batch_no}`}>
                <div className="inquieryEdit-btn"><BiSolidEdit/></div>
                </Link>
                <div className="inquieryDelete-btn" style={{color:'red'}}   onClick={()=>handleDelete(batch.batch_no)}><RiDeleteBin5Line/></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
        {dialog.isLoading && (
        <Dialog
          nameProduct={dialog.nameProduct}
          onDialog={areUSureDelete}
          message={dialog.message}
        />
      )}
      </div>
    );
}

export default ShowBatchesTime