import "./App.css";

// REACT
import { useState, useMemo, useContext } from "react";

// MATERIAL UI
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

// COMPONENTS
import Navigation from "./components/menu/Navigation";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Work from "../src/pages/Work";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import { Route, Routes } from "react-router-dom";

// CONTEXT
import PortfolioDataContext from "./contexts/PortfolioDataContext";
import WorkContext from "./contexts/WorkContext";
import PortfolioSettingsContext from "./contexts/PortfolioSettingsContext";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#080808",
      paper: "#0f0f0f",
    },
    text: {
      primary: "#f0f0f0",
      secondary: "#666666",
    },
    primary: {
      main: "#c8ff00",
    },
    secondary: {
      main: "#a8e000",
    },
    divider: "#2a2a2a",
  },
  customColors: {
    hover: "#161616",
    moreColor: "#6399ff",
  },
});

function App() {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const portfolioData = useContext(PortfolioDataContext);
  const workData = useContext(WorkContext);

  const portfolioSettings = useMemo(
    () => ({
      fontType: lang === "en" ? "poppins" : "tajawal",
      lang: lang,
    }),
    [lang],
  );

  function handleLangChange() {
    const newLang = lang === "en" ? "ar" : "en";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  }

  return (
    <div className="App" dir={lang === "en" ? "ltr" : "rtl"}>
      <PortfolioSettingsContext value={portfolioSettings}>
        <PortfolioDataContext value={portfolioData}>
          <WorkContext value={workData}>
            <ThemeProvider theme={theme}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Navigation handleLangChange={handleLangChange} />
                      <Hero />
                      <About />
                      <Work />
                      <Contact />
                      <Footer />
                    </>
                  }
                />
                <Route path="/work" element={<Work />} />
              </Routes>
            </ThemeProvider>
          </WorkContext>
        </PortfolioDataContext>
      </PortfolioSettingsContext>
    </div>
  );
}

export default App;
