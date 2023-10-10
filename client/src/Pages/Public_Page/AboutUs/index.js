import React from 'react'
import PageBanner from '../PageBanner'
import homeImg from './home-disc.png'
import './style.css'
const AboutUs = () => {
  return (
    <div>
    <PageBanner rout="About Us"/>
    
    <div className='home-info-container'>
            <div className='disc-container'>
            <div className='title-disc-container'>Meet computer training center</div>
                <div className='sub-div-disc'>
                    Driven by the philosophy that every individual is born to succeed, Welcome to Shiv Computer Institutes aims to develop Quality laptop Education. This comprehensive approach towards laptop Education has received associate degree awing response. to boot to transmission data, knife laptop Institute lays nice stress on leadership development, ethics and social responsibility. Our effort is to provide the students with a road-map to effective learning, In shell, most of the students feel that the Shiv’s experience is not only innovative but collectively distinctive.

                </div>
            </div>
            <div className='image-container'>
                <img src={homeImg} alt='mctc' />
            </div>
        </div>
        <br/><br/>
        <div className='aboutus-image-sec'>
            <div className='image-aboutus'> <img src='https://merientinfotech.com/wp-content/uploads/2019/12/basic-computer-training-banner-1200x900.jpg'/> </div>
            <div className='image-aboutus'> <img src='https://merientinfotech.com/wp-content/uploads/2019/12/basic-computer-training-banner-1200x900.jpg'/> </div>
            <div className='image-aboutus'> <img src='https://merientinfotech.com/wp-content/uploads/2019/12/basic-computer-training-banner-1200x900.jpg'/> </div>
            <div className='image-aboutus'> <img src='https://merientinfotech.com/wp-content/uploads/2019/12/basic-computer-training-banner-1200x900.jpg'/> </div>
        </div>
    
    </div>
  )
}

export default AboutUs