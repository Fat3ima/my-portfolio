// STYLE

// REACT
import { useContext, useState, useEffect, useRef } from "react";

import PortfolioDataContext from "../../contexts/PortfolioDataContext";
import PortfolioSettingsContext from "../../contexts/PortfolioSettingsContext";
import Skills from "./Skills";
import Certificates from "./Certificates";

// MATERIAL UI
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

// DATA

// MAIN COMPONENT
export default function CarouselCard({ cardTitle }) {
  // VARIABLE ===================================>
  const theme = useTheme();
  const portfolioData = useContext(PortfolioDataContext);
  const portfolioSettings = useContext(PortfolioSettingsContext);

  const isSkills = cardTitle === "skills";
  const iconSrc = isSkills ? "icons/lighting.png" : "icons/mortarboard.png";
  const total = isSkills
    ? portfolioData.skills.length
    : portfolioData.certificates.length;

  const accentColor = isSkills
    ? theme.palette.primary.main
    : theme.customColors.moreColor;
  const accentBorder = isSkills
    ? "1px solid rgba(200,255,0,0.2)"
    : "1px solid rgba(99,153,255,0.2)";
  const accentBg = isSkills ? "rgba(200,255,0,0.08)" : "rgba(99,153,255,0.1)";

  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  // <=================================== VARIABLE

  // FUNCTION ===================================>
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 3000);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    startTimer();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
    resetTimer();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    resetTimer();
  };

  const handleDot = (i) => {
    setCurrentIndex(i);
    resetTimer();
  };
  // <=================================== FUNCTION

  // EFFECT ===================================>
  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [total]);
  // <=================================== EFFECT

  // COMPONENT ===================================>
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "15px",
        background: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px",
          direction: "ltr"
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              height: "40px",
              width: "40px",
              background: accentBg,
              border: accentBorder,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
            }}
          >
            <img
              alt="card icon"
              src={iconSrc}
              style={{ width: "50%", height: "50%", objectFit: "contain" }}
            />
          </Box>
          <Typography
            sx={{
              color: theme.palette.text.primary,
              fontFamily: portfolioSettings.fontType,
              textTransform: "capitalize",
              fontSize: "15px",
              fontWeight: "600",
            }}
          >
            {cardTitle}
          </Typography>
        </Stack>

        <Typography
          sx={{
            color: accentColor,
            fontFamily: portfolioSettings.fontType,
            textTransform: "uppercase",
            fontSize: "9px",
            fontWeight: "600",
            borderRadius: "20px",
            padding: "4px 10px",
            border: accentBorder,
            background: accentBg,
            letterSpacing: "0.5px",
          }}
        >
          auto rotating
        </Typography>
      </Box>

      <Divider />

      {/* CONTENT */}
      <CardContent sx={{ padding: "15px", flex: 1, overflow: "hidden" }}>
        {isSkills ? (
          <Skills currentIndex={currentIndex} />
        ) : (
          <Certificates currentIndex={currentIndex} />
        )}
      </CardContent>

      <Divider />

      {/* FOOTER */}
      <CardActions
        sx={{
          padding: "10px 15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          direction: "ltr"
        }}
      >
        {/* DOTS */}
        <Stack direction="row" spacing={0.6} sx={{ alignItems: "center" }}>
          {Array.from({ length: total }).map((_, i) => (
            <Box
              key={i}
              onClick={() => handleDot(i)}
              sx={{
                width: i === currentIndex ? "14px" : "6px",
                height: "6px",
                borderRadius: i === currentIndex ? "3px" : "50%",
                background: i === currentIndex ? accentColor : "#252525",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </Stack>

        {/* ARROWS */}
        <Stack direction="row" spacing={1}>
          <Button
            onClick={handlePrev}
            sx={{
              minWidth: "32px",
              width: "32px",
              height: "32px",
              padding: 0,
              background: "#161616",
              border: "1px solid #252525",
              borderRadius: "6px",
              "&:hover": { borderColor: accentColor },
            }}
          >
            <ArrowBackIosIcon
              sx={{ fontSize: "11px", color: theme.palette.text.secondary }}
            />
          </Button>
          <Button
            onClick={handleNext}
            sx={{
              minWidth: "32px",
              width: "32px",
              height: "32px",
              padding: 0,
              background: "#161616",
              border: "1px solid #252525",
              borderRadius: "6px",
              "&:hover": { borderColor: accentColor },
            }}
          >
            <ArrowForwardIosIcon
              sx={{ fontSize: "11px", color: theme.palette.text.secondary }}
            />
          </Button>
        </Stack>
      </CardActions>

      {/* PROGRESS BAR */}
      <LinearProgress
        key={currentIndex}
        variant="determinate"
        value={((currentIndex + 1) / total) * 100}
        sx={{
          height: "2px",
          background: "#1a1a1a",
          "& .MuiLinearProgress-bar": {
            background: accentColor,
            transition: "value 0.3s ease",
          },
        }}
      />
    </Card>
  );
  // <=================================== COMPONENT
}
