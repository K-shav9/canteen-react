import React, { useEffect, useState } from "react";
import WEBSITE from "../Constant/constant";

import db from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function FilterItem(props) {
  return (
    <>
      {props.isActive ? (
        <li
          onClick={() => {
            props.update(props.name);
          }}
          className="active"
        >
          {props.name.toString().toUpperCase()}
        </li>
      ) : (
        <li
          onClick={() => {
            props.update(props.name);
          }}
        >
          {props.name.toString().toUpperCase()}
        </li>
      )}
    </>
  );
}

function MenuCard(props) {
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
              <a href="">
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 456.029 456.029"
                  style={{
                    enableBackground: "new 0 0 456.029 456.029",
                  }}
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <path
                        d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
                   c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
                   C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
                   c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
                   C457.728,97.71,450.56,86.958,439.296,84.91z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
                   c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"
                      />
                    </g>
                  </g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuSecton() {
  const [selectedFoodMenu, setSelectedFoodMenu] = useState("ALL");

  const [menuCategories, setMenuCategories] = useState(null);

  const [menu, setMenu] = useState(null);

  const fetchMenuCategories = async () => {
    let tmpData = [];

    tmpData.push({
      id: Math.random(),
      data: "ALL"
    })


    const q = query(collection(db, "tbl_menu_category"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());

      tmpData.push({
        id: doc.id,
        data: doc.data().name
      })
    });

    setMenuCategories(tmpData);


    fetchMenu();
  }

  const fetchMenu = async () => {
    let tmpData = [];

    const q = query(collection(db, "tbl_menu"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());

      tmpData.push({
        id: doc.id,
        data: doc.data()
      })
    });

    setTimeout(()=>{
      setMenu(tmpData)
    },2000);
  }


  const updateSelectedFoodMenu = (value) => {
    setSelectedFoodMenu(value);
  };

  useEffect(() => {
    fetchMenuCategories();
  }, [])

  return (
    <>
      {/* food section */}
      <section className="food_section layout_padding-bottom">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Our Menu</h2>
          </div>
          <ul className="filters_menu">
            {menuCategories?.map((item, key) => (
              <FilterItem
                update={updateSelectedFoodMenu}
                name={item.data}
                key={key}
                isActive={selectedFoodMenu == item.data ? true : false}
              />
            ))}
          </ul>
          <div className="filters-content">
            <div className="row grid">

              {
                menu ?
                  (
                    menu?.filter((item) =>
                      selectedFoodMenu != "ALL"
                        ? item.data.category == selectedFoodMenu.toLowerCase()
                        : item.data.category != selectedFoodMenu.toLowerCase()
                    )
                      .map((item, key) => (
                        <MenuCard
                          title={item.data.title}
                          img={item.data.img}
                          desc={item.data.desc}
                          price={item.data.price}
                          key={key}
                        />
                      ))
                  ) :
                  (
                    <div style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                      <img style={{
                        width: "420px"
                      }} src="https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif" />

                      <img style={{
                        width: "420px"
                      }} src="https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif" />

                      <img style={{
                        width: "420px"
                      }} src="https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif" />
                    </div>
                  )
              }
            </div>
          </div>
          <div className="btn-box">
            <a href="">View More</a>
          </div>
        </div>
      </section>
      {/* end food section */}
    </>
  );
}

export default MenuSecton;
