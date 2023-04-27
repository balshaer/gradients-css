import { Helmet } from "react-helmet";
import "./App.css"; // Import global styles
import "normalize.css"; // Import Normalize.css
import alertify from "alertifyjs"; // Import alertify.js library
import "alertifyjs/build/css/alertify.css"; // Import alertify.js CSS
import { LinearGradient } from 'react-text-gradients'

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
        </header>
        <section className="gradientCards">

          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #FBD3E9, #BB377D);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #FBD3E9, #BB377D)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #FEB692, #EA5455);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #FEB692, #EA5455)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #A3F7B5, #66FFA6);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #A3F7B5, #66FFA6)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #22E1FF, #1D8FE1, #625EB1);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #22E1FF, #1D8FE1, #625EB1)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #FFC3A0, #FFAFBD);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #FFC3A0, #FFAFBD)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #76b852, #8dc26f, #a7d182);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #76b852, #8dc26f, #a7d182)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #11998e, #38ef7d);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #11998e, #38ef7d)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #fc466b, #3f5efb);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #fc466b, #3f5efb)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #F1C40F, #F39C12);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #F1C40F, #F39C12)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #DA4453, #89216B);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #DA4453, #89216B)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #11998e, #38ef7d);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #11998e, #38ef7d)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #FEB692, #EA5455);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #FEB692, #EA5455)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #4b6cb7, #182848);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #4b6cb7, #182848)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #24C6DC, #514A9D);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #24C6DC, #514A9D)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #8E2DE2, #4A00E0);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #8E2DE2, #4A00E0)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #93a5cf, #e4efe9);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #93a5cf, #e4efe9)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #00c6ff, #0072ff);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #00c6ff, #0072ff)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #5c258d, #4389a2, #dcedc2);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #5c258d, #4389a2, #dcedc2)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #fc4a1a, #f7b733);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #fc4a1a, #f7b733)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #ee9ca7, #ffdde1);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #ee9ca7, #ffdde1)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #C02425, #F0CB35);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #C02425, #F0CB35)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #F2B61F, #EC6868);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #F2B61F, #EC6868)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #00B4DB, #0083B0);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #00B4DB, #0083B0)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #A18CD1, #FBC2EB);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #A18CD1, #FBC2EB)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #0575E6, #021B79);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #0575E6, #021B79)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #96c93d, #000000);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #96c93d, #000000)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #f15f79, #b24592);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #f15f79, #b24592)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #eaafc8, #654ea3);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #eaafc8, #654ea3)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #ff0844, #ffb199);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #ff0844, #ffb199)" }}></div>
          <div className="gradientCard" onClick={() => { navigator.clipboard.writeText("background: linear-gradient(135deg, #f8c2c1, #ef9f9c, #f8c2c1);");alertify.success('Copied!🎉'); }} style={{ background: "linear-gradient(135deg, #f8c2c1, #ef9f9c, #f8c2c1)" }}></div>
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
