// STYLE

// REACT
import { useContext } from "react";

// COMPONENT
import PortfolioDataContext from "../../contexts/PortfolioDataContext";
import PortfolioSettingsContext from "../../contexts/PortfolioSettingsContext";

// MATERIAL UI
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// EXTERNAL
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// ANIMATIONS
const fromBottom = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

// MAIN COMPONENT
export default function Footer() {
  // VARIABLE ===================================>
  const theme = useTheme();
  const portfolioData = useContext(PortfolioDataContext);
  const portfolioSettings = useContext(PortfolioSettingsContext);
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const navLinks = [
    { title: t("footer.nav.home"), id: "home" },
    { title: t("footer.nav.about"), id: "about" },
    { title: t("footer.nav.work"), id: "work" },
    { title: t("footer.nav.contact"), id: "contact" },
  ];

  const socialLinks = [
    {
      icon: <GitHubIcon sx={{ fontSize: "16px" }} />,
      href: portfolioData.socialLink.gitHup,
      label: "GitHub",
    },
    {
      icon: <LinkedInIcon sx={{ fontSize: "16px" }} />,
      href: portfolioData.socialLink.linkedin,
      label: "LinkedIn",
    },
    {
      icon: <TwitterIcon sx={{ fontSize: "16px" }} />,
      href: portfolioData.socialLink.x,
      label: "Twitter",
    },
    {
      icon: <EmailIcon sx={{ fontSize: "16px" }} />,
      href: `mailto:${portfolioData.socialLink.eimal}`,
      label: "Email",
    },
  ];

  const linkStyle = {
    fontFamily: portfolioSettings.fontType,
    fontSize: "12px",
    fontWeight: "400",
    color: theme.palette.text.secondary,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    transition: "color 0.2s ease",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: "0",
    textAlign: isAr ? "right" : "left",
    "&:hover": {
      color: theme.palette.text.primary,
    },
  };
  // <=================================== VARIABLE

  // FUNCTION ===================================>
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // <=================================== FUNCTION

  // COMPONENT ===================================>
  return (
    <Box
      id="footer"
      component="footer"
      dir={isAr ? "rtl" : "ltr"}
      sx={{
        background: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: "60px",
      }}
    >
      <motion.div
        variants={fromBottom}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* MAIN GRID */}
        <Grid
          container
          spacing={4}
          sx={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: {
              xs: "2rem 1.25rem 1.5rem",
              sm: "2.5rem 1.75rem 1.75rem",
              md: "3rem 2rem 2rem",
            },
          }}
        >
          {/* COL 1 — BRAND */}
          <Grid size={{ xs: 12, sm: 5, md: 5 }}>
            <Typography
              sx={{
                fontFamily: portfolioSettings.fontType,
                fontSize: "20px",
                fontWeight: "800",
                color: theme.palette.text.primary,
                letterSpacing: "-0.5px",
                marginBottom: "10px",
                textAlign: isAr ? "right" : "left",
              }}
            >
              {portfolioData.name}
              <Box component="span" sx={{ color: theme.palette.primary.main }}>
                .
              </Box>
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontFamily: portfolioSettings.fontType,
                fontSize: "12px",
                fontWeight: "300",
                color: theme.palette.text.secondary,
                lineHeight: 1.7,
                maxWidth: "240px",
                marginBottom: "1.25rem",
                textAlign: isAr ? "right" : "left",
              }}
            >
              {t("footer.brandDesc")}
            </Typography>

            <Stack direction={"row"} spacing={1} sx={{ justifyContent: "flex-start" }}>
              {socialLinks.map((item) => (
                <IconButton
                  key={item.label}
                  component="a"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  aria-label={item.label}
                  sx={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "7px",
                    background: "#161616",
                    border: `1px solid ${theme.palette.divider}`,
                    color: theme.palette.text.secondary,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      border: `1px solid ${theme.palette.primary.main}`,
                      background: `${theme.palette.primary.main}10`,
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* COL 2 — NAVIGATION */}
          <Grid size={{ xs: 6, sm: 3, md: 3 }}>
            <Typography
              sx={{
                fontFamily: portfolioSettings.fontType,
                fontSize: "11px",
                fontWeight: "700",
                color: theme.palette.text.primary,
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "1rem",
                textAlign: isAr ? "right" : "left",
              }}
            >
              {t("footer.sections.navigation")}
            </Typography>

            <Stack direction={"column"} spacing={1}>
              {navLinks.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  sx={{
                    ...linkStyle,
                    "& .arrow": { 
                      opacity: 0, 
                      transition: "all 0.2s",
                      transform: isAr ? "scaleX(-1)" : "none"
                    },
                    "&:hover .arrow": {
                      opacity: 1,
                      transform: isAr ? "translate(-2px, -2px) scaleX(-1)" : "translate(2px, -2px)",
                    },
                  }}
                >
                  {item.title}
                  <ArrowOutwardIcon
                    className="arrow"
                    sx={{ fontSize: "10px" }}
                  />
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* DIVIDER */}
        <Divider
          sx={{
            borderColor: theme.palette.divider,
            maxWidth: "900px",
            margin: "0 auto",
          }}
        />

        {/* BOTTOM BAR */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: {
              xs: ".875rem 1.25rem",
              sm: ".875rem 1.75rem",
              md: "1rem 2rem",
            },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          {/* COPYRIGHT */}
          <Typography
            sx={{
              fontFamily: portfolioSettings.fontType,
              fontSize: "11px",
              fontWeight: "400",
              color: theme.palette.text.secondary,
            }}
          >
            © {new Date().getFullYear()} {portfolioData.name}
            <Box component="span" sx={{ color: theme.palette.text.disabled, mx: 0.5 }}>
              · {t("footer.rights")}
            </Box>
          </Typography>

          {/* AVAILABILITY */}
          <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: theme.palette.primary.main,
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%, 100%": { opacity: 1 },
                  "50%": { opacity: 0.3 },
                },
              }}
            />
            <Typography
              sx={{
                fontFamily: portfolioSettings.fontType,
                fontSize: "11px",
                fontWeight: "400",
                color: theme.palette.text.secondary,
              }}
            >
              {t("footer.availability")}
            </Typography>
          </Stack>

          {/* BACK TO TOP */}
          <Button
            size="small"
            endIcon={<KeyboardArrowUpIcon sx={{ fontSize: "14px" }} />}
            onClick={handleScrollTop}
            sx={{
              fontFamily: portfolioSettings.fontType,
              textTransform: "capitalize",
              fontSize: "11px",
              fontWeight: "400",
              color: theme.palette.text.secondary,
              padding: "0",
              minWidth: "auto",
              transition: "color 0.2s ease",
              "&:hover": {
                background: "none",
                color: theme.palette.primary.main,
              },
            }}
          >
            {t("footer.backToTop")}
          </Button>
        </Stack>
      </motion.div>
    </Box>
  );
  // <=================================== COMPONENT
}