import React from 'react'
import "./Summary.css"
import  { TiSocialFacebookCircular, TiSocialInstagram, TiSocialTwitterCircular }  from 'react-icons/ti';

const Footer = () => {
  return (
    <div className='container-footer'>
        <div className='container-card'>
            <div className='card'>
                <h5>MEMBERSHIP</h5>
                <h6>Join Online</h6>
                <h6>Individual</h6>
                <h6>Corporate</h6>
                <h6>Personal Training</h6>
                <h6>FAQs</h6>
            </div>
            <div className='card'>
            <h5>CLUB & CLASSES</h5>
                <h6>Find Your Club</h6>
                <h6>Timetable</h6>
                <h6>Classes</h6>
                <h6>Mobile App</h6>
            </div>
            <div className='card'>
            <h5>GET IN TOUCH</h5>
                <h6>Free Trial</h6>
                <h6>Contact Us</h6>
                <h6>Careers</h6>
            </div>
            <div className='card'>
            <h5>FIND US</h5>
            <div>
            <TiSocialFacebookCircular size={24}/>
            <TiSocialTwitterCircular size={24}/>
            <TiSocialInstagram size={24}/>
            </div>
            <div>
                <input/>
                <button>Subscribe</button>
            </div>
            <h6>Subscribe to our newsletter</h6>
            </div>
        </div>
        <div className='end-links'>
        Copyright ® Calorie Tracker   |About Us|Corporate Social Responsibility|Press Room |Club Rules|Privacy Policy |Terms & Conditions  | Sitemap
        </div>
    </div>
  )
}

export default Footer