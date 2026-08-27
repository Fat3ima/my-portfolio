// REACT
import { useContext, useState } from "react";

// COMPONENT
import PortfolioSettingsContext from "../../contexts/PortfolioSettingsContext";
import WorkContext from "../../contexts/WorkContext";

// MATERIAL UI
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next"; // مكتبة الترجمة

// MAIN COMPONENT
export default function Projects() {
  // VARIABLE ===================================>
  const theme = useTheme();
  const portfolioSettings = useContext(PortfolioSettingsContext);
  const { projects } = useContext(WorkContext);
  const { t, i18n } = useTranslation();

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const isAr = i18n.language === "ar";

  const projectsFilter = projects
    .filter((p) => activeTab === "all" || p.type === activeTab)
    .filter((p) => p.title?.toLowerCase().includes(search.toLowerCase()));

  const borderColor = (type) => {
    return type === "web"
      ? "#c8ff00"
      : type === "mobile"
        ? "#6399ff"
        : "#b06bff";
  };

  const backgroundColor = (type) => {
    return type === "web"
      ? "rgba(200, 255, 0, .08)"
      : type === "mobile"
        ? "rgba(99, 153, 255, .08)"
        : "rgba(176, 107, 255, .08)";
  };


  const buttonStyle = (tab) => ({
    fontFamily: portfolioSettings.fontType,
    textTransform: "capitalize",
    fontSize: "12px",
    fontWeight: "200",
    borderRadius: "20px",
    border: `1px solid ${
      activeTab === tab ? theme.palette.primary.main : theme.palette.text.secondary
    }`,
    color: activeTab === tab ? theme.palette.primary.main : theme.palette.text.primary,
    background: activeTab === tab ? `${theme.palette.primary.main}10` : "transparent",
    transition: "all 0.3s ease",
  });
  // <=================================== VARIABLE

  // COMPONENT ===================================>
  return (
    <Container
      maxWidth="md"
      dir={isAr ? "rtl" : "ltr"}
      sx={{
        background: theme.palette.background.default,
        overflow: "hidden",
        padding: "0",
      }}
    >
      {/* FILTERS + SEARCH */}
      <Stack
        direction={"row"}
        spacing={2}
        sx={{ padding: "0", alignItems: "center" }}
      >
        <Button variant="outlined" size="small" sx={buttonStyle("all")} onClick={() => setActiveTab("all")}>{t("projects.tabs.all")}</Button>
        <Button variant="outlined" size="small" sx={buttonStyle("web")} onClick={() => setActiveTab("web")}>{t("projects.tabs.web")}</Button>
        <Button variant="outlined" size="small" sx={buttonStyle("mobile")} onClick={() => setActiveTab("mobile")}>{t("projects.tabs.mobile")}</Button>
        <Button variant="outlined" size="small" sx={buttonStyle("ai")} onClick={() => setActiveTab("ai")}>{t("projects.tabs.ai")}</Button>

        {/* SEARCH */}
        <Stack
          direction={"row"}
          spacing={1}
          sx={{
            alignItems: "center",
            marginLeft: isAr ? "initial" : "auto !important",
            marginRight: isAr ? "auto !important" : "initial",
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: "20px",
            padding: "2px 12px",
            transition: "border-color 0.2s ease",
            "&:focus-within": {
              borderColor: theme.palette.primary.main,
            },
          }}
        >
          <SearchIcon sx={{ fontSize: "15px", color: theme.palette.text.secondary }} />
          <InputBase
            placeholder={t("projects.searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              fontFamily: portfolioSettings.fontType,
              fontSize: "12px",
              color: theme.palette.text.primary,
              width: "100px",
              "& input::placeholder": { color: theme.palette.text.secondary, opacity: 1 },
            }}
          />
        </Stack>
      </Stack>

      {/* EMPTY STATE */}
      {projectsFilter.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 20px",
            gap: "12px",
            border: `1px dashed ${theme.palette.divider}`,
            borderRadius: "15px",
            background: theme.palette.background.paper,
            marginTop: "30px",
          }}
        >
          <Typography sx={{ fontSize: "40px", lineHeight: 1 }}>
            {search ? "🔍" : activeTab === "web" ? "🌐" : activeTab === "mobile" ? "📱" : activeTab === "ai" ? "🤖" : "🗂"}
          </Typography>
          <Typography
            sx={{
              fontFamily: portfolioSettings.fontType,
              fontSize: "16px",
              fontWeight: "600",
              color: theme.palette.text.primary,
              textAlign: "center",
            }}
          >
            {search
              ? `${t("projects.noResults")} "${search}"`
              : activeTab === "all"
                ? t("projects.noProjectsYet")
                : `${t("projects.noCategoryPart1")} ${activeTab} ${t("projects.noCategoryPart2")}`}
          </Typography>
          <Typography
            sx={{
              fontFamily: portfolioSettings.fontType,
              fontSize: "12px",
              fontWeight: "300",
              color: theme.palette.text.secondary,
              textAlign: "center",
              maxWidth: "280px",
              lineHeight: 1.7,
            }}
          >
            {search
              ? t("projects.tryDifferentSearch")
              : t("projects.willAppearHere")}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ marginTop: "30px" }}>
          {projectsFilter.map((project) => {
            return (
              <Grid key={project.id} size={{ xs: 12, sm: 6, md: 6 }}>
                <Card
                  sx={{
                    maxWidth: "100%",
                    background: theme.palette.background.paper,
                    border: "1px solid transparent",
                    transition: "all 0.5s linear",
                    borderRadius: "15px",
                    "&:hover": {
                      border: `1px solid ${borderColor(project.type)}`,
                    },
                  }}
                >
                  <CardMedia
                    sx={{ height: 140 }}
                    image={project.imgSrc}
                    title={project.title}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        fontSize: "9px",
                        fontWeight: "600",
                        borderRadius: "4px",
                        padding: "2px 8px",
                        marginBottom: "8px",
                        textTransform: "uppercase",
                        border: `1px solid ${borderColor(project.type)}`,
                        maxWidth: "60px",
                        textAlign: "center",
                        background: backgroundColor(project.type),
                      }}
                    >
                      {project.type}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        fontFamily: portfolioSettings.fontType,
                        textTransform: "capitalize",
                        fontWeight: "600",
                        fontSize: "20px",
                        color: theme.palette.text.primary,
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: portfolioSettings.fontType,
                        fontSize: "12px",
                        fontWeight: "300",
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {project.description}
                    </Typography>
                    <Stack direction={"row"} spacing={1} sx={{ marginTop: "10px" }}>
                      {project.details.map((detail) => {
                        return (
                          <Typography
                            key={detail}
                            sx={{
                              fontFamily: portfolioSettings.fontType,
                              fontSize: "10px",
                              fontWeight: "400",
                              color: theme.palette.text.secondary,
                              background: "#161616",
                              border: "1px solid #252525",
                              borderRadius: "3px",
                              padding: "0px 7px",
                            }}
                          >
                            {detail}
                          </Typography>
                        );
                      })}
                    </Stack>
                  </CardContent>
                  <Divider />
                  <CardActions sx={{ justifyContent: "end" }}>
                    <Button
                      size="small"
                      endIcon={<ArrowOutwardIcon sx={{ transform: isAr ? "rotate(-90deg)" : "none", fontSize: "14px" }} />}
                      sx={{
                        fontFamily: portfolioSettings.fontType,
                        textTransform: "capitalize",
                        fontSize: "12px",
                        fontWeight: "400",
                        color: theme.palette.text.secondary,
                      }}
                    >
                      <a href={project.link} target="_blank" style={{ textDecoration: "none", color: "inherit" }}>
                        {t("projects.viewLink")}
                      </a>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
  // <=================================== COMPONENT
}