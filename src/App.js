import { Helmet } from "react-helmet";
import "./App.css";
import "normalize.css";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import ReactPaginate from 'react-paginate';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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

  return (
    <>
      <Helmet>
        <link href="https://api.fontshare.com/v2/css?f[]=chillax@500,300,400&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" />
      </Helmet>
      <div className="App dark-mode">
        {loading ? (
          <div className="preloader">
            <ClipLoader color="#17acff" size={50} />
          </div>
        ) : null}
        <header className="mainHeader">
          <div id="world"></div>
          <h1 className="title">
            Gradients CSS
          </h1>
          <p className="contentOftitle">
            🎨Gradients CSS is a website that provides a collection of beautiful<br />
            gradient color combinations for designers and developers to use in their<br />
            projects. The website is easy to use and allows users to copy<br />
            the CSS code for the selected gradient with just one click. 💻
          </p>
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
              placeholder="Search by the name?"
            />
         
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
            <div
              key={gradient.name}
              className="gradientCard"
              onClick={() => {
                const gradientCSS = `background: ${gradient.colors[0]};\nbackground: linear-gradient(90deg, ${gradient.colors[0]} 16%, ${gradient.colors[1]} 44%, ${gradient.colors[2]} 100%);`;
                navigator.clipboard.writeText(gradientCSS);
                alertify.success("Copied!🎉");
              }}
              style={{
                background: `linear-gradient(${gradient.colors.join(", ")})`,
              }}
            ></div>
          ))}
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
        </section>
        <footer className="mainFooter">
          <p className="footerText">Developed by <a target="_blank" rel="noopener noreferrer" href="https://alsher.vercel.app/">Baraa</a></p>
        </footer>
      </div>
  
    </>
  );
}

export default App;
