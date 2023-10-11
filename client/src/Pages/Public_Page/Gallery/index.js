import React, { useEffect, useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import PageBanner from '../PageBanner'
import axios from 'axios'
const Gallery = () => {
  const [galleryData,setGalleryData]=useState([]
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
            <div className="gallery-card"  style={{backgroundColor:'#333',color:'#fff'}}>
                <img className="card-img-top" style={{height:"200px",width:'200px'}} src={imgs.image_url} alt="Card image cap" />
                <div  >
                  <p className="card-text" style={{padding:'0 8px'}}>{imgs.description}</p>
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
