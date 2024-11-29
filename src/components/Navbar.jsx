// src/components/Navbar.jsx
import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`); // Redirect to search results
    }
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="py-3">
      <Container>
        <Navbar.Brand href="/">AnimeStream</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/">Home</Nav.Link> */}
            <Link to="/" className="nav-link">
              Home
            </Link>
            {/* <Link to="/search" className="nav-link">
              Search
            </Link> */}
            {/* <Link to="/Page" className="nav-link">
              Page
            </Link> */}

            {/* Add more Nav Links as you build more pages */}
          </Nav>

          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search Anime..."
              className="me-2"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
