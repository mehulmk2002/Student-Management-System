import React from 'react'
import { Link } from 'react-router-dom'

import backbanner from './backbanner.jpg'
import './style.css'
const PageBanner = ({rout}) => {
  return (
    <div>
         <section id="page-banner" className="pt-105 pb-110 bg_cover" style={{ backgroundImage: `url(${backbanner})`}} data-overlay="8" >
          <div className="countainer-sec">
            <div className="row">
              <div className="col-lg-12">
                <div className="page-banner-cont">
                  <h2>{rout}</h2>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                      <li className="breadcrumb-item active">{rout}</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
    
    </div>
  )
}

export default PageBanner
