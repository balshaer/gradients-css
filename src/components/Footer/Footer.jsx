import React from "react";
import { User } from "@nextui-org/react";
import "./Footer.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const githubUsername = "Baraasher";
    const githubProfileImage = `https://github.com/${githubUsername}.png`;

    const handleOnClick = () => {
        window.location.href = "https://alsher.vercel.app/";
    };

    return (
        <footer className="mainFooter" style={{ marginTop: "3rem" }}>
            <div onClick={handleOnClick} className="footerUser">
                <User src={githubProfileImage}>
                    <User.Link style={{ color: "white" }}>
                        <span style={{ cursor: "pointer" }}>@{githubUsername}</span>
                    </User.Link>
                </User>
            </div>
            <div className="copyright">
                <p style={{ color: "white", fontSize: "12px" }}>
                    © {currentYear} Baraa. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;