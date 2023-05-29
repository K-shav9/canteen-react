import React from "react";
import HeroArea from "../components/HeroArea";
import OfferSection from "../components/OfferSection";
import MenuSecton from "../components/MenuSection";
import AboutSection from "../components/AboutSection";
import BookSection from "../components/BookSection";
import FooterSection from "../components/FooterSection";

function HomePage(){
    return(
         <>
            <HeroArea selectedMenu="home" showSlider={true}/>
            <OfferSection />
            <MenuSecton />
            <AboutSection />
            <BookSection />
            <FooterSection />
         </>
    );
}

export default HomePage;
