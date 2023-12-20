import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import "./Header.css";

const Header = ({ searchQuery, handleSearchChange }) => {
    return (
        <header className="main-header">

            <h1 className="title boujee-text">Gradients CSS</h1>
            <p className="content-of-title">
              The collection of CSS gradients. Simply click the 'Copy' button 
    <br />
to acquire and seamlessly integrate these gradients into your project
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
