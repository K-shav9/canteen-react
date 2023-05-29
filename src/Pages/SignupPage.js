import React, { useState } from "react";
import "./signup.css";

function SignupPage() {

    const [isSignIn,setIsSignIn] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
  
    const handleSubmit = () => {
    setIsSignIn(true);

console.clear()
      console.log(firstName,lastName,mobile,email,address);
      // Handle form submission here, e.g., send data to server or perform validation
      // You can access the form data using the state variables (firstName, lastName, etc.)
      // Reset the form fields after submission if needed
      setFirstName('');
      setLastName('');
      setMobile('');
      setEmail('');
      setAddress('');

      setIsSignIn(false);
    };

    return (
        <section className="h-100 bg-dark">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card card-registration my-4">
                            <div className="row g-0">
                                <div className="col-xl-6 d-none d-xl-block">
                                    <img
                                        src="https://img.freepik.com/free-photo/vertical-view-spagetti-wooden-board-among-organic-vegetables-eggs-fallen-oil-bottle-pepper-black_140725-144563.jpg"
                                        alt="Sample photo"
                                        className="img-fluid"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderTopLeftRadius: ".25rem",
                                            borderBottomLeftRadius: ".25rem"
                                        }}
                                    />
                                </div>
                                <div className="col-xl-6">
                                    <div className="card-body p-md-5 text-black">
                                        <h3 className="mb-5 text-uppercase">
                                            Create Account
                                        </h3>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                     onChange={(e) => setFirstName(e.target.value)}
                                                        type="text"
                                                        id="form3Example1m"
                                                        className="form-control form-control-lg"

                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="form3Example1m">
                                                        First name
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                    onChange={(e) => setLastName(e.target.value)}
                                                        type="text"
                                                        id="form3Example1n"
                                                        className="form-control form-control-lg"
                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="form3Example1n">
                                                        Last name
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                     onChange={(e) => setMobile(e.target.value)}
                                                        type="text"
                                                        id="form3Example1m1"
                                                        className="form-control form-control-lg"
                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="form3Example1m1">
                                                        Mobile No.
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                    onChange={(e) => setEmail(e.target.value)}
                                                        type="text"
                                                        id="form3Example1n1"
                                                        className="form-control form-control-lg"
                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="form3Example1n1">
                                                        Email
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input
                                            onChange={(e) => setAddress(e.target.value)}
                                                type="text"
                                                id="form3Example8"
                                                className="form-control form-control-lg"

                                                required
                                            />
                                            <label className="form-label" htmlFor="form3Example8">
                                                Address
                                            </label>
                                        </div>
                                        <div className="d-flex justify-content-end pt-3">
                                            <button type="button" onClick={()=>handleSubmit()} className="btn btn-warning btn-lg ms-2">
                                                Sign Up
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default SignupPage;