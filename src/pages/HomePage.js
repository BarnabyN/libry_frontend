import React from "react";
import { useHistory } from "react-router-dom";
import { Table, Input } from "reactstrap";
import Tickbox from "../elements/Tickbox.js";
import CustomNavbar from "../components/CustomNavbar";
import "../styles/HomePage.css";
import $ from "jquery";
import * as constants from "../constants";

export default function HomePage() {
  const history = useHistory();
  const [user, setUser] = React.useState("");
  const token = localStorage.getItem("token");
  const [books, setBooks] = React.useState([]);

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
          console.log(b);
          setBooks(b);
        });
    }
  }, [token]);

  function newEntry(e) {
    e.preventDefault();

    fetch(constants.dbstring + "/add-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  }

  return (
    <div>
      <CustomNavbar />

      <div className="content">
        <form>
          <input className="add-item" type="checkbox" />{" "}
          <input className="add-item" type="text" placeholder="Title" />
          <input className="add-item" type="text" placeholder="Author" />
          <input className="add-item" type="text" placeholder="Rating" />
          <button onSubmit={newEntry}>Add</button>
        </form>
        <Table hover className="book-table">
          <thead>
            <tr>
              <th>Read</th>
              <th>Title</th>
              <th>Author</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              return (
                <tr>
                  <td className="isread" scope="row" value={book.isread}>
                    <Tickbox />
                  </td>
                  <td>
                    <input
                      className="table-editable title"
                      type="text"
                      value={book.title}
                      disabled={true}
                    />
                  </td>
                  <td>
                    <input
                      className="table-editable author"
                      type="text"
                      value={book.author}
                      disabled={true}
                    />
                  </td>
                  <td>
                    <input
                      className="table-editable rating"
                      type="text"
                      value={book.rating}
                      disabled={true}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
