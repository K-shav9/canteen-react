
import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";

import db from "../../firebase";
import { doc, collection, updateDoc, query, getDocs } from "firebase/firestore";

function Row(props) {
    const { item, key } = props;

    const updateStatus = async (value) => {
        const docRef = doc(db, "tbl_orders", item?.id);

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
                {item?.id}
            </td>
            <td>
                {
                    item?.data?.cart?.map((food, key) => (
                        <div key={key}>
                            <h5>{food?.title}</h5>
                            <div style={{
                                fontWeight: "bold",
                                fontSize: "18px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
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
                <br />
                <span>{item?.data?.userDetails?.address}</span>
                <br />
                <span>{item?.data?.userDetails?.mobile}</span>

            </td>
            <td style={{
                fontWeight: "bold",
                fontSize: "24px"
            }} className="text-success">
                {item?.data?.subTotal + item?.data?.delivery} ₹
            </td>

            <td className="text-warning">

                <select onChange={(e)=>updateStatus(e.target.value)} class="form-select" aria-label="Default select example">
                {
                    ["pending","approved","processing","out for delivery","delivered","cancelled"].map((status,key)=>(
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

function AdminOrders() {

    const [products, setProducts] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);

    const fetchOrderDetails = async () => {
        let tmpData = [];
        const q = query(collection(db, "tbl_orders"));

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
        fetchOrderDetails();
    }, [])

    return (<>
        <AdminNavbar />

        <div className="container mt-5">
            <h3>Orders</h3>

            {
                (orderDetails?.length != 0) &&
                (
                    <div className="mt-5 mb-5 container">
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
                                    orderDetails?.map((item, key) => (
                                        <Row item={item} key={key}
                                        />
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

export default AdminOrders;