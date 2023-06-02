import React,{useState,useEffect}from "react";
import WEBSITE from "../Constant/constant";

function OfferCard(props) {



  return (
    <div className="col-md-6  ">
      <div className="box ">
        <div className="img-box">
          <img src={props.img} alt="" />
        </div>
        <div className="detail-box">
          <h5>{props.title}</h5>
          <h6>
            <span>{props.off}%</span> Off
          </h6>
        </div>
      </div>
    </div>
  );
}

function OfferSection() {
  return (
    <>
      {/* offer section */}
      <section className="offer_section layout_padding-bottom">
        <div className="offer_container">
          <div className="container ">
            <div className="row">
              {
                WEBSITE.offers.map((item,key)=>(
                  <OfferCard title={item.title} key={key} img={item.img} off={item.off}/>
                ))
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OfferSection;
