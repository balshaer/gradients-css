import { Helmet } from "react-helmet";
import "./App.css";
import "normalize.css";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { useEffect, useState, useMemo } from "react";
import ReactPaginate from 'react-paginate';
import logo from './images/logo2.png';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Container, Tooltip } from "@mui/material";
function App() {
  const [gradients, setGradients] = useState([]);
  const [filteredGradients, setFilteredGradients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
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
  const gradientsPerPage = 10;
  const offset = currentPage * gradientsPerPage;
  const paginatedGradients = filteredGradients.slice(
    offset,
    offset + gradientsPerPage
  );
  const filterOptions = [
    "All",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Purple",
    "Orange",
    "Pink",
  ];
  const currentYear = new Date().getFullYear();
  return (
    <Container maxWidth="lg">
      <Helmet>
        <link href="https://api.fontshare.com/v2/css?f[]=chillax@500,300,400&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" />
      </Helmet>
      <div className="App dark-mode">




        {loading ? (
     <main className="preloader">

     <div class="colorful"></div>

     </main>
        ) : null}
        <header className="mainHeader animate__animated animate__fadeIn">
          <div className="githubButtonDiv animate__animated animate__fadeIn">
            <a href="https://github.com/Baraasher/gradients" target="_blank">

            <Tooltip title="ADD STAR⭐">
              <button className="githubButton">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z" fill="white"></path>
                </svg>
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
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="20px" width="20px">
                  <path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z" fillRule="evenodd" fill="#17202A"></path>
                </svg>
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
          <div className="filter__container">
            <select
              id="filterSelect"
              value={selectedFilter}
              onChange={(event) => setSelectedFilter(event.target.value)}
              className="filter__select"
            >
              {filterOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </header>
        <section className="gradientCards">
          {paginatedGradients.map((gradient) => (
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
                  const gradientCSS = `background: ${gradient.colors[0]};\nbackground: linear-gradient(90deg, ${gradient.colors[0]} 16%, ${gradient.colors[1]} 44%, ${gradient.colors[2]} 100%);`;
                  navigator.clipboard.writeText(gradientCSS);
                  alertify.success("Copied!🎉");
                }}>
                <ContentCopyIcon className="ContentCopyIcon" />
              </button>
              </Tooltip>

              <div
                key={gradient.name}
                className="gradientCard animate__animated animate__fadeIn"
                style={{
                  background: `linear-gradient(${gradient.colors.join(", ")})`,
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
          ))}
        </section>
        <footer className="mainFooter">
          <div>
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
            <aside>
              <img loading="lazy" style={{ margin: '0 1rem' }} height={40} width={40} src={logo} alt="logo" />
              <p className="footerText">Developed by <a target="_blank" rel="noopener noreferrer" href="https://alsher.vercel.app/">Baraa</a></p>
            </aside>
            <aside >
              <div className="copyright">
                <p>&copy; {currentYear} Baraa. All rights reserved.</p>
              </div>
            </aside>
          </div>
        </footer>
      </div>
    </Container>
  );
}
export default App;