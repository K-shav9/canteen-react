import React from "react";
import HeroArea from "../components/HeroArea";
import FooterSection from "../components/FooterSection";
import BookSection from "../components/BookSection";

function BookPage(){
    return(
         <>
            <HeroArea selectedMenu="book table" showSlider={false} />
            <BookSection />
            <FooterSection />
         </>
    );
}

export default BookPage;
