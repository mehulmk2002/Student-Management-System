import axios from 'axios';
import React, { useState } from 'react'

const AddNewTransactions = () => {
    let currentDate=new Date().toJSON().slice(0, 10);
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState({
      student_id: '',
      enrollment_id: '',
      date: new Date().toISOString().slice(0, 10), // Set the default date to today
      in_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Set the default time to current time
      out_time: '',
    });

     
    const handleSubmit = event => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_HOST}/expenses`, formData, {
          headers: { 'Content-Type': 'application/json' }
        })
          .then(response => {
            console.log(response.data);
            setTransactions([...transactions, formData]);
            setFormData({ date: currentDate, description: '', credit: 0, debit: 0 });
          })
          .catch(error => {
            console.error('Error adding transaction:', error);
          });
      };
   
  return (
    <div style={{margin:'20px     auto'}}>
      <div className='form-container'>
        <h5  style={{textAlign:'center',fontWeight:'700', color:'blueviolet'}}>Add New Expense/Income</h5>
      <form style={{marginTop:'30px'}} onSubmit={handleSubmit}>
        <label>Date:</label>
        <input className="form-control" 
          type="date"
          value={formData.date}
          onChange={e => setFormData({ ...formData, date: e.target.value })}
        />
        <label>Description:</label>
        <input className="form-control"  
          type="text"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })} required
        />
        <label>Credit:</label>
        <input className="form-control"  
          type="number"
          value={formData.credit}
          onChange={e => setFormData({ ...formData, credit: parseFloat(e.target.value) })} required
        />
        <label>Debit:</label>
        <input className="form-control"  
          type="number"
          value={formData.debit}
          onChange={e => setFormData({ ...formData, debit: parseFloat(e.target.value) })} required
        />




      
        <div className="form-row text-center" style={{marginTop:'30px'}}>
                <div className="form-group col-md-12 ">
                    <button type="submit" className="btn btn-lg btn-success">Add Transaction</button>
                    
                </div>
            </div>

      </form>
    </div>
    </div>
  )
}

export default AddNewTransactions