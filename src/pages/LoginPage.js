import React from "react";
import { useHistory } from "react-router-dom";
import CustomNavbar from "../components/CustomNavbar.js";
import "../styles/LoginPage.css";
import * as constants from "../constants";
import { Col, Button, Form, FormGroup, Input } from "reactstrap";

function LoginPage() {
  const history = useHistory();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch(constants.dbstring + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        if (res.success === false) {
          setErrorMessage(res.message);
        } else {
          setErrorMessage("");
          localStorage.setItem("token", res.token);
          history.push("/");
        }
      });
  }

  return (
    <div className="react-wrapper">
      <CustomNavbar />

      <Col md={{ size: 6, offset: 3 }}>
        <h2>Log In</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

          <Button type="submit">Submit</Button>
        </Form>
      </Col>
    </div>
  );
}

export default LoginPage;
