import React, { useEffect, useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import PageBanner from '../PageBanner'
import axios from 'axios'
const Gallery = () => {
  const [galleryData,setGalleryData]=useState([
    {
        "image_url": "https://example.com/image1.jpg",
        "description": "Description for Image 1",
        "uploaded_at": "2023-10-07 12:00:00"
    },
    {
        "image_url": "https://example.com/image2.jpg",
        "description": "Description for Image 2",
        "uploaded_at": "2023-10-07 12:15:00"
    },
    {
        "image_url": "https://example.com/image3.jpg",
        "description": "Description for Image 3",
        "uploaded_at": "2023-10-07 12:30:00"
    },
    {
        "image_url": "https://example.com/image4.jpg",
        "description": "Description for Image 4",
        "uploaded_at": "2023-10-07 12:45:00"
    },
    {
        "image_url": "https://example.com/image5.jpg",
        "description": "Description for Image 5",
        "uploaded_at": "2023-10-07 13:00:00"
    },
    {
        "image_url": "https://example.com/image6.jpg",
        "description": "Description for Image 6",
        "uploaded_at": "2023-10-07 13:15:00"
    },
    {
        "image_url": "https://example.com/image7.jpg",
        "description": "Description for Image 7",
        "uploaded_at": "2023-10-07 13:30:00"
    },
    {
        "image_url": "https://example.com/image8.jpg",
        "description": "Description for Image 8",
        "uploaded_at": "2023-10-07 13:45:00"
    },
    {
        "image_url": "https://example.com/image9.jpg",
        "description": "Description for Image 9",
        "uploaded_at": "2023-10-07 14:00:00"
    },
    {
        "image_url": "https://example.com/image10.jpg",
        "description": "Description for Image 10",
        "uploaded_at": "2023-10-07 14:15:00"
    }
]
)

useEffect(()=>{
  console.log("Gallery")
  axios.get(`${process.env.REACT_APP_HOST}/gallery`).then((response)=>{
    setGalleryData(response.data)
  }).catch((error)=>{
    console.log(error)
  })
},[]);


  return (
    <div>
      <PageBanner rout="Gallery" />

        <div className='gallery-container'>
        {
          galleryData.map((imgs)=>(
            <>
            <div class="gallery-card"  style={{backgroundColor:'#333',color:'#fff'}}>
                <img class="card-img-top" style={{height:"200px",width:'200px'}} src={imgs.image_url} alt="Card image cap" />
                <div  >
                  <p class="card-text" style={{padding:'0 8px'}}>{imgs.description}</p>
                </div>
            </div>
            </>
          ))
        }

        </div>

    </div>
  )
}

export default Gallery