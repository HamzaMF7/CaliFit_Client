import React from "react";

import "./Banner.scss";

const Banner = () => {
    return (
        <div className="hero-banner">
            <div className="container content">
                <div className="container text-content">
                    <h1>Elevate Your <span>Fitness</span> with Calisthenics <span>Gear</span></h1>
                    <div className="gearUp" typeof="button">Gear Up</div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
