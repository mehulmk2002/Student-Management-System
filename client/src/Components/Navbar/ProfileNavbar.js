import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './ProfileNavbar.css'

const ProfileNavbar = (prop) => {
    const changeFlag=()=>{
        prop.flag(false)
    }
return (
	<>
	<nav className='profile-navbar'>
    <div className='profile-nav-tab-box'>
            <div className='NavLink-box'onClick={()=>(prop.flag(true))} >
                <NavLink style={{ textDecoration: 'none' }} to={`studentInfo/${prop.id}`}>
                   <div className='profile-nav-tab'>Profile</div>
                </NavLink>
            </div>

            <div className='NavLink-box' onClick={()=>{changeFlag()}}>
                <NavLink style={{ textDecoration: 'none' }} to={`entrollment/${prop.id}`}>
                    <div className='profile-nav-tab'>Enrollment</div>
                </NavLink>
            </div>
            <div className='NavLink-box' onClick={()=>{changeFlag()}}>
                <NavLink style={{ textDecoration: 'none' }} to={`transaction/${prop.id}`}>
                    <div className='profile-nav-tab'>Transaction</div>
                </NavLink>
            </div>   


              <div className='NavLink-box' onClick={()=>{changeFlag()}}>
                <NavLink style={{ textDecoration: 'none' }} to={`certificates/${prop.id}`}>
                    <div className='profile-nav-tab'>Certificates</div>
                </NavLink>
            </div>      

            <div className='NavLink-box' onClick={()=>{changeFlag()}}>
                <NavLink style={{ textDecoration: 'none' }} to={`certificates_dist/${prop.id}`}>
                    <div className='profile-nav-tab'>Certificates Distribution</div>
                </NavLink>
            </div>  


    </div>
    <div className='profile-detail-box'>
        <img style={{width:'35px',height:'35px',borderRadius:'50%'}} src={prop.img_src} />
    </div>
    </nav>
	</>
);
};

export default ProfileNavbar;
