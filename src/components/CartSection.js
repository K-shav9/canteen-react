import React, { useState } from "react";
import WEBSITE from "../Constant/constant";

function MenuCard(props) {

    const [quantity,setQuantity] = useState(1);

  return (
    <div className="col-sm-6 col-lg-4">
      <div className="box">
        <div>
          <div className="img-box">
            <img src={props.img} alt="" />
          </div>
          <div className="detail-box">
            <h5>{props.title}</h5>
            <p>{props.desc}</p>
            <div className="options">
              <h6>${props.price}</h6>

                <a style={{
                    borderRadius:"12px",
                    display:"inline-block",
                    width:"100px",
                    display:"flex",
                    justifyContent:"space-evenly",
                    alignItems:"center",
                    fontSize:20
                }}>
                    <span style={{
                        cursor:"pointer"
                    }} onClick={()=>{
                        (quantity > 1) && 
                        setQuantity(quantity - 1)
                    }}>-</span> <span>{quantity}</span> <span  style={{
                        cursor:"pointer"
                    }} onClick={()=>{
                        setQuantity(quantity + 1)
                    }}>+</span>
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartSecton() {
  return (
    <>
      {/* food section */}
      <section className="food_section layout_padding-bottom">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Cart</h2>
          </div>
        
          <div className="filters-content">
            <div className="row grid">
              {WEBSITE.food_menu
                .map((item, key) => (
                  <MenuCard
                    title={item.title}
                    img={item.img}
                    desc={item.desc}
                    price={item.price}
                    key={key}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
      {/* end food section */}
    </>
  );
}

export default CartSecton;
