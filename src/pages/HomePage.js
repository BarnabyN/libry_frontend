import React from "react";
import { useHistory } from "react-router-dom";
import { Table, Input } from "reactstrap";
import CustomNavbar from "../components/CustomNavbar";
import "../styles/HomePage.css";
import $ from "jquery";
import * as constants from "../constants";
import BookTable from "../components/BookTable.js";

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
    // e.preventDefault();

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
        <form onSubmit={(e) => addBook(e)}>
          <input
            className="add-item"
            type="checkbox"
            checked={isread}
            onChange={(e) => setIsread(!isread)}
          />{" "}
          <input
            className="add-item"
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="add-item"
            type="text"
            placeholder="Author"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            className="add-item"
            type="text"
            placeholder="Rating"
            onChange={(e) => setRating(e.target.value)}
          />
          <button>Add</button>
        </form>
        <BookTable books={books} />
      </div>
    </div>
  );
}
