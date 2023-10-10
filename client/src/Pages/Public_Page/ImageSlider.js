import React, { useState } from 'react'
import 'react-slideshow-image/dist/styles.css'
import {Fade,Zoom,Slide} from 'react-slideshow-image'
import './style.css';
import SimpleImageSlider from "react-simple-image-slider";
import {Carousel } from 'react-bootstrap'; 
const ImageSlider = () => {
    const [imageNum, setImageNum] = useState('Mehul KurkuteHome');
    const [img1,srtI]=useState('https://wallpapers.com/images/featured/beautiful-3vau5vtfa3qn7k8v.jpg')
    const slideImages=[
        {
            url:'https://wallpapers.com/images/featured/beautiful-3vau5vtfa3qn7k8v.jpg',
            caption:'Mehul Kurkute'
        },
        {
            url:'https://lh3.googleusercontent.com/p/AF1QipPYs79tWE3JLS39sOVfxn_5qO4Nj56_rwFcYg2r=w960-h960-n-o-v1',
            caption:'Mehul Kurkute'
        },
        {
            url:'https://lh3.googleusercontent.com/p/AF1QipPYs79tWE3JLS39sOVfxn_5qO4Nj56_rwFcYg2r=w960-h960-n-o-v1',
            caption:'Mehul Kurkute'
        },
    ]


return (  
    <>  
    <div className='p-5'>  
    <Carousel>  
  <Carousel.Item>  
  <img style={{height:"80vh"}}  
      className="d-block w-100"  
      src='https://lh3.googleusercontent.com/p/AF1QipO3Ojm2JxK4bpjYBYSQIJ8ik4ARJg5cLNYPgBa-=w1080-h608-p-no-v0'  
      alt="First slide"  
    />  
    <Carousel.Caption>  
      <h3>First Slider Image Title</h3>  
      <p>First Slide decription.</p>  
    </Carousel.Caption>  
  </Carousel.Item>  
  <Carousel.Item>  
    <img  style={{height:"80vh"}}  
      className="d-block w-100"  
      src='https://education21.in/wp-content/uploads/2023/07/The-wining-teams-of-five-day-Huron-Innovator-Academy-programme.jpg'  
      alt="Second slide"  
    />  
  
    <Carousel.Caption>  
      <h3>Second slide Image </h3>  
      <p>Second slide description</p>  
    </Carousel.Caption>  
  </Carousel.Item>  
  <Carousel.Item>  
    <img  style={{height:"80vh"}}  
      className="d-block w-100"  
      src='https://www.mckv.edu.in/site/assets/files/1033/computer_lab.jpg'
      alt="Third slide"  
    />  
  
    <Carousel.Caption>  
      <h3>Third Slide Image</h3>  
      <p>Third Slide Description.</p>  
    </Carousel.Caption>  
  </Carousel.Item>  
</Carousel>  
</div>  
    </>  
  );  
}

export default ImageSlider