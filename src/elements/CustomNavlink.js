import React from "react";
import { Link } from "react-router-dom";
import "../styles/elements/CustomNavlink.css";

export default function CustomNavlink(props) {
  return (
    <Link to={props.to} className="navlink">
      {props.text}
    </Link>
  );
}
