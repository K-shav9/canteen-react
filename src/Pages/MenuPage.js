import React from "react";
import HeroArea from "../components/HeroArea";
import MenuSecton from "../components/MenuSection";
import FooterSection from "../components/FooterSection";

function MenuPage(){
    return(
         <>
            <HeroArea selectedMenu="menu" showSlider={false} />
            <MenuSecton />
            <FooterSection />
         </>
    );
}

export default MenuPage;
