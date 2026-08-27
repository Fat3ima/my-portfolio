// STYLE
import "./About.css";

// REACT
import { useContext } from "react";

// COMPONENT
import PortfolioSettingsContext from "../../contexts/PortfolioSettingsContext";
import CarouselCard from "../../components/about/CarouselCard";
import TechStack from "../../components/about/TechStaach";

// MATERIAL UI
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// EXTERNAL
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// ANIMATIONS
const fromLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
  },
};

const fromRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.15 },
  },
};

const fromBottom = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.3 },
  },
};

const fromTop = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
  },
};

// MAIN COMPONENT
export default function About() {
  // VARIABLE ===================================>
  const theme = useTheme();
  const portfolioSettings = useContext(PortfolioSettingsContext);
  const {t, i18n} = useTranslation()
  // <=================================== VARIABLE

  // COMPONENT ===================================>
  return (
    <Container
      id="about"
      maxWidth="md"
      sx={{
        background: theme.palette.background.default,
        overflow: "hidden",
        marginTop: "30px",
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
        }}
      >
        {t('about.title')}
      </Divider>

      <Grid container spacing={4} sx={{ marginTop: "20px" }}>
        <Grid size={12}>
          <motion.div
            variants={fromBottom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: portfolioSettings.fontType,
                color: theme.palette.text.primary,
                maxWidth: "500px",
                fontSize: "40px",
                fontWeight: "600",
              }}
            >
              {t('about.heading')}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: portfolioSettings.fontType,
                color: theme.palette.text.secondary,
                maxWidth: "700px",
                fontSize: "13px",
                fontWeight: "300",
                marginTop: "20px",
              }}
            >
            { t('about.description')}
            </Typography>
          </motion.div>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <motion.div
            variants={fromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{ height: "100%" }}
          >
            <CarouselCard cardTitle="skills" />
          </motion.div>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <motion.div
            variants={fromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{ height: "100%" }}
          >
            <CarouselCard cardTitle="certificates" />
          </motion.div>
        </Grid>

        <Grid size={12}>
          <motion.div
            variants={fromBottom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <TechStack />
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
  // <=================================== COMPONENT
}
