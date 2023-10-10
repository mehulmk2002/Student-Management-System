import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

const EditAttendance = () => {
  const {attendanceId} = useParams();

  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    student_id: '',
    enrollment_id: '',
    date: '',
    in_time: '',
    out_time: '',
    attendanceVal: 'P',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the attendance data by attendanceId from your Node.js API
    axios.get(`${process.env.REACT_APP_HOST}/attendance/${attendanceId}`)
      .then((response) => {
        const { student_id, enrollment_id, date, in_time, out_time, attendanceVal } = response.data;
        setFormData({ student_id, enrollment_id, date, in_time, out_time, attendanceVal });
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch attendance data');
        setLoading(false);
      });
  }, [attendanceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update the attendance data
      await axios.put(`${process.env.REACT_APP_HOST}/attendance/${attendanceId}`, formData);
      navigate(-1)
      // Handle success, maybe show a success message or redirect to another page
    } catch (error) {
      setError('Failed to update attendance data');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <div className='form-container'>
      <h2>Edit Attendance</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student ID:</label>
          <input type="text" name="student_id" value={formData.student_id} onChange={handleChange} />
        </div>
        <div>
          <label>Enrollment ID:</label>
          <input type="text" name="enrollment_id" value={formData.enrollment_id} onChange={handleChange} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </div>
        <div>
          <label>In Time:</label>
          <input type="time" name="in_time" value={formData.in_time} onChange={handleChange} />
        </div>
        <div>
          <label>Out Time:</label>
          <input type="time" name="out_time" value={formData.out_time} onChange={handleChange} />
        </div>
        <div>
          <label>Attendance Value:</label>
          <input type="text" name="attendanceVal" value={formData.attendanceVal} onChange={handleChange} />
        </div>
        <div className="form-row text-center" style={{marginTop:'15px',marginBottom:'0'}}>
                <div className="col-md-12 ">
                  <button className="btn btn-lg btn-success" type="submit">Update Attendance</button>
        </div></div>
      </form>
    </div>   </div>
  );
};

export default EditAttendance;
