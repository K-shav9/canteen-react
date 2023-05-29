import React from "react";
import WEBSITE from "../Constant/constant";

function AboutSection(){
    return(
        <>
  {/* about section */}
  <section className="about_section layout_padding">
    <div className="container  ">
      <div className="row">
        <div className="col-md-6 ">
          <div className="img-box">
            <img src="images/about-img.png" alt="" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="detail-box">
            <div className="heading_container">
              <h2>{WEBSITE.more_about.title}</h2>
            </div>
            <p>
              {WEBSITE.more_about.desc}
            </p>
            <a href="">Read More</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</>

    )
}

export default AboutSection;