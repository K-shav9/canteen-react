import React from "react";
import WEBSITE from "../Constant/constant";

function Tagline(props) {
  return (
  
    <div className={(props.isActive ? "carousel-item active" : "carousel-item")}>
              <div className="container ">
                <div className="row">
                  <div className="col-md-7 col-lg-6 ">
                    <div className="detail-box">
                      <h1>{props.title}</h1>
                      <p>
                      {props.desc}
                      </p>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
  );
}

function HomeSlider() {
  return (
    <>
      <section className="slider_section ">
        <div
          id="customCarousel1"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            {
                WEBSITE.taglines.map((item,key)=>(
                    <Tagline title={item.title} key={key} desc={item.desc} isActive={item.active}
                    />
                ))
            }
          </div>
          <div className="container">
            <ol className="carousel-indicators">
              <li
                data-target="#customCarousel1"
                data-slide-to={0}
                className="active"
              />
              <li data-target="#customCarousel1" data-slide-to={1} />
              <li data-target="#customCarousel1" data-slide-to={2} />
            </ol>
          </div>
        </div>
      </section>
      {/* end sl
       */}
    </>
  );
}

export default HomeSlider;
