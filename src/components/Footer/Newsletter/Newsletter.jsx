import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import "./Newsletter.scss";
import img1 from "../../../images/home.png";
import img2 from "../../../images/time.png";
import img3 from "../../../images/workour.png";
import img4 from "../../../images/pull.png";

const Newsletter = () => {
  return (
    <div className=" container newsletter-section">
      <h2 className="title">BENEFITS OF BODYWEIGHT TRAINING</h2>
      <div className="newsletter-content">
        {/* <span className="small-text">Newsletter</span>
                <span className="big-text">
                    Sign up for latest updates and offers
                </span>
                <div className="form">
                    <input type="text" placeholder="Email Address" />
                    <button>Subscribe</button>
                </div>
                <span className="text">
                    Will be used in accordance with our Privacy Policy
                </span>
                <span className="social-icons">
                    <div className="icon">
                        <FaLinkedinIn size={14} />
                    </div>
                    <div className="icon">
                        <FaFacebookF size={14} />
                    </div>
                    <div className="icon">
                        <FaTwitter size={14} />
                    </div>
                    <div className="icon">
                        <FaInstagram size={14} />
                    </div>
                </span> */}
        <div className="icon-box">
          <div className="image">
            <img src={img1} alt="" />
          </div>
            <p>
              Train with 100% flexibility: at home, during travelling and
              outdoors.
            </p>
        </div>
        <div className="icon-box">
          <div className="image">
            <img src={img2} alt="" />
          </div>
          <p>Build muscle, increase strength and flexibility and burn fat.</p>
        </div>
        <div className="icon-box">
          <div className="image">
            <img src={img3} alt="" />
          </div>
            <p>
              Save time and money: no travel to the gym and no monthly gym fees.
            </p>
        </div>
        <div className="icon-box">
          <div className="image">
            <img src={img4} alt="" />
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
