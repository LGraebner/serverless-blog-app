import React, { Component } from 'react';
import './Footer.css';
import topImage from '../../gfx/wallpaper-1406531.jpg';

class Footer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

{/* <div className="footerImage darken" style={{backgroundImage: "url(" + this.props.topImage + ")"}}></div> */}
<div className="footerImage darken" style={{backgroundColor: 'lightblue'}}></div>
    {/* <div className="footerContent">
                <div className="flex-container">
                    <div className="infoBox">
                    <h2>About</h2>
                    I studied Computer Science and have been working as Software Developer ever since. I have been active mostly in the Java World, but of course I also had many tasks with other programming and scripting languages.
                    I have been working most of the time as a fullstack developer on web applications with a greater focus on backend.
                    My main focus now is developing microservices on AWS using Java and Spring.
                    </div>

                    <div className="infoBox">
                    <h2>Contact me</h2>
                    Just write an e-mail to 
                    </div>
                
                </div>
    </div> */}
            </div>
        );
    }

}

export default Footer;