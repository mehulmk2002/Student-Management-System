import React, { useEffect, useState } from 'react'
import PageBanner from '../PageBanner'
import axios from 'axios'

const User_Courses = () => {
    const [cources,setCources]=useState([])
    useEffect(()=>{

        axios.get(`${process.env.REACT_APP_HOST}/ourCourses`).then((response)=>{
            setCources(response.data)
            console.log(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    },
    [])
  return (
    <div>
        <PageBanner rout="Courses"/>
        <br/>
    <div style={{display:'flex',columnGap:'40px',justifyContent:'center',rowGap:"30px",flexWrap:'wrap'}} >
{
    cources.map((data)=>(
        <div>
        <div className="card" style={{width: "18rem",padding:'10px'}}>
                <img className="card-img-top" src={data.image_url} alt="Card image cap" style={{height:'180px'}} />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">{data.course_description}</p>
                </div>
                
                <div className="card-footer" style={{display:'flex'}}>
                    <label className="card-link" style={{fontWeight:'400'}}>Duration {data.course_duration}</label>
                </div>
            <div className="card-footer" style={{display:'flex',alignItems:'center'}}>
                <label className="card-link">Price:<span style={{color:'red'}}>{data.course_price}/-</span></label>
                <label type="button" className="btn btn-info card-link" style={{fontWeight:'400'}}>Details</label>
            </div>

        </div>
        </div>
    ))
}
  
    </div>








    
    </div>
  )
}

export default User_Courses

{/* <div class="card-body">
<label>Price:   <span style={{color:'red'}}>6000/-</span></label>
<label>Another link</label>
</div> */}
