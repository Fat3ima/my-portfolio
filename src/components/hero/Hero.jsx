// STYLE
import "./Hero.css";

// REACT
import { useContext, useMemo } from "react";

// COMPONENT
import PortfolioDataContext from "../../contexts/PortfolioDataContext";
import PortfolioSettingsContext from "../../contexts/PortfolioSettingsContext";

// MATERIAL UI
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CircleIcon from "@mui/icons-material/Circle";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Divider from "@mui/material/Divider";

// EXTERNAL
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// ANIMATIONS
const fromBottom = (delay = 0) => ({
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "linear", delay },
  },
});

const fromTop = (delay = 0) => ({
  hidden: { opacity: 0, y: -15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "linear", delay },
  },
});

// MAIN COMPONENT
export default function Hero() {
  // VARIABLE ===================================>
  const theme = useTheme();
  const portfolioData = useContext(PortfolioDataContext);
  const portfolioSettings = useContext(PortfolioSettingsContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const skillsList = useMemo(() => {
    return portfolioData.skills.map((skill) => (
      <Typography
        key={skill.id}
        variant="body1"
        sx={{
          color: theme.palette.text.secondary,
          fontFamily: portfolioSettings.fontType,
          fontSize: "12px",
        }}
      >
        {skill.title}
      </Typography>
    ));
  }, [portfolioData.skills, portfolioSettings.fontType, theme]);
  // <=================================== VARIABLE

  // COMPONENT ===================================>
  return (
    <Container
      id="home"
      maxWidth="md"
      sx={{ background: theme.palette.background.default, overflow: "hidden" }}
    >
      <Grid
        container
        spacing={1}
        sx={{ height: "100%", marginTop: "100px", alignItems: "end" }}
      >
        {/* RIGHT CONTENTS */}
        <Grid
          size={{ xs: 12, sm: 8, md: 8 }}
          sx={{ order: { xs: 2, sm: 1, md: 1 } }}
        >
          <Stack spacing={1.2}>
            {/* BUTTON */}
            <motion.div
              variants={fromBottom(0)}
              initial="hidden"
              animate="visible"
            >
              <Button
                variant="outlined"
                startIcon={
                  <CircleIcon
                    className="point"
                    sx={{ color: theme.palette.primary.main }}
                  />
                }
                sx={{
                  width: "200px",
                  fontFamily: portfolioSettings.fontType,
                  fontSize: "12px",
                  textTransform: "capitalize",
                  fontWeight: "400",
                  borderRadius: "20px",
                  color: theme.palette.text.primary,
                  direction: "ltr",
                }}
              >
                {t("hero.badge")}
              </Button>
            </motion.div>

            {/* NAME */}
            <motion.div
              variants={fromBottom(0.3)}
              initial="hidden"
              animate="visible"
            >
              <Typography
                variant="h2"
                sx={{
                  color: theme.palette.text.primary,
                  fontFamily: portfolioSettings.fontType,
                }}
              >
                {t("hero.greeting")}
                <span
                  style={{
                    textTransform: "uppercase",
                    color: theme.palette.primary.main,
                    fontWeight: "600",
                    fontFamily: portfolioSettings.fontType,
                    textTransform: "capitalize"
                  }}
                >
                  {t(`navbar.${portfolioData.name}`)}
                </span>
              </Typography>
            </motion.div>

            {/* MAJOR */}
            <motion.div
              variants={fromBottom(0.6)}
              initial="hidden"
              animate="visible"
            >
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.text.primary,
                  fontFamily: portfolioSettings.fontType,
                  maxWidth: "460px",
                  fontSize: "30px",
                }}
              >
                {t("hero.subtitle")}
              </Typography>
            </motion.div>

            {/* DESCRIPTION */}
            <motion.div
              variants={fromBottom(0.9)}
              initial="hidden"
              animate="visible"
            >
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontFamily: portfolioSettings.fontType,
                  fontSize: "13px",
                  fontWeight: "300",
                  maxWidth: "400px",
                }}
              >
                {t("hero.description")}
              </Typography>
            </motion.div>

            {/* BUTTONS */}
            <motion.div
              variants={fromBottom(1.2)}
              initial="hidden"
              animate="visible"
            >
              <Stack
                direction="row"
                spacing={2}
                sx={{ direction: "ltr", justifySelf: "start" }}
              >
                <Button
                  onClick={() => navigate("/work")}
                  variant="contained"
                  startIcon={<ArrowOutwardIcon />}
                >
                  {t("hero.viewWorkBtn")}
                </Button>
                <Button
                  variant="outlined"
                  endIcon={<ArrowDownwardIcon />}
                  component="a"
                  href="/cv/Fatima_Shamal_CV.pdf"
                  download="Fatima_Shamal_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("hero.downloadCvBtn")}
                </Button>
              </Stack>
            </motion.div>
          </Stack>
        </Grid>

        {/* LEFT CONTENTS */}
        <Grid
          size={{ xs: 8, sm: 4, md: 4 }}
          sx={{ order: { xs: 1, sm: 2, md: 2 } }}
        >
          <motion.div
            variants={fromTop(1.5)}
            initial="hidden"
            animate="visible"
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "relative",
                background: `radial-gradient(circle, ${theme.palette.primary.main}, 10%, #000000ab, transparent)`,
              }}
            >
              <img
                alt="Profile"
                src="images/profileImage.png"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
              <Box
                className="skill"
                sx={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "40px",
                  height: "40px",
                }}
              >
                <img
                  alt="HTML"
                  src="icons/html.png"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Box
                className="skill"
                sx={{
                  position: "absolute",
                  top: "100px",
                  left: "-10px",
                  width: "40px",
                  height: "40px",
                }}
              >
                <img
                  alt="CSS"
                  src="icons/css.png"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Box
                className="skill"
                sx={{
                  position: "absolute",
                  top: "100px",
                  right: "-10px",
                  width: "50px",
                  height: "50px",
                }}
              >
                <img
                  alt="JS"
                  src="icons/js.png"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Box
                className="skill"
                sx={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  width: "40px",
                  height: "40px",
                }}
              >
                <img
                  alt="Node JS"
                  src="icons/node-js.png"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Box
                className="skill"
                sx={{
                  position: "absolute",
                  top: "-40px",
                  right: "40%",
                  transform: "translateX(-40%)",
                  width: "40px",
                  height: "40px",
                }}
              >
                <img
                  alt="React"
                  src="icons/react.png"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Box>
          </motion.div>
        </Grid>
      </Grid>

      <Divider sx={{ margin: "50px 0 20px 0" }} />
      <Box sx={{ direction: "ltr" }}>
        <Stack
          sx={{ textAlign: "center" }}
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          {skillsList}
        </Stack>
      </Box>
      <Divider sx={{ margin: "20px 0 50px 0" }} />
    </Container>
  );
  // <=================================== COMPONENT
}
