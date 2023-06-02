
import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";

import db from "../../firebase";
import { doc, collection, updateDoc, query, getDocs } from "firebase/firestore";

function Row(props) {
    const { item, key } = props;

    const updateStatus = async (value) => {
        const docRef = doc(db, "tbl_bookings", item?.id);

        // Set the "capital" field of the city 'DC'
        await updateDoc(docRef, {
            status: value
        });

        alert("Status Updated !");
    }

    return (
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
            <td className="text-warning">

                <select onChange={(e)=>updateStatus(e.target.value)} class="form-select" aria-label="Default select example">
                {
                    ["pending","approved"].map((status,key)=>(
                        (item?.data?.status == status) ?
                        <option value={status} selected>{status}</option> :
                        <option value={status}>{status}</option> 
                    ))
                }
                </select>
            </td>
        </tr>
    )
}

function AdminBooking() {

    const [products, setProducts] = useState(null);
    const [bookingsDetails, setBookingDetails] = useState(null);

    const fetchBookingDetails = async () => {
        let tmpData = [];
        const q = query(collection(db, "tbl_bookings"));

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

    useEffect(() => {
        fetchBookingDetails();
    }, [])

    return (<>
        <AdminNavbar />

        <div className="container mt-5">
            <h3>Table Bookings</h3>

            {
                (bookingsDetails?.length != 0) &&
                (
                    <div className="mt-5 mb-5 container">
                
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
                                   <Row item={item} key={key} />
                                ))
                            }                                
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    </>
    )
}

export default AdminBooking;