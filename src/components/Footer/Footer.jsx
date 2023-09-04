import React from "react";
import "./Footer.scss";
import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import Payment from "../../assets/payments.png";

const Footer = () => {
  return (
    <div id="about" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="col">
            <div className="title">About</div>
            <div className="text">
              At CaliFit, we are passionate about helping athletes and sports
              enthusiasts find high-quality sports equipment to enhance their
              performance and enjoyment. We understand the importance of having
              reliable and durable gear that can withstand the demands of
              various sports activities, providing you with 100% flexibility in
              your training, anywhere and anytime.
            </div>
          </div>
          <div className="col">
            <div className="title">Contact</div>
            <div className="c-item">
              <FaLocationArrow />
              <div className="text">Maroc, casablanca</div>
            </div>
            <div className="c-item">
              <FaMobileAlt />
              <div className="text">Phone: 06 59 07 92 26</div>
            </div>
            <div className="c-item">
              <FaEnvelope />
              <div className="text">Email: hamzamaerof@gmail.com</div>
            </div>
          </div>
          <div className="col">
            <div className="title">Categories</div>
            <span className="text">Push</span>
            <span className="text">Pull</span>
            <span className="text">Legs</span>
            <span className="text">Others</span>
          </div>
          <div className="col">
            <div className="title">Pages</div>
            <span className="text">Home</span>
            <span className="text">About</span>
            <span className="text">categories</span>
          </div>
        </div>
        <div className="bottom-bar">
          <div className="container bottom-bar-content">
            <span className="text">
              CaliFit 2023 CREATED BY Hamza. PREMIUM E-COMMERCE SOLUTIONS.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
