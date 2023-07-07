import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoNotDisturbIcon from '@mui/icons-material/ErrorOutline';
import { Tooltip } from "@mui/material";
import { Pagination } from "@nextui-org/react";
import "alertifyjs/build/css/alertify.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "../Header/Header";
import "./Gradients.css";

const Gradients = () => {
  const [gradients, setGradients] = useState([]);
  const [filteredGradients, setFilteredGradients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(-1);
  let timeout;

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json"
    )
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
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  const gradientsPerPage = 12;
  const offset = currentPage * gradientsPerPage;
  const paginatedGradients = filteredGradients.slice(
    offset,
    offset + gradientsPerPage
  );

  const handleCopyButtonClick = (gradientCSS, index) => {
    navigator.clipboard.writeText(gradientCSS);
    toast('Copied!', {
      icon: '🎉',
    });

    setClickedIndex(index);

    timeout = setTimeout(() => {
      setClickedIndex(-1);
    }, 3000);
  };

  return (
    <section>
      <Header searchQuery={searchQuery} handleSearchChange={handleSearchChange} />

      <div className="Gradients dark-mode">
        <section className="gradientCards">
          {paginatedGradients.length === 0 ? (
            <div id="searchMessage">
              <p className="noGradientsText">There are no gradients with that name.</p>
              <span>
                <DoNotDisturbIcon sx={{ color: "rgb(148, 161, 178)" }} fontSize="large" />
              </span>
            </div>
          ) : (
            paginatedGradients.map((gradient, index) => (
              <div className="gradientCardDiv" key={gradient.name}>
                <h3 className="gradientName">
                  {gradient.name}
                </h3>
                <Tooltip title="COPY CSS ⭐">
                  <button
                    id="copyButton"
                    onClick={() => {
                      const gradientCSS = `background: ${gradient.colors[0]};\nbackground: linear-gradient(90deg, ${gradient.colors[0]} 16%, ${gradient.colors[1]} 44%, ${gradient.colors[2]} 100%);`;
                      handleCopyButtonClick(gradientCSS, index);
                    }}
                  >
                    {clickedIndex === index ? (
                      <CheckIcon className="ContentCopyIcon animate__animated animate__fadeIn" id="ContentCopyIcon" />
                    ) : (
                      <ContentCopyIcon className="ContentCopyIcon" id="ContentCopyIcon" />
                    )}
                  </button>
                </Tooltip>
                <div
                  className="gradientCard animate__animated animate__fadeIn"
                  style={{
                    background: `linear-gradient(${gradient.colors.join(", ")})`,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    borderRadius: "10px",
                    padding: "20px",
                    marginBottom: "20px",
                    color: "var(--color-headline)",
                  }}
                ></div>
                <div className="gradientCardDivHeader">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    {gradient.colors.map((color, index) => (
                      <div
                        key={index}
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background: color,
                          marginRight: "10px",
                        }}
                      ></div>
                    ))}
                  </div>
                  <p style={{ fontSize: "14px" }}>
                    {gradient.colors.join(", ")}
                  </p>
                </div>
              </div>
            ))
          )}
        </section>
        <div className="ReactPaginate">
          <Pagination
            rounded
            total={Math.ceil(filteredGradients.length / gradientsPerPage)}
            initialPage={currentPage}
            onChange={(selectedPage) => setCurrentPage(selectedPage)}
          />
        </div>
      </div>
    </section>
  );
};

export default Gradients;
