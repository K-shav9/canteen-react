import React,{useState,useEffect} from "react";
import { collection, addDoc } from "firebase/firestore"; 
import db from "../firebase";

import { useNavigate } from "react-router-dom";

function BookSection(){

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user-details"));

  const [userDetails, setUserDetails] = useState(null);

  const isUserLogin = () => {
    const userDetails = JSON.parse(localStorage.getItem("user-details"));

    if(userDetails == null){
      alert("Please login first !");
      navigate("/login")
    }

    setUserDetails(userDetails);
  };

  const [name,setName] = useState(user?.firstName+user?.lastName);
  const [email,setEmail] = useState(user?.email);
  const [phone,setPhone] = useState(user?.mobile);

  const [numOfPerson,setNumOfPerson] = useState(null);
  const [bookingDate,setBookingDate] = useState(null);

  const [showBooking,setShowBooking] = useState(true);
 

  useEffect(() => {
    isUserLogin();
  });

  const handleBooking = async () => {
    setShowBooking(false);
  
    try{
      const docRef = await addDoc(collection(db, "tbl_bookings"), {
        name:name,
        email:email,
        phone:phone,
        numOfPerson:numOfPerson,
        bookingDate:bookingDate,
        uid:user.uid,
        docId:user.docId,
        status:"pending"
      });
      alert("Your request for table is received...! We will notify you by mail !");

      navigate("/profile")
      console.log("Document written with ID: ", docRef.id);
    }catch(err){
      console.log(err);
      alert("Unable to book table at this moment !")
    }

    
    

    setShowBooking(true);
  }


    return(
        <>
  {/* book section */}
  <section className="book_section layout_padding">
    <div className="container">
      <div className="heading_container">
        <h2>Book A Table</h2>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="form_container">
           
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              <div>
                <select onChange={(e)=>setNumOfPerson(e.target.value)} className="form-control nice-select wide">
                <option selected>How many persons ?</option>
                {
                  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item,key)=>(<option key={key} value={item}>{item}</option>))
                }
                </select>
              </div>
              <div>
                <input onChange={(e)=>setBookingDate(e.target.value)} type="date" className="form-control" />
              </div>
              <div  className="btn_box">
                <button type="button" onClick={()=>handleBooking()}>
                  {
                    showBooking ? "Book Now" : "Booking..."
                  }
                </button>
              </div>
           
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* end book section */}
</>

    )
}

export default BookSection;