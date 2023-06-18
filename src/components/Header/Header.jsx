import React from "react";
import { Tooltip } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";

const Header = ({ searchQuery, handleSearchChange }) => {
    return (
        <header className="main-header">
            <div className="github-button-div">
                <a
                    href="https://github.com/Baraasher/gradients"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Tooltip title="ADD STAR⭐">
                        <button className="githubButton">
                            <GitHubIcon fontSize="medium" />
                            <p className="text">GitHub</p>
                        </button>
                    </Tooltip>
                </a>
            </div>
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
