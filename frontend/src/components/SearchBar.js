import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search..."
        className="mr-sm2 ml-sm-5"
      >
        <Button type="submit" variant="outline-success" className="p-2">
          Search
        </Button>
      </Form.Control>
    </Form>
  );
};

export default SearchBar;
