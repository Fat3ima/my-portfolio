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
import Typography from "@mui/material/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next"; // مكتبة الترجمة

// MAIN COMPONENT
export default function Courses() {
  // VARIABLE ===================================>
  const theme = useTheme();
  const portfolioSettings = useContext(PortfolioSettingsContext);
  const { courses } = useContext(WorkContext);
  const { t, i18n } = useTranslation();

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const isAr = i18n.language === "ar";

  const coursesFilter = courses
    .filter((item) => activeTab === "all" || item.status?.toLowerCase() === activeTab)
    .filter((item) => item.title?.toLowerCase().includes(search.toLowerCase()));

  const buttonStyle = (tab) => ({
    fontFamily: portfolioSettings.fontType,
    textTransform: "capitalize",
    fontSize: "12px",
    fontWeight: "200",
    borderRadius: "20px",
    border: `1px solid ${
      activeTab === tab
        ? theme.palette.primary.main
        : theme.palette.text.secondary
    }`,
    color: activeTab === tab ? theme.palette.primary.main : theme.palette.text.primary,
    background: activeTab === tab ? `${theme.palette.primary.main}10` : "transparent",
    transition: "all 0.3s ease",
  });

  const statusColor = (status) => {
    const s = status?.toLowerCase();
    return s === "ongoing..." ? "#ff9900" : s === "completed" ? "#c8ff00" : "#555";
  };

  const statusBg = (status) => {
    const s = status?.toLowerCase();
    return s === "ongoing..."
      ? "rgba(255, 153, 0, .08)"
      : s === "completed"
        ? "rgba(200, 255, 0, .08)"
        : "rgba(255, 255, 255, .04)";
  };

  const levelColor = (level) => {
    const l = level?.toLowerCase();
    return l === "beginner" ? "#6399ff" : l === "intermediate" ? "#ff9900" : "#b06bff";
  };

  const emptyIcon = () => {
    if (search) return "🔍";
    return activeTab === "ongoing..." ? "⏳" : activeTab === "completed" ? "✅" : activeTab === "planned" ? "📅" : "🎓";
  };
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
        <Button variant="outlined" size="small" sx={buttonStyle("all")} onClick={() => setActiveTab("all")}>{t("courses.tabs.all")}</Button>
        <Button variant="outlined" size="small" sx={buttonStyle("ongoing...")} onClick={() => setActiveTab("ongoing...")}>{t("courses.tabs.ongoing")}</Button>
        <Button variant="outlined" size="small" sx={buttonStyle("completed")} onClick={() => setActiveTab("completed")}>{t("courses.tabs.completed")}</Button>

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
            "&:focus-within": { borderColor: theme.palette.primary.main },
          }}
        >
          <SearchIcon sx={{ fontSize: "15px", color: theme.palette.text.secondary }} />
          <InputBase
            placeholder={t("courses.searchPlaceholder")}
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
      {coursesFilter.length === 0 ? (
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
          <Typography sx={{ fontSize: "40px", lineHeight: 1 }}>{emptyIcon()}</Typography>
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
              ? `${t("courses.noResults")} "${search}"`
              : activeTab === "all"
                ? t("courses.noCoursesYet")
                : `${t("courses.noCategoryPart1")} ${t(`courses.tabs.${activeTab === 'ongoing...' ? 'ongoing' : activeTab}`)} ${t("courses.noCategoryPart2")}`}
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
            {search ? t("courses.tryDifferentSearch") : t("courses.willAppearHere")}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ marginTop: "30px" }}>
          {coursesFilter.map((item) => {
            const statusKey = item.status?.toLowerCase() === "ongoing..." ? "ongoing" : item.status?.toLowerCase();
            const levelKey = item.level?.toLowerCase();

            return (
              <Grid key={item.id} size={{ xs: 12, sm: 12, md: 12 }}>
                <Card
                  sx={{
                    maxWidth: "100%",
                    background: theme.palette.background.paper,
                    border: "1px solid transparent",
                    transition: "all 0.5s linear",
                    borderRadius: "15px",
                    "&:hover": { border: `1px solid ${statusColor(item.status)}` },
                  }}
                >
                  <Stack direction={"row"} spacing={2} sx={{ alignItems: "center", padding: "10px" }}>
                    <Box
                      sx={{
                        width: "46px",
                        height: "46px",
                        borderRadius: "10px",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        background: statusBg(item.status),
                        border: `1px solid ${statusColor(item.status)}30`,
                      }}
                    >
                      🎓
                    </Box>
                    <CardContent sx={{ flex: 1, padding: "0 !important" }}>
                      <Stack direction={"row"} spacing={1} sx={{ marginBottom: "6px" }}>
                        <Typography
                          component="div"
                          sx={{
                            fontSize: "9px",
                            fontWeight: "600",
                            borderRadius: "4px",
                            padding: "2px 8px",
                            textTransform: "capitalize",
                            border: `1px solid ${statusColor(item.status)}50`,
                            background: statusBg(item.status),
                            color: statusColor(item.status),
                          }}
                        >
                          {t(`courses.status.${statusKey}`) || item.status}
                        </Typography>
                      </Stack>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          fontFamily: portfolioSettings.fontType,
                          textTransform: "capitalize",
                          fontWeight: "600",
                          fontSize: "18px",
                          color: theme.palette.text.primary,
                          margin: "0 0 4px 0",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: portfolioSettings.fontType,
                          fontSize: "12px",
                          fontWeight: "400",
                          color: theme.palette.text.secondary,
                        }}
                      >
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Stack>
                  <Divider />
                  <CardActions sx={{ justifyContent: "space-between", padding: "8px 12px" }}>
                    <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
                      <Typography
                        sx={{
                          fontFamily: portfolioSettings.fontType,
                          fontSize: "11px",
                          fontWeight: "400",
                          color: theme.palette.text.secondary,
                        }}
                      >
                        ⏱ {item.hoursNumber} {t("courses.hours")}
                      </Typography>
                      <Typography sx={{ fontSize: "10px", color: theme.palette.text.disabled || "#555" }}>·</Typography>
                      <Typography
                        sx={{
                          fontFamily: portfolioSettings.fontType,
                          fontSize: "11px",
                          fontWeight: "400",
                          color: levelColor(item.level),
                        }}
                      >
                        {t(`courses.levels.${item.level}`)}
                      </Typography>
                    </Stack>
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
                      <a href={item.link} target="_blank" style={{ textDecoration: "none", color: "inherit" }}>
                        {t("courses.viewLink")}
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