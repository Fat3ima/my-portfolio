// IMPORT
import "./Navigation.css";

// REACT
import { useState } from "react";
import { useContext } from "react";

// COMPONTET
import PortfolioDataContext from "../../contexts/PortfolioDataContext";
import PortfolioSettingsContext from "../../contexts/PortfolioSettingsContext";

// MATERAIL UI
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import MailIcon from "@mui/icons-material/Mail";
import Drawer from "@mui/material/Drawer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "@mui/material/Link";

import { useTranslation } from "react-i18next";

// MAIN COMPONTENT
export default function SidebarMenu({
  menu,
  handelActiveChange,
  handleLangChange,
}) {
  // VARIABES =================================>
  const theme = useTheme();
  const portfolioData = useContext(PortfolioDataContext);
  const portfolioSettings = useContext(PortfolioSettingsContext);
  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const renderIcon = (title) => {
    switch (title) {
      case "home":
        return <HomeIcon />;
      case "about":
        return <PersonIcon />;
      case "work":
        return <WorkIcon />;
      case "contact":
        return <MailIcon />;
      default:
        return null;
    }
  };

  const menuList = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        background: theme.palette.background.paper,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Stack spacing={3}>
        <Box>
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
            ></span>
          </Typography>
        </Box>
        <Divider />
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              marginLeft: "20px",
              fontFamily: portfolioSettings.fontType,
            }}
          >
            {t("navbar.NAVIGATION")}
          </Typography>
          <List>
            {menu.map((item) => (
              <Link
                href={`#${item.title}`}
                key={item.id}
                sx={{
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                }}
              >
                <ListItem
                  onClick={() => {
                    handelActiveChange(item.id);
                  }}
                  className={`sidebarItem ${item.isActive ? "active" : ""}`}
                  disablePadding
                  sx={{ marginBottom: "10px" }}
                >
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemIcon
                      className={`sidebarItemIcon ${item.isActive ? "active" : ""}`}
                      sx={{
                        background: theme.palette.divider,
                        borderRadius: "8px",
                        padding: "10px",
                        textAlign: "center",
                      }}
                    >
                      {renderIcon(item.title)}
                    </ListItemIcon>
                    <ListItemText primary={t(`navbar.${item.title}`)} />
                    <ArrowForwardIosIcon sx={{ fontSize: "12px" }} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
        <Button
          variant="contained"
          sx={{ fontFamily: portfolioSettings.fontType }}
          onClick={() => {
            handleLangChange();
            const transLang = portfolioSettings.lang == "en" ? "ar" : "en";
            i18n.changeLanguage(transLang);
          }}
        >
          {t('navbar.langButton')}
        </Button>
      </Stack>
    </Box>
  );

  // <================================= VARIABES

  // FUNCTIONS =================================>
  // <================================= FUNCTIONS

  // COMPONENT =================================>
  return (
    <>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ display: { sm: "none" } }} />
        <Typography
          sx={{
            display: { xs: "none", sm: "block" },
            fontFamily: portfolioSettings.fontType,
            color: theme.palette.background.default,
            background: theme.palette.primary.main,
            width: "80px",
            borderRadius: "6px",
            textAlign: "center",
            fontWeight: "500",
          }}
          variant="body1"
        >
          menu
        </Typography>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {menuList}
      </Drawer>
    </>
  );
  // <================================= COMPONENT
}
