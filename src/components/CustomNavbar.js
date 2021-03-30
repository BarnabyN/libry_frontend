import React, { useState } from "react";
import * as constants from "../constants";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

export default function CustomNavbar() {
  const [collapsed, setCollapsed] = useState(true);
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

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">
          libry
        </NavbarBrand>
        <NavbarText>{user}</NavbarText>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            {user ? (
              <NavLink href="/login/">Log Out</NavLink>
            ) : (
              <div>
                <NavItem>
                  <NavLink href="/login/">Log In</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/signup">Sign Up</NavLink>
                </NavItem>
              </div>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
