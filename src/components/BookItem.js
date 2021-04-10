import React from "react";
import {
  Row,
  Col,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "../styles/BookItem.css";
import "../constants.js";
import { dbstring } from "../constants.js";

export default function BookItem(props) {
  const [dropdownOpen, setOpen] = React.useState(false);

  var book = props.book;
  return (
    <Row className="bookitem-wrapper">
      <Col>
        <input
          className="tickbox"
          type="checkbox"
          checked={book.isread}
          disabled={true}
        />
      </Col>
      <Col>
        <input
          className="table-editable title"
          type="text"
          value={book.title}
          disabled={true}
        />
      </Col>
      <Col>
        <input
          className="table-editable author"
          type="text"
          value={book.author}
          disabled={true}
        />
      </Col>
      <Col>
        <input
          className="table-editable rating"
          type="text"
          value={book.rating}
          disabled={true}
        />
      </Col>

      <Col>
        <ButtonDropdown
          isOpen={dropdownOpen}
          toggle={(e) => setOpen(!dropdownOpen)}
        >
          <DropdownToggle id="dropdown-toggle" tag="button">
            &#8942;
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Edit</DropdownItem>
            <DropdownItem>Delete</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </Col>
    </Row>
  );
}
