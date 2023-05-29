import React from "react";
import HeroArea from "../components/HeroArea";
import FooterSection from "../components/FooterSection";
import AboutSection from "../components/AboutSection";

function AboutPage(){
    return(
         <>
            <HeroArea selectedMenu="about" showSlider={false} />
            <AboutSection />
            <FooterSection />
         </>
    );
}

export default AboutPage;
