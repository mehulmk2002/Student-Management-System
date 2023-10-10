import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, Route, Routes, useParams } from "react-router-dom";
import '../Pages.css';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import html2canvas from 'html2canvas'
import { ToastContainer, toast } from "react-toastify";
import jsPDF from 'jspdf';
import PaymentForm from "../Modal/PaymentForm";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiSolidDownload } from "react-icons/bi";


const Stud_Transaction = () => {
  const [loader, setLoader] = useState(false);
  const [paymentLoaders, setPaymentLoaders] = useState({});
  const downloadPDF = () =>{
    const capture = document.querySelector('.actual-receipt');
    setLoader(true);
    html2canvas(capture).then((canvas)=>{
      const imgData = canvas.toDataURL('img/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save('receipt.pdf');
    })
  }

  const { id } = useParams();

  const [reciept_detail, setReciept_detail] = useState({
    payment_id: 0,
    student_id: "",
    entrollment_id: "",
    course_id: "",
    payment_amount: "",
    payment_date: "",
    payment_mode: "",
  });
  const [Payment_data, setPayment_data] = useState([]);

  const handleDownload = (p_id,en_id) => {
    setPaymentLoaders((prevLoaders) => ({
      ...prevLoaders,
      [p_id]: true,
    }));
    axios.get(`${process.env.REACT_APP_HOST}/receipt-download/${p_id}`, { responseType: 'blob' })
    .then((response) => {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = en_id+'_PID_'+p_id+'_receipt.pdf'; // Set the filename for the download
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success("Download Successful", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      setPaymentLoaders((prevLoaders) => ({
        ...prevLoaders,
        [p_id]: false,
      }));
    })
    .catch((error) => {
      toast.error("Download Unsuccessful", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      console.error('Error downloading the PDF:', error);
    });
  };

  const loadTranData = async () => {
    const getdata = await axios.get(`${process.env.REACT_APP_HOST}/api/payment/${id}`);
    setPayment_data(getdata.data);
    console.log("----setPayment_data------");
    console.log(getdata.data);
  };

  useEffect(() => {
    loadTranData();
  }, [id]);

  const deleteStud_Enrollment = (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            console.log(id);
            axios.delete(`${process.env.REACT_APP_HOST}/del_payment/remove/${id}`);
            console.log("PPPPP===Delete: " + id);
            setTimeout(() => loadTranData(), 500);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };


  const [showModal,setShowModal]=useState(false)
  const closeModal=()=> setShowModal(false);
  return (
    <div>
    
    <div onClick={()=>setShowModal(true)} className="add-btn-box" style={{ color: "Red" }}><div className="add-btn">+ Payment</div></div>


    <div className='table-margin'>
      <table>
        <thead>
          <tr >
            <th>payment ID</th>
            <th>entrollment_id ID</th>
            <th>Student ID</th>
            <th>Course ID</th>
            <th>payment_amount No</th>
            <th>payment_mode </th>
            <th>Date</th>
            <th >Action</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {Payment_data.map((payment) => (
            <tr key={payment.payment_id}>
              <td>{payment.payment_id}</td>
              <td>{payment.entrollment_id}</td>
              <td>{payment.student_id}</td>
              <td>{payment.course_id}</td>
              <td>{payment.payment_amount}</td>
              <td>{payment.payment_mode}</td>
              <td>{payment.payment_date}</td>
              <td style={{display:'flex'}}>
                <Link to={`/Update_Payment/${payment.payment_id}`}><div className="inquieryEdit-btn"> <BiSolidEdit/></div></Link>
                <label className="inquieryDelete-btn"
                  onClick={() => {
                    deleteStud_Enrollment(payment.payment_id);
                  }}
                  style={{ margin: "0 5px",color:'red'}}
                >
                  <RiDeleteBin5Line/>
                </label>
                <label
                className="inquieryconfirm-btn"
                  onClick={() => {
                    handleDownload(payment.payment_id,payment.entrollment_id);
                  }}
                  id="print-button"
                >
                <BiSolidDownload/>
                </label>
              </td>
              {/* entrollment_id,student_id, course_id, payment_amount, payment_mode*/}
            </tr>
          ))}
        </tbody>
      </table></div>
      {showModal && <PaymentForm id={id} closeModal={closeModal} />}
<ToastContainer />
    </div>
  );
};

export default Stud_Transaction;
