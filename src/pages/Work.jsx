import { useContext, useState, useEffect } from "react";

import PortfolioSettingsContext from "../contexts/PortfolioSettingsContext";
import Projects from "../components/work/Projects";
import Writings from "../components/work/Writings";
import Courses from "../components/work/Courses";

import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Work() {
  const theme = useTheme();
  const portfolioSettings = useContext(PortfolioSettingsContext);
  const [activeTab, setActiveTab] = useState("projects");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();
  const isFullPage = location.pathname === "/work";

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // SHOW/HIDE SCROLL TOP BUTTON
  useEffect(() => {
    if (!isFullPage) return;
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFullPage]);

  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const buttonStyle = (tab) => ({
    fontFamily: portfolioSettings.fontType,
    textTransform: "capitalize",
    fontSize: "13px",
    fontWeight: "400",
    flex: 1,
    border: `1px solid ${
      activeTab === tab
        ? theme.palette.primary.main
        : theme.palette.text.secondary
    }`,
    color:
      activeTab === tab
        ? theme.palette.primary.main
        : theme.palette.text.primary,
    background:
      activeTab === tab ? `${theme.palette.primary.main}10` : "transparent",
    transition: "all 0.3s ease",
  });

  // ============ FULL PAGE /work ============
  if (isFullPage) {
    return (
      <Box
        sx={{
          background: theme.palette.background.default,
          minHeight: "100vh",
          paddingBottom: "60px",
        }}
      >
        {/* TOP BAR */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: `${theme.palette.background.default}ee`,
            backdropFilter: "blur(12px)",
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 24px",
              direction: "ltr"
            }}
          >
            {/* BACK BUTTON */}
            <Stack direction={"row"} spacing={1} sx={{ alignItems: "center", }}>
              <IconButton
                size="small"
                onClick={() => navigate("/")}
                sx={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  border: `1px solid ${theme.palette.divider}`,
                  color: theme.palette.text.secondary,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    border: `1px solid ${theme.palette.primary.main}`,
                    color: theme.palette.primary.main,
                    background: `${theme.palette.primary.main}10`,
                  },
                }}
              >
                <ArrowBackIcon sx={{ fontSize: "16px" }} />
              </IconButton>
              <Typography
                sx={{
                  fontFamily: portfolioSettings.fontType,
                  fontSize: "13px",
                  fontWeight: "400",
                  color: theme.palette.text.secondary,
                  cursor: "pointer",
                  "&:hover": { color: theme.palette.text.primary },
                }}
                onClick={() => navigate("/")}
              >
                {t("work.backHome")}
              </Typography>
            </Stack>

            {/* LOGO */}
            <Typography
              sx={{
                fontFamily: portfolioSettings.fontType,
                fontSize: "16px",
                fontWeight: "700",
                color: theme.palette.text.primary,
              }}
            >
              {t("navbar.fatima")}
              <Box component="span" sx={{ color: theme.palette.primary.main }}>
                .
              </Box>
            </Typography>
          </Container>
        </Box>

        {/* CONTENT */}
        <Container maxWidth="md" sx={{ paddingTop: "40px" }}>
          <Box sx={{ marginBottom: "2rem" }}>
            <Typography
              sx={{
                fontFamily: portfolioSettings.fontType,
                fontSize: "10px",
                fontWeight: "600",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: theme.palette.primary.main,
                marginBottom: "8px",
              }}
            >
              {t('work.sectionSubtitle')}
            </Typography>
            <Typography
              sx={{
                fontFamily: portfolioSettings.fontType,
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: "700",
                color: theme.palette.text.primary,
                letterSpacing: "-1px",
                lineHeight: 1.1,
              }}
            >
              {t("work.mainHeading")}
            </Typography>
          </Box>

          {/* TABS */}
          <Stack direction={"row"} spacing={1} sx={{ marginBottom: "30px", direction: "ltr" }}>
            <Button
              sx={buttonStyle("projects")}
              onClick={() => setActiveTab("projects")}
            >
              {t("work.projects")}
            </Button>
            <Button
              sx={buttonStyle("writings")}
              onClick={() => setActiveTab("writings")}
            >
              {t("work.writings")}
            </Button>
            <Button
              sx={buttonStyle("courses")}
              onClick={() => setActiveTab("courses")}
            >
              {t("work.courses")}
            </Button>
          </Stack>

          {activeTab === "projects" && <Projects />}
          {activeTab === "writings" && <Writings />}
          {activeTab === "courses" && <Courses />}
        </Container>

        {/* SCROLL TO TOP FAB */}
        <Fab
          size="small"
          onClick={handleScrollTop}
          sx={{
            position: "fixed",
            bottom: "28px",
            right: "28px",
            background: showScrollTop
              ? theme.palette.primary.main
              : "transparent",
            border: `1px solid ${showScrollTop ? theme.palette.primary.main : theme.palette.divider}`,
            color: showScrollTop ? "#080808" : theme.palette.text.secondary,
            boxShadow: "none",
            opacity: showScrollTop ? 1 : 0,
            transform: showScrollTop ? "translateY(0)" : "translateY(16px)",
            pointerEvents: showScrollTop ? "all" : "none",
            transition: "all 0.3s ease",
            "&:hover": {
              background: theme.palette.secondary.main,
              boxShadow: "none",
            },
          }}
        >
          <KeyboardArrowUpIcon sx={{ fontSize: "20px" }} />
        </Fab>
      </Box>
    );
  }

  // ============ HOME PAGE PREVIEW ============
  return (
    <Container
      id="work"
      maxWidth="md"
      sx={{
        background: theme.palette.background.default,
        marginTop: "80px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Divider
        textAlign="left"
        sx={{
          color: theme.palette.primary.main,
          fontFamily: portfolioSettings.fontType,
          fontSize: "13px",
          textTransform: "uppercase",
          fontWeight: "500",
          flexShrink: 0,
        }}
      >
        {t("work.sectionSubtitle")}{" "}
      </Divider>

      <Stack
        direction={"row"}
        spacing={1}
        sx={{ justifyContent: "center", margin: "25px 0", flexShrink: 0, direction: "ltr" }}
      >
        <Button
          sx={buttonStyle("projects")}
          onClick={() => setActiveTab("projects")}
        >
          {t("work.projects")}
        </Button>
        <Button
          sx={buttonStyle("writings")}
          onClick={() => setActiveTab("writings")}
        >
          {t("work.writings")}
        </Button>
        <Button
          sx={buttonStyle("courses")}
          onClick={() => setActiveTab("courses")}
        >
          {t("work.courses")}{" "}
        </Button>
      </Stack>

      {/* PREVIEW + FADE */}
      <Box
        sx={{
          position: "relative",
          height: "420px",
          overflow: "hidden",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "160px",
            background: `linear-gradient(to bottom, transparent, ${theme.palette.background.default})`,
            pointerEvents: "none",
            zIndex: 1,
          },
        }}
      >
        {activeTab === "projects" && <Projects />}
        {activeTab === "writings" && <Writings />}
        {activeTab === "courses" && <Courses />}
      </Box>

      {/* VIEW ALL */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "40px",
          marginTop: "-20px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Button
          endIcon={<ArrowOutwardIcon sx={{ fontSize: "14px" }} />}
          onClick={() => navigate("/work")}
          size="small"
          sx={{
            fontFamily: portfolioSettings.fontType,
            textTransform: "capitalize",
            fontSize: "12px",
            fontWeight: "400",
            color: theme.palette.text.secondary,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: "20px",
            padding: "6px 22px",
            transition: "all 0.2s ease",
            "&:hover": {
              border: `1px solid ${theme.palette.primary.main}`,
              color: theme.palette.primary.main,
              background: `${theme.palette.primary.main}08`,
            },
          }}
        >
          {t("work.viewAll")}{" "}
        </Button>
      </Box>
    </Container>
  );
}
