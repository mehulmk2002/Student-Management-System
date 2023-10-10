import React from 'react'
import ImageSlider from '../ImageSlider'
import './style.css'
import homeImg from './home-disc.png'
const HomePage = () => {
  return (
    <div>

    <ImageSlider/> 

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
    </div>
   
  )
}

export default HomePage