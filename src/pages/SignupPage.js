import React from "react";
import { useHistory } from "react-router-dom";
import CustomNavbar from "../components/CustomNavbar";
import "../styles/SignupPage.css";
import * as constants from "../constants";
import { Col, Button, Form, FormGroup, Input, FormFeedback } from "reactstrap";

export default function SignupPage() {
  const history = useHistory();

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch(constants.dbstring + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
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
          history.push("/");
        }
      });
  }
  return (
    <div>
      <CustomNavbar />
      <Col md={{ size: 6, offset: 3 }}>
        <h2>Sign Up!</h2>
        <Form>
          <FormGroup>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <FormGroup>
            <Input
              type="password"
              placeholder="Confirm Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </Col>
    </div>
  );
}
