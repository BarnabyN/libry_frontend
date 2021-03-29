import React from "react";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";
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
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
