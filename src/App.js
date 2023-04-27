import { Helmet } from "react-helmet";
import "./App.css"; // Import global styles
import "normalize.css"; // Import Normalize.css
import alertify from "alertifyjs"; // Import alertify.js library
import "alertifyjs/build/css/alertify.css"; // Import alertify.js CSS
import { LinearGradient } from 'react-text-gradients'
import { useEffect, useState } from "react";

// First, we will wait for the page to finish loading
window.addEventListener('load', function () {
  // Then, we will find the preloader element
  const preloader = document.getElementById('preloader');
  // Finally, we will hide the preloader after a delay
  setTimeout(function () {
    preloader.style.display = 'none';
  }, 1000); // change the delay time as per your need
});
function App() {
  const [gradients, setGradients] = useState([]);
  const [filteredGradients, setFilteredGradients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch the gradients from the API
    fetch("https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json")
      .then((response) => response.json())
      .then((data) => {
        setGradients(data);
        setFilteredGradients(data);
      })
      .catch((error) => {
        console.error("Error fetching gradients:", error);
      });
  }, []);

  useEffect(() => {
    // Filter the gradients based on the search query
    const filtered = gradients.filter((gradient) =>
      gradient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGradients(filtered);
  }, [searchQuery, gradients]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      {/* Add font and CSS links to <head> */}
      <Helmet>
        <link href="https://api.fontshare.com/v2/css?f[]=chillax@500,300,400&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" />
      </Helmet>
      {/* Create main app container */}
      <div className="App animate__animated animate__fadeIn">
        {/* Preloader */}
        <div id="preloader">
          <div id="loader"></div>
        </div>
        {/* Create header section */}
        <header className="mainHeader">
          <div id="world">
          
          </div>
          <h1 className="title">
            
          <LinearGradient gradient={['to left', '#17acff ,#ff68f0']}>
          Gradients CSS
  </LinearGradient>
            
            
            </h1>
          <p className="contentOftitle">
            {/* Add line breaks to content */}
            🎨Gradients CSS is a website that provides a collection of beautiful<br />
            gradient color combinations for designers and developers to use in their<br />
            projects. The website is easy to use and allows users to copy<br />
            the CSS code for the selected gradient with just one click. 💻
          </p>


            {/* Add search input */}
      


<div class="input__container">
  <div class="shadow__input"></div>
  <button class="input__button__shadow">
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="20px" width="20px">
      <path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z" fill-rule="evenodd" fill="#17202A"></path>
    </svg>
  </button>
  <input   value={searchQuery}
            onChange={handleSearchChange}  type="text" name="text" class="input__search" placeholder="What do you want to search?"/>
</div>
        </header>
        <section className="gradientCards">
        {/* ... */}
        {filteredGradients.map((gradient) => (
            <div
              key={gradient.name}
              className="gradientCard"
              onClick={() => {
                navigator.clipboard.writeText(gradient.colors.join(", "));
                alertify.success("Copied!🎉");
              }}
              style={{
                background: `linear-gradient(${gradient.colors.join(", ")})`,
              }}
            ></div>
          ))}
        {/* ... */}
        



          {/* Create footer section */}
          <footer className="mainFooter">
            <p className="footerText">Developed by <a target="_blank" href="https://alsher.vercel.app/">Baraa</a></p>
          </footer>
        </section>
      </div>
    </>
  );
}
export default App;
