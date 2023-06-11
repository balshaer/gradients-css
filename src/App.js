import React, { useEffect, useState } from "react";
import { Container, Tooltip } from "@mui/material";
import ReactPaginate from 'react-paginate';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "normalize.css";
import logo from './images/logo2.png';
import './App.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [gradients, setGradients] = useState([]);
  const [filteredGradients, setFilteredGradients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [autoprefixerChecked, setAutoprefixerChecked] = useState(false); // New state variable for autoprefixer checkbox

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json")
      .then((response) => response.json())
      .then((data) => {
        setGradients(data);
        setFilteredGradients(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching gradients:", error);
      });
  }, []);

  useEffect(() => {
    const filtered = gradients.filter((gradient) => {
      const gradientName = gradient.name.toLowerCase();
      const filterValue = selectedFilter.toLowerCase();
      if (selectedFilter === "All") {
        return gradientName.includes(searchQuery.toLowerCase());
      } else {
        return (
          gradientName.includes(searchQuery.toLowerCase()) &&
          gradientName.includes(filterValue)
        );
      }
    });
    setFilteredGradients(filtered);
  }, [searchQuery, gradients, selectedFilter]);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  const handleAutoprefixerChange = (event) => { // New function to handle checkbox change
    setAutoprefixerChecked(event.target.checked);
  };


  useEffect(() => {
    var AutoprefixerCheckbox = document.getElementById('AutoprefixerCheckbox')

    if (AutoprefixerCheckbox.checked) {
      console.log('Checking Autoprefixer');
    }

    else {
      console.log('No Autoprefixer');
    }

  })

  const gradientsPerPage = 10;
  const offset = currentPage * gradientsPerPage;
  const paginatedGradients = filteredGradients.slice(
    offset,
    offset + gradientsPerPage
  );

  const prefixer = autoprefixerChecked ? `-webkit-,-moz-,-o-,-ms-` : ''; // Add prefixes if checkbox is checked

  const currentYear = new Date().getFullYear();

  return (
    <Container maxWidth="lg">
      <Toaster
        position="bottom-right"
        reverseOrder={false} />
      <div className="App dark-mode">
        {loading ? (
          <main className="preloader">
            <div className="colorful"></div>
          </main>
        ) : null}

        <header className="mainHeader animate__animated animate__fadeIn">
          <div className="githubButtonDiv animate__animated animate__fadeIn">
            <a href="https://github.com/Baraasher/gradients" target="_blank">

              <Tooltip title="ADD STAR⭐">
                <button className="githubButton">

                  <GitHubIcon fontSize="large" />

                  <p class="text">Github</p>
                </button>

              </Tooltip>
            </a>
          </div>
          <div id="world"></div>
          <h1 className="title boujee-text">
            Gradients CSS
          </h1>
          <p className="contentOftitle">
            🎨Gradients CSS is a website that provides a collection of beautiful<br />
            gradient color combinations for designers and developers to use in their<br />
            projects. The website is easy to use and allows users to copy<br />
            the CSS code for the selected gradient with just one click. 💻
          </p>
          <div className="input__container__div">
            <div className="input__container">
              <div className="shadow__input"></div>
              <button className="input__button__shadow">

                <SearchIcon fontSize="large" sx={{ color: '#000' }} />
              </button>
              <input
                value={searchQuery}
                onChange={handleSearchChange}
                type="text"
                name="text"
                className="input__search"
                placeholder="Search by name"
              />
            </div>
          </div>


          <div className="flexRowCenterGap" id="checkElement">


            <label style={{ visibility: 'hidden' }} class="checkContainer">
              <input
                id="AutoprefixerCheckbox"
                checked={autoprefixerChecked}
                onChange={handleAutoprefixerChange}
                color="primary"
                inputProps={{ 'aria-label': 'Autoprefixer checkbox' }}
                type="checkbox" />
              <div className="checkmark">

                <LanguageIcon fontSize="large" />

              </div>
            </label>




          </div>

        </header>


        <section className="gradientCards">
          {paginatedGradients.length === 0 ? (
            <p className="noGradientsText">There are no gradients with that name. <img width="24" height="24" src="https://img.icons8.com/nolan/64/1A6DFF/C822FF/cancel-2.png" alt="cancel-2" /></p>
          ) : (
            paginatedGradients.map((gradient) => (
              <div className="gradientCardDiv">
                <h3 className="gradientName"
                  style={{
                    marginBottom: "10px",
                    fontWeight: "bold",
                    fontSize: "18px",
                    textAlign: "left"
                  }}
                >
                  {gradient.name}
                </h3>
                <Tooltip title="COPY CSS ⭐">
                  <button
                    id="copyButton"
                    onClick={() => {
                      const gradientCSS = `background: ${gradient.colors[0]};\nbackground: ${prefixer}linear-gradient(90deg, ${gradient.colors[0]} 16%, ${gradient.colors[1]} 44%, ${gradient.colors[2]} 100%);`; // Add prefixer to gradient CSS
                      navigator.clipboard.writeText(gradientCSS);
                      toast('Copied!', {
                        icon: '🎉',
                      });
                    }}
                  >
                    <ContentCopyIcon className="ContentCopyIcon" />
                  </button>
                </Tooltip>
                <div
                  key={gradient.name}
                  className="gradientCard animate__animated animate__fadeIn"
                  style={{
                    background: `${prefixer}linear-gradient(${gradient.colors.join(", ")})`, // Add prefixer to background CSS
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    borderRadius: "10px",
                    padding: "20px",
                    marginBottom: "20px",
                    color: "var(--color-headline)",
                  }}
                >
                </div>
                <div className="gradientCardDivHeader">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: gradient.colors[0],
                        marginRight: "10px",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: gradient.colors[1],
                        marginRight: "10px",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: gradient.colors[2],
                        marginRight: "10px",
                      }}
                    ></div>
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    {gradient.colors[0]}, {gradient.colors[1]}, {gradient.colors[2]}
                  </p>
                </div>
              </div>
            ))
          )}
        </section>


        <footer className="mainFooter">
          <div className="ReactPaginate">
            {/* Pagination */}
            <ReactPaginate
              previousLabel={<FiChevronLeft />}
              nextLabel={<FiChevronRight />}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={Math.ceil(filteredGradients.length / gradientsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>
          <div>
            {/* Logo and developer information */}
            <aside>
              <img loading="lazy" style={{ margin: '0 1rem' }} height={40} width={40} src={logo} alt="logo" />
              <p className="footerText">Developed by <a target="_blank" rel="noopener noreferrer" href="https://alsher.vercel.app/">Baraa</a></p>
            </aside>

            {/* Copyright */}
            <aside>
              <div className="copyright">
                <p>&copy; {currentYear} Baraa. All rights reserved.</p>
              </div>
            </aside>
          </div>
        </footer>
      </div >
    </Container >
  );
}
export default App;
