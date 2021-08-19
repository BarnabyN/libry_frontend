import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Button, Input, Form } from "reactstrap";
import CustomNavbar from "../components/CustomNavbar";
import "../styles/HomePage.css";
import $ from "jquery";
import * as constants from "../constants";
import BookItem from "../components/BookItem.js";

export default function HomePage() {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [books, setBooks] = React.useState([]);
  const [user, setUser] = React.useState("");
  const [isread, setIsread] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [rating, setRating] = React.useState("");

  React.useEffect(() => {
    if (token) {
      fetch(constants.dbstring + "/get-current-user", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((u) => {
          setUser(u["username"]);
        });
    } else {
      history.push("/login");
    }
  }, [token]);

  React.useEffect(() => {
    if (token) {
      fetch(constants.dbstring + "/", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ username: user }),
      })
        .then((b) => b.json())
        .then((b) => {
          setBooks(b);
        });
    }
  }, [token]);

  function addBook(e) {
    e.preventDefault();

    fetch(constants.dbstring + "/add-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        title,
        author,
        isread,
        rating,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setRating("");
        setTitle("");
        setAuthor("");
        setIsread(false);
      });
  }

  return (
    <div>
      <CustomNavbar />

      <div className="content">
        <Form onSubmit={(e) => addBook(e)}>
          <Row form>
            <Col>
              <input
                className="add-item checkbox"
                type="checkbox"
                checked={isread}
                onChange={(e) => setIsread(!isread)}
              />{" "}
            </Col>
            <Col>
              <Input
                className="add-item"
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
            <Col>
              <Input
                className="add-item"
                type="text"
                placeholder="Author"
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Col>
            <Col>
              <Input
                className="add-item"
                type="text"
                placeholder="Rating"
                onChange={(e) => setRating(e.target.value)}
              />
            </Col>
            <Button className="add-item" type="submit">
              Add
            </Button>
          </Row>
        </Form>

        {books.map((book) => {
          return <BookItem book={book} />;
        })}
      </div>
    </div>
  );
}
