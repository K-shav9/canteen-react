import React, { useState } from "react";
import "./signup.css";

import db from "../firebase";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { Link, useNavigate } from "react-router-dom";

import { collection, query, where, getDocs } from "firebase/firestore";

const auth = getAuth();

function LoginPage() {
    const navigate = useNavigate();

    const [isSignIn, setIsSignIn] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const storeUserDetails = async (uid) => {
        const q = query(collection(db, "tbl_user"), where("uid", "==", uid));

        const querySnapshot = await getDocs(q);
        const docId = querySnapshot.docs[0].id;
        const data = querySnapshot.docs[0].data()

        localStorage.setItem("user-details", JSON.stringify({
            uid: data.uid,
            docId: docId,
            firstName: data.firstName,
            lastName: data.lastName,
            mobile: data.mobile,
            address: data.address,
            email:data.email
        }));
        
    }

    const handleSubmit = async () => {
        setIsSignIn(true);


        console.clear()

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user.uid;

                alert("Login Success !");

                storeUserDetails(user);
                navigate("/home");
            })
            .catch((error) => {
                alert(error.message);
            });

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
                                            Login to Account
                                        </h3>

                                        <div className="row">

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
                                                onChange={(e) => setPassword(e.target.value)}
                                                type="text"
                                                id="form3Example8"
                                                className="form-control form-control-lg"

                                                required
                                            />
                                            <label className="form-label" htmlFor="form3Example8">
                                                Password
                                            </label>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between pt-3">
                                            <p>Create new account <Link to="/signup">Sign Up</Link></p>
                                            <button type="button" onClick={() => handleSubmit()} className="btn btn-warning btn-lg ms-2">
                                                {
                                                    isSignIn ? "Logging In..." : "Login"
                                                }
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

export default LoginPage;