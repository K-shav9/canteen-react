import React from "react";
import Header from "./Header";
import HomeSlider from "./HomeSlider";

function HeroArea(props) {
  return (
    <>
      {props.showSlider ? (
        <div className="hero_area">
          <div className="bg-box">
            <img src="images/hero-bg.jpg" alt="" />
          </div>

          <Header selectedMenu={props.selectedMenu} />

          <HomeSlider />
        </div>
      ) : (
        <div className="sub_page">
          <div className="hero_area" style={{
            marginBottom:((props.selectedMenu == "menu" || props.selectedMenu == "cart") ? "40px" : "0")
          }}>
            <div className="bg-box">
              <img src="images/hero-bg.jpg" alt="" />
            </div>

            <Header selectedMenu={props.selectedMenu} />
          </div>
        </div>
      )}
    </>
  );
}

export default HeroArea;
