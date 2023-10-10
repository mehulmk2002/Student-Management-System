import React from 'react'
import { Link } from 'react-router-dom'

import backbanner from './backbanner.jpg'
import './style.css'
const PageBanner = ({rout}) => {
  return (
    <div>
         <section id="page-banner" class="pt-105 pb-110 bg_cover" style={{ backgroundImage: `url(${backbanner})`}} data-overlay="8" >
          <div class="countainer-sec">
            <div class="row">
              <div class="col-lg-12">
                <div class="page-banner-cont">
                  <h2>{rout}</h2>
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                      <li class="breadcrumb-item active">{rout}</li>
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