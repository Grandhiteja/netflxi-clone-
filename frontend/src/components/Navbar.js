import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./Navbar.css";

function Navbar() {
  const [show, handleShow] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__left">
        <img
          onClick={() => navigate("/")}
          className="nav__logo"
          style={{ cursor: "pointer" }}
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />
        <div className="nav__links">
          <span onClick={() => navigate("/")}>Home</span>
          <span onClick={() => navigate("/mylist")}>My List</span>
        </div>
      </div>
      <div className="nav__right">
        <form className="nav__search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Titles, people, genres"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>
        <img
          onClick={() => auth.signOut()}
          className="nav__avatar"
          style={{ cursor: "pointer" }}
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="Netflix Avatar"
        />
      </div>
    </div>
  );
}

export default Navbar;
