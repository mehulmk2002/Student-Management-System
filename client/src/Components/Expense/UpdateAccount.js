import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateAccount = () => {
  const navigate=useNavigate();
  let currentDate = new Date().toJSON().slice(0, 10);
  const { id } = useParams(); // Get the account ID from the URL parameters
  const [formData, setFormData] = useState({
    date: currentDate,
    description: '',
    credit: 0,
    debit: 0,
    balance:0,
  });
  const [initialBalance,setBalance]=useState(0)

  useEffect(() => {
    console.log(id)
    // Fetch the account data by ID when the component mounts
    axios
      .get(`${process.env.REACT_APP_HOST}/expenses/${id}`)
      .then((response) => {
        const accountData = response.data;
        setFormData({
          date: accountData.date,
          description: accountData.description,
          credit: accountData.credit,
          debit: accountData.debit,
          balance:parseInt(accountData.balance)-parseInt(accountData.credit)+parseInt(accountData.debit),
        });
        setBalance(parseInt(accountData.balance)-parseInt(accountData.credit)+parseInt(accountData.debit))
      })
      .catch((error) => {
        console.error('Error fetching account data:', error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({ ...formData, balance: parseFloat(initialBalance)+parseFloat(formData.credit)-parseFloat(formData.debit) })
    console.log("HeLLO")
    axios
      .put(`${process.env.REACT_APP_HOST}/expenses/${id}`, formData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        console.log('Account updated:', response.data);
        setTimeout(() => {
          navigate(-1)
        }, 1000);
      })
      .catch((error) => {
        console.error('Error updating account:', error);
      });
  };

  return (
    <div style={{ margin: '20px auto' }}>
      <div  className='form-container'>
      <div  style={{textAlign:'center', color:'blueviolet'}}>Update Expense/Income</div>
        <form style={{ marginTop: '50px' }} onSubmit={handleSubmit}>
          <label>Date:</label>
          <input class="form-control" 
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <label>Description:</label>
          <input class="form-control" 
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <label>Credit:</label>
          <input class="form-control" 
            type="number"
            value={formData.credit}
            onChange={(e) => setFormData({ ...formData, credit: parseFloat(e.target.value) })}
          />
          <label>Debit:</label>
          <input class="form-control" 
            type="number"
            value={formData.debit}
            onChange={(e) => setFormData({ ...formData, debit: parseFloat(e.target.value) })}
          />

      <label> Balance:</label>
        <input class="form-control" 
          type="number"
          value={initialBalance+parseFloat(formData.credit)-parseFloat(formData.debit)}
          
        />

          <div className="form-row text-center" style={{ marginTop: '30px' }}>
            <div className="form-group col-md-12">
              <button type="submit" className="btn btn-lg btn-primary">
                Update Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAccount;
