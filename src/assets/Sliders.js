
import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import "../components/Summary.css"

const Sliders = () => {
    const images = [
        "https://wallpaperaccess.com/full/1078096.jpg",
        "https://wallpapercave.com/wp/wp2067453.jpg",
        "http://pavbca.com/walldb/original/4/e/9/140997.jpg",
    ];

    return (
        <Slide>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[0]})` }}>
           
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[1]})` }}>
                 
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[2]})` }}>
           
                </div>
            </div>
        </Slide>
    );
};

export default Sliders;