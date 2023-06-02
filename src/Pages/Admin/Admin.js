
import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";

import db from "../../firebase";
import { doc, collection,addDoc, updateDoc, query, getDocs } from "firebase/firestore";


function ProductModal(props) {
    const { modalId, itemId, data } = props;

    const [title, setTitle] = useState(data?.title);
    const [desc, setDesc] = useState(data?.desc);
    const [category, setCategory] = useState(data?.category);
    const [price, setPrice] = useState(data?.price);
    const [url, setUrl] = useState(data?.url);

    const [isUpdating, setIsUpdating] = useState(false);

    console.log(itemId)

    const update = async () => {
        setIsUpdating(true);
        const docRef = doc(db, "tbl_menu", itemId);

        // Set the "capital" field of the city 'DC'
        await updateDoc(docRef, {
            title: title,
            desc: desc,
            category: category,
            price: price,
            url: url
        });

        alert("Updated !");
        setIsUpdating(false);

        window.location.replace("./admin");

    }

    return (
        <>
            {/* Modal */}
            <div
                className="modal fade"
                id={modalId}
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Update Product
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">
                                    Category
                                </label>
                                <select onChange={(e) => setCategory(e.target.value)} class="form-select" aria-label="Default select example">
                                    {
                                        ["fries", "pasta", "burger", "pizza","momos"].map((item, key) => (

                                            item == category ?
                                                (<option selected key={
                                                    key
                                                } value={item}>{item}</option>) : (<option key={
                                                    key
                                                } value={item}>{item}</option>)


                                        ))
                                    }
                                </select>

                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    min="1"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">
                                    Img Url
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button onClick={() => {
                                update();
                            }} type="button" className="btn btn-primary">
                                {isUpdating ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

function AddModal() {
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [category, setCategory] = useState(null);
    const [price, setPrice] = useState(null);
    const [url, setUrl] = useState(null);

    const [isUpdating, setIsUpdating] = useState(false);

    const update = async () => {
        setIsUpdating(true);
         

        const docRef = await addDoc(collection(db, "tbl_menu"), {
            title: title,
            desc: desc,
            category: category,
            price: price,
            url: url
        });
          console.log("Document written with ID: ", docRef.id);

     

        alert("Added !");
        setIsUpdating(false);

        window.location.replace("./admin");

    }

    return (
        <>
            {/* Modal */}
            <div
                className="modal fade"
                id="addproductmodal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Add Product
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">
                                    Category
                                </label>
                                <select onChange={(e) => setCategory(e.target.value)} class="form-select" aria-label="Default select example">
                                <option>Select</option>
                                    {
                                        ["fries", "pasta", "burger", "pizza","momos"].map((item, key) => (

                                            item == category ?
                                                (<option selected key={
                                                    key
                                                } value={item}>{item}</option>) : (<option key={
                                                    key
                                                } value={item}>{item}</option>)


                                        ))
                                    }
                                </select>

                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    min="1"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">
                                    Img Url
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button onClick={() => {
                                update();
                            }} type="button" className="btn btn-primary">
                                {isUpdating ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

function Admin() {

    const [products, setProducts] = useState(null);

    const fetchProducts = async () => {
        let tmpData = [];
        const q = query(collection(db, "tbl_menu"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            tmpData.push({
                id: doc.id,
                data: doc.data()
            });
        });

        console.log(tmpData)
        setProducts(tmpData);
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    return (<>
        <AdminNavbar />

        <div className="container mt-5">
            <h3>Products</h3>

            <div >
                <button style={{
                    float:"right"
                }} data-bs-toggle="modal" data-bs-target="#addproductmodal" className="btn btn-primary mt-3 mb-3">Add</button>

                <AddModal />
            </div>

            <table class="table mt-3">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products?.map((item, key) => (
                            <tr key={key}>
                                <td width={"90px"} scope="row">
                                    <img width="80px" height="80px" src={item?.data?.url} />
                                </td>
                                <td width="150px" scope="row">
                                    {item?.data?.title}
                                </td>
                                <td scope="row">
                                    {item?.data?.desc}
                                </td>
                                <td scope="row">
                                    {item?.data?.category?.toUpperCase()}
                                </td>
                                <td width={"100px"} scope="row">
                                    {item?.data?.price} ₹
                                </td>
                                <td>
                                    <button data-bs-toggle="modal" data-bs-target={"#tj" + item?.id} className="btn btn-primary">Edit</button>

                                    <ProductModal itemId={item.id} data={item?.data} modalId={"tj" + item?.id} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </>
    )
}

export default Admin;