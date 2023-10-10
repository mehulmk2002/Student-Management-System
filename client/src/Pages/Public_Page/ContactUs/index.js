import React from 'react'
import './style.css'
import PageBanner from '../PageBanner'
const ContactUs = () => {
  return (
    <div>
    <PageBanner rout="Contact Us"/>
    <div className='contactUs-box'>
    <div className="container mt-5">
    <h2>Contact Us</h2>
    <p>
      Thank you for visiting our website. If you have any questions or feedback, please feel
      free to contact us using the information below:
    </p>
    <div className="row">
      <div className="col-md-6">
        <h4>Contact Information</h4>
        <p>Email: contact@example.com</p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 123 Main Street, City, Country</p>
      </div>
      <div className="col-md-6">
        <h4>Business Hours</h4>
        <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
        <p>Saturday: 10:00 AM - 2:00 PM</p>
        <p>Sunday: Closed</p>
      </div>
    </div>
  </div>
  </div></div>
  )
}

export default ContactUs