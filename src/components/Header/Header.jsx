import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import "./Header.css";

const Header = ({ searchQuery, handleSearchChange }) => {
    return (
        <header className="main-header">

            <h1 className="title boujee-text">Gradients CSS</h1>
            <p className="content-of-title">
                🎨 Gradients CSS is a website that provides a collection of beautiful
                <br />
                gradient color combinations for designers and developers to use in
                their
                <br />
                projects. The website is easy to use and allows users to copy
                <br />
                the CSS code for the selected gradient with just one click. 💻
            </p>
            <div className="searchInput">
                <div className="input__container">
                    <div className="shadow__input" />
                    <button className="input__button__shadow">
                        <SearchIcon />
                    </button>
                    <input
                        onChange={handleSearchChange}
                        value={searchQuery}
                        placeholder="Search By Name"
                        type="text"
                        name="text"
                        className="input__search"
                    />
                </div>
            </div>

        </header>
    );
};

export default Header;