import "./Navigation.css";

// COMPONENTS
import SidebarMenu from "./SidebarMenu";
import PortfolioDataContext from "../../contexts/PortfolioDataContext";
import PortfolioSettingsContext from "../../contexts/PortfolioSettingsContext";

// REACT
import { useState, useContext,} from "react";


// MATERIAL UI
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

// Other labrary
import { useTranslation } from "react-i18next";

export default function Navigation({ handleLangChange }) {
  const theme = useTheme();
  const portfolioData = useContext(PortfolioDataContext);
  const portfolioSettings = useContext(PortfolioSettingsContext);
  const { t, i18n } = useTranslation();

  const [menu, setMenu] = useState([
    { title: "home", id: "1", isActive: true },
    { title: "about", id: "2", isActive: false },
    { title: "work", id: "3", isActive: false },
    { title: "contact", id: "4", isActive: false },
  ]);

  const menuList = menu.map((item) => (
    <Link href={`#${item.title}`} key={item.id} sx={{ textDecoration: "none" }}>
      <Typography
        onClick={() => handelActiveChange(item.id)}
        className={`navItem ${item.isActive ? "active" : ""}`}
        variant="body1"
        sx={{
          color: theme.palette.text.secondary,
          fontFamily: portfolioSettings.fontType,
          cursor: "pointer",
          transition: "all 0.3s linear",
          fontWeight: "300",
          textTransform: "capitalize"
        }}
      >
        {t(`navbar.${item.title}`)}
      </Typography>
    </Link>
  ));

  function handelActiveChange(id) {
    setMenu(menu.map((item) => ({ ...item, isActive: item.id === id })));
  }

  return (
    <Container
      maxWidth="xl"
      dir="ltr"
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        height: "60px",
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LOGO */}
        <Grid sx={{ alignSelf: "center" }}>
          <Typography
            variant="h2"
            component="h3"
            sx={{
              color: theme.palette.text.primary,
              fontFamily: portfolioSettings.fontType,
              fontSize: "24px",
              fontWeight: "600",
              margin: "20px",
              textTransform: "capitalize"
            }}
          >
            {t(`navbar.${portfolioData.name}`)}
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "1px",
                background: theme.palette.primary.main,
                display: "inline-block",
                marginLeft: "5px",
              }}
            />
          </Typography>
        </Grid>

        {/* MENU */}
        <Grid
          size={6}
          sx={{
            display: { xs: "none", md: "block" },
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          <Stack
            direction="row"
            spacing={4}
            sx={{ justifyContent: "center", flexDirection: "row !important" }}
          >
            {menuList}
          </Stack>
        </Grid>

        {/* LANG BUTTON */}
        <Grid
          size={2}
          sx={{
            display: { xs: "none", md: "block" },
            alignSelf: "center",
            textAlign: "end",
          }}
        >
          <Button
            variant="contained"
            sx={{ fontFamily: portfolioSettings.fontType }}
            onClick={() => {
              handleLangChange()
              const transLang = portfolioSettings.lang == "en"? "ar": "en"
              i18n.changeLanguage(transLang)
            }}
          >
            {t(`navbar.langButton`)}
          </Button>
        </Grid>

        {/* SIDEBAR MOBILE */}
        <Grid
          size={4}
          sx={{
            display: { xs: "block", md: "none" },
            alignSelf: "center",
            textAlign: "end",
          }}
        >
          <SidebarMenu
            menu={menu}
            handelActiveChange={handelActiveChange}
            handleLangChange={handleLangChange}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
