import React, { useEffect,useState } from "react";
import HeroArea from "../components/HeroArea";
import OfferSection from "../components/OfferSection";
import MenuSecton from "../components/MenuSection";
import AboutSection from "../components/AboutSection";
import FooterSection from "../components/FooterSection";

function HomePage() {
    const [userId, setUserId] = useState(null);

    const isUserLogin = () => {
        const userDetails = JSON.parse(localStorage.getItem("user-details"));

        setUserId(userDetails?.uid);

    };

    useEffect(()=>{
        isUserLogin();
    });

    return (
        <>
            <HeroArea selectedMenu="home" showSlider={true} />
            <OfferSection />
            <MenuSecton />
            <AboutSection />
            
            <FooterSection />
        </>
    );
}

export default HomePage;
