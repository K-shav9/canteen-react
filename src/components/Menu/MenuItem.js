import React from "react";
import { Link } from "react-router-dom";

function MenuItem(props) {
  const { userId } = props;

  console.log(userId)


  return (

    (
      <li className={props.isCurrent ? "nav-item active" : "nav-item"}>
        <Link className="nav-link" to={props.name == "home" ? "/" : "/" + props.name.toString()}>
          {props.name}
        </Link>
      </li>
    )

  );
}

MenuItem.defaultProps = {
  name: "",
  isCurrent: false
}


export default MenuItem;
