import React, { useEffect, useState } from "react";
import HeroArea from "../components/HeroArea";
import FooterSection from "../components/FooterSection";
import BookSection from "../components/BookSection";
import { useNavigate } from "react-router-dom";

import { collection, query, where, getDocs } from "firebase/firestore";

import db from "../firebase";

function BookPage() {
    const navigate = useNavigate()

    const userDetails = JSON.parse(localStorage.getItem("user-details"));

    const [orderDetails, setOrderDetails] = useState(null);
    const [bookingsDetails, setBookingDetails] = useState(null);

  

    const fetchBookingDetails = async () => {
        let tmpData = [];
        const q = query(collection(db, "tbl_bookings"), where("uid", "==", userDetails.uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            tmpData.push({
                id: doc.id,
                data: doc.data()
            })
        });

        console.log(tmpData)
        setBookingDetails(tmpData);
    }

    const fetchOrderDetails = async () => {
        let tmpData = [];
        const q = query(collection(db, "tbl_orders"), where("uid", "==", userDetails.uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            tmpData.push({
                id: doc.id,
                data: doc.data()
            })
        });

        console.log(tmpData)
        setOrderDetails(tmpData);
    }


    useEffect(() => {
        const isUserDetails = JSON.parse(localStorage.getItem("user-details"));

        isUserDetails == null && navigate("/login");

        fetchBookingDetails();
        fetchOrderDetails();

    }, [])



    return (
        <>
            <HeroArea selectedMenu="book table" showSlider={false} />

            <div className="mt-5 mb-5 container">
                <h2>My Profile</h2>
                <hr />

                <div className="row mt-3">
                    <div className="col">
                        <span>Name</span>
                        <h5 className="mt-2 text-warning">{userDetails?.firstName} {userDetails?.lastName}</h5>
                    </div>
                    <div className="col">
                        <span>Email</span>
                        <h5 className="mt-2 text-warning">{userDetails?.email}</h5>
                    </div>
                    <div className="col">
                        <span>Mobile</span>
                        <h5 className="mt-2 text-warning">{userDetails?.mobile}</h5>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <span>Address</span>
                        <h5 className="mt-2 text-warning">{userDetails?.address}</h5>
                    </div>
                </div>
            </div>

            {
                (orderDetails?.length != 0)  &&
                (
                    <div className="mt-5 mb-5 container">
                        <h2>Order Details</h2>
                       
                        <table class="table mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">Order Id</th>
                                    <th scope="col">Items</th>
                                    <th scope="col">Delivery Details</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                orderDetails?.map((item,key)=>(
                                    <tr key={
                                        key
                                    }>
                                        <td>
                                            {item?.id}
                                        </td>
                                        <td>
                                            {
                                                item?.data?.cart?.map((food,key)=>(
                                                    <div key={key}>
                                                    <h5>{food?.title}</h5>
                                                    <div style={{
                                                        fontWeight:"bold",
                                                        fontSize:"18px",
                                                        display:"flex",
                                                        justifyContent:"space-between",
                                                        alignItems:"center"
                                                    }}>
                                                    <p
                                                    className="text-success">{food?.price} ₹</p>
                                                    <p>X {food?.quantity}</p>
                                                    </div>
                                                    
                                                    </div>
                                                ))
                                            }
                                        </td>
                                        <td>
                                            <span>{item?.data?.userDetails?.firstName} {item?.data?.userDetails?.lastName}</span>
                                            <br/>
                                            <span>{item?.data?.userDetails?.address}</span>
                                            <br/>
                                            <span>{item?.data?.userDetails?.mobile}</span>
                                            
                                        </td>
                                        <td style={{
                                            fontWeight:"bold",
                                            fontSize:"24px"
                                        }} className="text-success">
                                            {item?.data?.subTotal + item?.data?.delivery} ₹
                                        </td>
                                       
                                        <td style={{
                                            fontWeight:"bold"
                                        }} className="text-warning">
                                            {item?.data?.status?.toUpperCase()}
                                        </td>
                                    </tr>
                                ))
                            }                                
                            </tbody>
                        </table>
                    </div>
                )
            }

            {
                (bookingsDetails?.length != 0) &&
                (
                    <div className="mt-5 mb-5 container">
                        <h2>Booking Details</h2>
                       
                        <table class="table mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">Number of Persons</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                bookingsDetails?.map((item,key)=>(
                                    <tr key={
                                        key
                                    }>
                                        <td>
                                            {item?.data?.name}
                                        </td>
                                        <td>
                                            {item?.data?.email}
                                        </td>
                                        <td>
                                            {item?.data?.phone}
                                        </td>
                                        <td>
                                            {item?.data?.numOfPerson}
                                        </td>
                                        <td>
                                            {item?.data?.bookingDate}
                                        </td>
                                        <td style={{
                                            fontWeight:"bold"
                                        }} className="text-warning">
                                            {item?.data?.status?.toUpperCase()}
                                        </td>
                                    </tr>
                                ))
                            }                                
                            </tbody>
                        </table>
                    </div>
                )
            }


            <FooterSection />
        </>
    );
}

export default BookPage;
