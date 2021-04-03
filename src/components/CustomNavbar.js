import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as constants from "../constants";
import "../styles/CustomNavbar.css";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

export default function CustomNavbar() {
  const history = useHistory();
  const [user, setUser] = React.useState("");
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    if (token) {
      fetch(constants.dbstring + "/get-current-user", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((u) => {
          setUser(u["username"]);
        });
    }
  }, [token]);

  return (
    <Navbar className="navbar" color="dark" dark expand="ml">
      <NavbarBrand href="/">libry</NavbarBrand>

      <Nav className="ml-auto" navbar>
        {user ? (
          <div className="nav">
            <NavbarText className="nav-item-override">{user}</NavbarText>
            <NavbarText className="nav-item-override">|</NavbarText>
            <NavItem className="nav-item-override">
              <NavLink
                tag={Link}
                onClick={() => {
                  localStorage.removeItem("token");
                  history.push("/login");
                }}
              >
                Log Out
              </NavLink>
            </NavItem>
          </div>
        ) : (
          <div className="nav">
            <NavItem className="nav-item-override">
              <NavLink href="/login/">Log In</NavLink>
            </NavItem>
            <NavbarText className="nav-item-override">|</NavbarText>
            <NavItem className="nav-item-override">
              <NavLink href="/signup">Sign Up</NavLink>
            </NavItem>
          </div>
        )}
      </Nav>
    </Navbar>
  );
}
