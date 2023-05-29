import React from "react";
import WEBSITE from "../Constant/constant";

function FooterSection(){
    return(
        <footer className="footer_section">
  <div className="container">
    <div className="row">
      <div className="col-md-4 footer-col">
        <div className="footer_contact">
          <h4>Contact Us</h4>
          <div className="contact_link_box">
            <a href="">
              <i className="fa fa-map-marker" aria-hidden="true" />
              <span>{WEBSITE.about.address}</span>
            </a>
            <a href="">
              <i className="fa fa-phone" aria-hidden="true" />
              <span>Call {WEBSITE.about.phone}</span>
            </a>
            <a href="">
              <i className="fa fa-envelope" aria-hidden="true" />
              <span>{WEBSITE.about.email}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="col-md-4 footer-col">
        <div className="footer_detail">
          <a href="" className="footer-logo">
            {WEBSITE.title}
          </a>
          <p>
            {WEBSITE.about.desc}
          </p>
          <div className="footer_social">
            <a href={WEBSITE.about.facebook_link} target="_blank">
              <i className="fa fa-facebook" aria-hidden="_target" />
            </a>
            <a href={WEBSITE.about.instagram_link} target="_blank">
              <i className="fa fa-instagram" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="col-md-4 footer-col">
        <h4>Opening Hours</h4>
        <p>Everyday</p>
        <p>10.00 Am -10.00 Pm</p>
      </div>
    </div>
  </div>
</footer>

    )
}

export default FooterSection;