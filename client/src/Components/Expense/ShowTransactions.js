import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ShowTransactions() {
  const [expenses, setExpenses] = useState([]);
  const [lastId,setLastId]=useState(0)
  let currentDate = new Date().toJSON().slice(0, 10);
  const endDatedateCopy = new Date(currentDate);
  endDatedateCopy.setFullYear(endDatedateCopy.getFullYear() - 1);

  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(endDatedateCopy.toJSON().slice(0, 10));


  const fetchExpenses = () => {
    console.log(endDate)
    axios
      .get(`${process.env.REACT_APP_HOST}/expenses`, {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      })
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
      });
  };



  useEffect(() => {

    axios
    .get(`${process.env.REACT_APP_HOST}/expenses/last-id`)
    .then((response) => {
      setLastId(response.data.lastId);
    })
    .catch((error) => {
      console.error('Error fetching last inserted ID:', error);
    });

    fetchExpenses();

  }, []);


  const handleStartDateChange = (event) => {
    const selectedDate = event.target.value;
    setStartDate(selectedDate);
  };

  const handleEndDateChange = (event) => {
    const selectedDate = event.target.value;
    setEndDate(selectedDate);
  };


  return (
    <div className="ShowTransactions">
 <h1  style={{textAlign:'center', color:'blueviolet'}}>Account</h1>
<div className="form-row" style={{justifyContent:'center',columnGap:'10px', alignItems:'center' }}>



    <div className="form-group col-md-2" >
        <label for="totalcourseFee" style={{marginLeft:'3px'}}> Date Between</label>
        <input type="date" className="form-control" value={startDate} onChange={handleStartDateChange} />
    </div>
    <div className="form-group col-md-2">
        <label for="totalcourseFee" style={{marginLeft:'3px'}}>To*</label>
        <input type="date" className="form-control" value={endDate} onChange={handleEndDateChange} />
        </div>
    <div className="form-group col-md-2" style={{marginTop:'25px'}}>
    <button type="Delete" className="btn btn-lg btn-danger form-control" onClick={fetchExpenses} >Filter</button>
  </div>
</div>
     
    
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Description</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.id}</td>
              <td>{expense.date}</td>
              <td>{expense.description}</td>
              <td>{expense.credit}</td>
              <td>{expense.debit}</td>
              <td>{expense.balance }</td>
            </tr>
          ))}
            <tr>
            <td colSpan="5"></td>
              <td>   
               <Link to={`/Account/${lastId}`}>
               <span className="fas fa-pencil-alt"></span> Edit
              </Link>
           </td>
           
            </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ShowTransactions;
