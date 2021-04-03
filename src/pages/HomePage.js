import React from "react";
import { useHistory } from "react-router-dom";
import { Table, Input } from "reactstrap";
import Tickbox from "../elements/Tickbox.js";
import CustomNavbar from "../components/CustomNavbar";
import "../styles/HomePage.css";

export default function HomePage() {
  const history = useHistory();

  return (
    <div>
      <CustomNavbar />

      <div className="content">
        <Table hover>
          <thead>
            <tr>
              <th>Read</th>
              <th>Title</th>
              <th>Author</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="isread" scope="row">
                <Tickbox />
              </td>
              <td className="title">War & Peace</td>
              <td className="author">Leo Tolstoy</td>
              <td className="rating">10</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
