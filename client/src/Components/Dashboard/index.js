import React, { useEffect, useState } from "react";
import { BiMoney } from "react-icons/bi";
import {MdOutlinePendingActions} from "react-icons/md";
import { BsGraphUpArrow,BsJournalBookmarkFill,BsSkipForwardFill,BsFillPeopleFill } from "react-icons/bs";
import axios from "axios"; // Make sure to install axios: npm install axios
import './style.css'
const Index = () => {
  const [studentCount, setStudentCount] = useState(null);
  const [pendingCount, setPendingCount] = useState(null);
  const [leftCourseData, setLeftCourseData] = useState(null);
  const [learningCount, setLearningCount] = useState(null);
  const [batchStudentCounts, setBatchStudentCounts] = useState([]);
  const [batchWiseStudentCounts, setBatchWiseStudentCounts] = useState([]);
  const [toatalStudent,setToatalStudent]=useState({"1":"0"});

  const TotalNumberOfNewStudent = async () => {
    try {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const response = await axios.get(`${process.env.REACT_APP_HOST}/dashboard/newStudent/${currentYear}-${currentMonth}`);
      setStudentCount(response.data[0].student_count);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchPendingCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}/dashboard/pendingStudentCount`
      );
      setPendingCount(response.data.pending_student_count);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const fetchLeftCourseData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}/dashboard/leftStudentsCount`
      );
      setLeftCourseData(response.data.left_students_count);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchLearningCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}/dashboard/learningStudentCount`
      );
      setLearningCount(response.data.learning_student_count);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchBatchStudentCounts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}/dashboard/batchStudentCounts`
      );
      setBatchStudentCounts(response.data);
      const groupedData = response.data.reduce((accumulator, current) => {
        const existingBatch = accumulator.find(item => item.batch_no === current.batch_no);
        if (existingBatch) {
          existingBatch.student_count += current.student_count;
        } else {
          accumulator.push({ ...current });
        }
        return accumulator;
      }, []);
      setBatchWiseStudentCounts(groupedData)
      console.log(groupedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };
    
  useEffect(() => {
    TotalNumberOfNewStudent();
    fetchPendingCount();
    fetchLeftCourseData();
    fetchLearningCount();
    fetchBatchStudentCounts();
  }, []);


  const [paymentStats, setPaymentStats] = useState({ payment_count: 0, total_amount: 0 });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_HOST}/dashboard/paymentStats`)
      .then((response) => setPaymentStats(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
    <div className="dashboard-count-board">



      <div className="count-board-container orange-left-border">
      <div className="count-board-inner-left-container">
        <div className="count-board">New Student</div>
        <div className="count-board-value">{studentCount}</div>
        <div className="count-board-desc">New Students in Current Month</div>
      </div>

      <div className="dashboard-icon-box yellow-bg-color">
      <BsFillPeopleFill/>
      </div>
      </div>

      <div className="count-board-container brownblue-left-border">
       <div className="count-board-inner-left-container" >
        <div className="count-board">Pending students</div>
         <div className="count-board-value">{pendingCount}</div>
        <div className="count-board-desc">Number of Students Pending for Confirmation</div>
       
        </div>

        <div className="dashboard-icon-box lightpink-bg-color">
           <MdOutlinePendingActions/>
          </div>
      </div>

      <div className="count-board-container green-left-border">
        <div className="count-board-inner-left-container">
          <div className="count-board">Learning students</div>
          <div className="count-board-value">{learningCount}</div>
          <div className="count-board-desc">Number of Students Learning</div>
        </div>

        <div className="dashboard-icon-box green-bg-color">
           <BsJournalBookmarkFill/>
          </div>
      </div>

      <div className="count-board-container blueviolet-left-border">
        <div className="count-board-inner-left-container">
          <div className="count-board">Left Course</div>
          <div className="count-board-value">{leftCourseData}</div>
          <div className="count-board-desc">Number of students that Left the Course</div>
        </div>

        <div className="dashboard-icon-box blueviolet-bg-color">
          <BsSkipForwardFill/>
          </div>

      </div>


      
   

      <div className="count-board-container skyblue-left-border">
          <div className="count-board-inner-left-container">
            <div className="count-board">Total Payments</div>
            <div className="count-board-value">{paymentStats.payment_count}</div>
            <div className="count-board-desc">Number of Students Paid the fees  </div>
          </div>

          <div className="dashboard-icon-box skyblue-bg-color">
           <BsGraphUpArrow/>
          </div>

      </div>

      <div className="count-board-container pink-left-border">
      <div className="count-board-inner-left-container">
        <div className="count-board">Amount Collected</div>
        <div className="count-board-value">₹ {paymentStats.total_amount}</div>
        <div className="count-board-desc">Total Fees collected in Today</div>
      </div>

      <div className="dashboard-icon-box pink-bg-color">
      <BiMoney/>
      </div>

    </div>

    </div>

      <div className="dashboard-table-box ">
      <div>
      <div style={{textAlign:'center'}}>Batch-wise and Course-wise Student Counts</div><br/>
      <table className="table-size">
        <thead>
          <tr>
            <th>Batch No</th>
            <th>Course Name</th>
            <th>Number of Student</th>
          </tr>
        </thead>
        <tbody>
          {batchStudentCounts.map((item, index) => (
            <tr key={index}>
              <td >{item.batch_no} </td>
              <td>{item.course_name}</td>
              <td>{item.student_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

<div>
    <div style={{textAlign:'center'}}>Batch-wise Student Counts</div><br/>
      <table className="table-size">
        <thead>
          <tr>
            <th>Batch No</th>
            <th>Number of Student</th>
            <th>Remain Seats</th>
          </tr>
        </thead>
        <tbody>
          {batchWiseStudentCounts.map((item, index) => (
            <tr key={index}>
              <td>{item.batch_no} </td>
              <td>{item.student_count}</td>
              <td>{35-parseInt(item.student_count)}</td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
    </div>
    <br/>
    <br/>
    </div>
  );
};

export default Index;
