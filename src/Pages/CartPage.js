import React from "react";
import HeroArea from "../components/HeroArea";
import FooterSection from "../components/FooterSection";
import CartSecton from "../components/CartSection";

function CartPage(){
    return(
         <>
            <HeroArea selectedMenu="cart" showSlider={false} />
            <CartSecton />
            <FooterSection />
         </>
    );
}

export default CartPage;
