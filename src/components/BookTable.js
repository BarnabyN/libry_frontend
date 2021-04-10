import React from "react";
import { Table } from "reactstrap";
import "../styles/BookTable.css";

export default function BookTable(props) {
  return (
    <div>
      <Table hover id="book-table">
        <thead>
          <tr>
            <th>Read</th>
            <th>Title</th>
            <th>Author</th>
            <th>Rating</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {props.books.map((book) => {
            return (
              <tr>
                <td className="isread">
                  <input
                    className="tickbox"
                    type="checkbox"
                    checked={book.isread}
                    disabled={true}
                  />
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
                <td>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      color: "darkgray",
                    }}
                  >
                    &#10060;
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
