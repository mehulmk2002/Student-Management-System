import React, { useEffect, useState } from 'react'
import './style.css'
import { AiOutlineMenu } from "react-icons/ai";
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
const TopNavbar = () => {

  const [navbarflag,setNavbarFlag]=useState(false)

  let [innerWidth, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);

  return (
    <> {
      innerWidth<770 ?<>  <nav>
      <div className='mobileview-navbar'>
        <div  className='sub-mobileview-navbar' onClick={()=>{setNavbarFlag(!navbarflag)}}> <AiOutlineMenu/></div>
        {navbarflag?
        <div className='mobile-tab-section'>
               <CustomLink style={{ textDecoration: 'none' }} passClass="sub-tab-mobileview-navbar" to={'/'}> <div className='user-tab-text '>HOME</div></CustomLink>
               <CustomLink style={{ textDecoration: 'none' }} passClass="sub-tab-mobileview-navbar" to={'about-us'}>  <div className='user-tab-text '>About Us</div> </CustomLink>
               <CustomLink style={{ textDecoration: 'none' }} passClass="sub-tab-mobileview-navbar" to={'cources'}> <div className='user-tab-text '>Cources</div> </CustomLink>
               <CustomLink style={{ textDecoration: 'none' }} passClass="sub-tab-mobileview-navbar" to={'gallery'}> <div className='user-tab-text '>Gallery</div> </CustomLink>
               <CustomLink style={{ textDecoration: 'none' }} passClass="sub-tab-mobileview-navbar" to={'contact-us'}> <div className='user-tab-text '>CONTACT US</div> </CustomLink>
               
               <CustomLink style={{ textDecoration: 'none' }} passClass="sub-tab-mobileview-navbar" to={'AdminLogin'}> <div className='user-tab-text '>Log in</div> </CustomLink>
          </div>:<></>}
      </div>


      </nav>

        </>:
      <nav className="nav">
      <Link to="/" className="site-title">
    {true?<>MCTC</> :<>MEET COMPUTER TRAINING CENTER</>}  
      </Link>

      <ul>

            <div className='user-tab-section'>
               <CustomLink  style={{ textDecoration: 'none' }} passClass="" to={'/'}> <div className='user-tab-text'>HOME</div></CustomLink>
               <CustomLink style={{ textDecoration: 'none' }} passClass="" to={'about-us'}>  <div className='user-tab-text'>About Us</div> </CustomLink>
               <CustomLink style={{ textDecoration: 'none' }} passClass="" to={'cources'}> <div className='user-tab-text'>Cources</div> </CustomLink>
               <CustomLink style={{ textDecoration: 'none' }} passClass="" to={'gallery'}> <div className='user-tab-text'>Gallery</div> </CustomLink>
               <CustomLink style={{ textDecoration: 'none' }} passClass="" to={'contact-us'}> <div className='user-tab-text'>CONTACT US</div> </CustomLink>
               
               <CustomLink style={{ textDecoration: 'none' }} passClass="" to={'AdminLogin'}> <div className='user-tab-text'>Log in</div> </CustomLink>
            </div>
            </ul>
    </nav>
    }</>
       
  )
}


function CustomLink({ to,passClass, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? `active ${passClass}` : `${passClass}`}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}


export default TopNavbar