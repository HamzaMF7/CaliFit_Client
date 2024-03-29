import React from "react";
import "./Newsletter.scss";
import img1 from "../../../images/home.webp";
import img2 from "../../../images/time.webp";
import img3 from "../../../images/workour.webp";
import img4 from "../../../images/pull.webp";

const Newsletter = () => {
  return (
    <div className="newsletter-section">
      <h2 className="container title">BENEFITS OF BODYWEIGHT TRAINING</h2>
      <div className="container newsletter-content">
        <div className="icon-box">
          <div className="image">
            <img src={img1} alt="image" />
          </div>
            <p>
              Train with 100% flexibility: at home, during travelling and
              outdoors.
            </p>
        </div>
        <div className="icon-box">
          <div className="image">
            <img src={img2} alt="image" />
          </div>
            <p>
              Save time and money: no travel to the gym and no monthly gym fees.
            </p>
        </div>
        <div className="icon-box">
          <div className="image">
            <img src={img3} alt="image" />
          </div>
          <p>Build muscle, increase strength and flexibility and burn fat.</p>
        </div>
        <div className="icon-box">
          <div className="image">
            <img src={img4} alt="image" />
          </div>
            <p>
              Increase your body control, improve your posture and prevent back
              pain.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
