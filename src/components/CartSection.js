import React, { useEffect, useRef, useState } from "react";

import db from "../firebase";
import { collection, addDoc } from "firebase/firestore"; 

import { useNavigate } from "react-router-dom";


function MenuCard(props) {
  const [quantity, setQuantity] = useState(1);

  const addAmount = () => {
    props.handleSubtotal(Number(props?.price) / 2);
  }

  const intialQuantity = () => {
    const jsonData = JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < jsonData.length; i++) {
      jsonData[i].quantity = 1;
    }
    localStorage.setItem("cart", JSON.stringify(jsonData));
  }

  const updateQuantity = (newQuantity) => {
    const jsonData = JSON.parse(localStorage.getItem("cart"));

    const itemIdToUpdate = props.itemId;

    const indexToUpdate = jsonData.findIndex(item => item.itemId === itemIdToUpdate);

    if (indexToUpdate !== -1) {
      jsonData[indexToUpdate].quantity += newQuantity;
    }

    console.log(jsonData)
    localStorage.setItem("cart", JSON.stringify(jsonData));
  }

  const removeItem = () => {
    const jsonData = JSON.parse(localStorage.getItem("cart"));

    const itemIdToUpdate = props.itemId;
    const indexToUpdate = jsonData.findIndex(item => item.itemId === itemIdToUpdate);

    props.handleSubtotal(Number(props.price) * Number(jsonData[indexToUpdate].quantity) * -1);

    const jsonDataTmp = jsonData.filter(item => item.itemId !== itemIdToUpdate);
    localStorage.setItem("cart", JSON.stringify(jsonDataTmp));
  }

  useEffect(() => {
    addAmount();
    intialQuantity();
  }, [])

  return (
    <div className="col-sm-6 col-lg-4">
      <div className="box">
        <div>
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "relative",
            top: "10px",
            left: "-10px"
          }}>
            <button onClick={() => removeItem()} style={{
              border: "none",
              borderRadius: "6px"
            }} className="btn-danger">X</button>
          </div>
          <div className="img-box">

            <img src={props.url} alt="" />
          </div>
          <div className="detail-box">
            <h5>{props.title}</h5>
            <p>{props.desc}</p>
            <div className="options">
              <h6>{props.price} ₹</h6>

              <a style={{
                borderRadius: "12px",
                display: "inline-block",
                width: "100px",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                fontSize: 20
              }}>

                {
                  quantity > 1 && (
                    <span style={{
                      cursor: "pointer"
                    }} onClick={() => {
                      (quantity > 1) &&
                        setQuantity(quantity - 1)
                      props.handleSubtotal(Number(props.price) * -1)
                      updateQuantity(-1);
                    }}>-</span>
                  )
                }
                <span>{quantity}</span> <span style={{
                  cursor: "pointer"
                }} onClick={() => {
                  setQuantity(quantity + 1)
                  props.handleSubtotal(Number(props.price))
                  updateQuantity(1);
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

  const navigate = useNavigate();

  const subTotal = useRef(0);
  const delivery = useRef(40);

  const [showSubTotal, setShowSubTotal] = useState(0);
  const [showDelivery, setShowDelivery] = useState(40);

  let cart = JSON.parse(localStorage.getItem("cart"));

  const handleSubtotal = (amount) => {
    subTotal.current += amount;
    setShowSubTotal(subTotal.current);
  }

  const [isPlacingOrder,setIsPlacingOrder] = useState(false);

  const placeOrder = async () => {
    setIsPlacingOrder(true);
    const userDetails = JSON.parse(localStorage.getItem("user-details"));
    const cart = JSON.parse(localStorage.getItem("cart"));

    try {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "tbl_orders"), {
        userDetails:userDetails,
        cart:cart,
        subTotal:subTotal.current,
        delivery:delivery.current,
        uid:userDetails.uid,
        docId:userDetails.docId,
        status:"pending"
      });

      alert("Order Placed !");

      localStorage.setItem("cart",null);

      navigate("/profile")

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.log(e);
      alert("Unable to place order at this moment !")
    }

    setIsPlacingOrder(false);
  }

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
              {cart?.map((item, key) => (
                <MenuCard
                  title={item.title}
                  url={item.url}
                  desc={item.desc}
                  price={item.price}
                  key={key}
                  itemId={item.itemId}
                  handleSubtotal={handleSubtotal}
                />
              ))}
            </div>
          </div>
          <hr />
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "24px",
            fontWeight: "bolder"
          }}>
            <span>SubTotal</span>
            <span>{showSubTotal} ₹</span>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "24px",
            color: "grey"
          }}>
            <span>Delivery</span>
            <span>{(showSubTotal == 0) ? 0 : showDelivery} ₹</span>


          </div>
          <hr />
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "28px",
            fontWeight: "bolder"
          }}>
            <span>Total</span>
            <span>{(showSubTotal == 0) ? 0 : showSubTotal + showDelivery} ₹</span>
          </div>

          <hr />

          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
          }}>
            <button style={{
              fontWeight: "bold",
              fontSize: "24px"
            }} onClick={()=>placeOrder()} className="btn btn-success btn-xl" >
              {
                isPlacingOrder ? "Placing Order..." : "Place Order"
              }
            </button>
          </div>
        </div>
      </section>
      {/* end food section */}
    </>
  );
}

export default CartSecton;
