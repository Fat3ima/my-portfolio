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
export default function Writings() {
  // VARIABLE ===================================>
  const theme = useTheme();
  const portfolioSettings = useContext(PortfolioSettingsContext);
  const { writings } = useContext(WorkContext);
  const { t, i18n } = useTranslation();

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const isAr = i18n.language === "ar";

  const writingsFilter = writings
    .filter((item) => activeTab === "all" || item.type === activeTab)
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

  const borderColor = (type) => {
    return type === "book"
      ? "#c8ff00"
      : type === "research"
        ? "#ff9900"
        : "#6399ff";
  };

  const backgroundColor = (type) => {
    return type === "book"
      ? "rgba(200, 255, 0, .08)"
      : type === "research"
        ? "rgba(255, 153, 0, .08)"
        : "rgba(99, 153, 255, .08)";
  };

  const coverBg = (type) => {
    const gradients = {
      book:     "linear-gradient(135deg, #0a1a00, #1a3300)",
      research: "linear-gradient(135deg, #1a0a00, #3d1800)",
      artical:  "linear-gradient(135deg, #00103a, #001f6b)",
    };
    return gradients[type] ?? "linear-gradient(135deg, #1a1a1a, #2a2a2a)";
  };

  const typeIcon = (type) => {
    return type === "book" ? "📖" : type === "research" ? "🔬" : "✍️";
  };

  const statusColor = (status) => {
    const s = status?.toLowerCase();
    return s === "pubblished" || s === "published" ? "#c8ff00" : s === "writing..." ? "#ff9900" : "#555";
  };

  const statusBg = (status) => {
    const s = status?.toLowerCase();
    return s === "pubblished" || s === "published"
      ? "rgba(200, 255, 0, .08)"
      : s === "writing..."
        ? "rgba(255, 153, 0, .08)"
        : "rgba(255, 255, 255, .04)";
  };

  const emptyIcon = () => {
    if (search) return "🔍";
    return activeTab === "book" ? "📖" : activeTab === "research" ? "🔬" : activeTab === "artical" ? "✍️" : "📚";
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
        <Button variant="outlined" size="small" sx={buttonStyle("all")} onClick={() => setActiveTab("all")}>{t("writings.tabs.all")}</Button>
        <Button variant="outlined" size="small" sx={buttonStyle("book")} onClick={() => setActiveTab("book")}>{t("writings.tabs.book")}</Button>
        <Button variant="outlined" size="small" sx={buttonStyle("research")} onClick={() => setActiveTab("research")}>{t("writings.tabs.research")}</Button>
        <Button variant="outlined" size="small" sx={buttonStyle("artical")} onClick={() => setActiveTab("artical")}>{t("writings.tabs.article")}</Button>

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
            placeholder={t("writings.searchPlaceholder")}
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
      {writingsFilter.length === 0 ? (
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
              ? `${t("writings.noResults")} "${search}"`
              : activeTab === "all"
                ? t("writings.noWritingsYet")
                : `${t("writings.noCategoryPart1")} ${t(`writings.tabs.${activeTab}`)} ${t("writings.noCategoryPart2")}`}
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
            {search ? t("writings.tryDifferentSearch") : t("writings.willAppearHere")}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ marginTop: "30px" }}>
          {writingsFilter.map((item) => {
            // معالجة النصوص الديناميكية القادمة من الـ Context أو قاعدة البيانات إذا كانت بحاجة لترجمة مخصصة أو عرض كما هي
            const displayStatus = item.status?.toLowerCase() === "writing..." 
              ? t("writings.status.writing") 
              : item.status?.toLowerCase() === "published" || item.status?.toLowerCase() === "pubblished"
                ? t("writings.status.published") 
                : item.status;

            return (
              <Grid key={item.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card
                  sx={{
                    maxWidth: "257px",
                    background: theme.palette.background.paper,
                    border: "1px solid transparent",
                    transition: "all 0.5s linear",
                    borderRadius: "15px",
                    "&:hover": { border: `1px solid ${borderColor(item.type)}` },
                  }}
                >
                  <Box
                    sx={{
                      height: 140,
                      background: coverBg(item.type),
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Typography
                      sx={{
                        position: "absolute",
                        bottom: "-10px",
                        right: isAr ? "initial" : "12px",
                        left: isAr ? "12px" : "initial",
                        fontFamily: portfolioSettings.fontType,
                        fontSize: "72px",
                        fontWeight: "800",
                        color: "rgba(255,255,255,0.04)",
                        lineHeight: 1,
                        userSelect: "none",
                      }}
                    >
                      {String(item.id).padStart(2, "0")}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: portfolioSettings.fontType,
                        fontSize: "13px",
                        fontWeight: "700",
                        color: "#fff",
                        textAlign: "center",
                        padding: "0 1.5rem",
                        lineHeight: 1.3,
                        zIndex: 1,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Box sx={{ width: "30px", height: "2px", background: borderColor(item.type), borderRadius: "1px", zIndex: 1 }} />
                    <Typography
                      sx={{
                        fontFamily: portfolioSettings.fontType,
                        fontSize: "9px",
                        fontWeight: "400",
                        color: "rgba(255,255,255,0.3)",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        zIndex: 1,
                      }}
                    >
                      {item.author}
                    </Typography>
                  </Box>
                  <CardContent>
                    <Stack direction={"row"} spacing={1} sx={{ marginBottom: "8px" }}>
                      <Typography
                        component="div"
                        sx={{
                          fontSize: "9px",
                          fontWeight: "600",
                          borderRadius: "4px",
                          padding: "2px 8px",
                          textTransform: "uppercase",
                          border: `1px solid ${borderColor(item.type)}`,
                          textAlign: "center",
                          background: backgroundColor(item.type),
                          color: borderColor(item.type),
                        }}
                      >
                        {typeIcon(item.type)} {t(`writings.tabs.${item.type === 'artical' ? 'article' : item.type}`)}
                      </Typography>
                      <Typography
                        component="div"
                        sx={{
                          fontSize: "9px",
                          fontWeight: "600",
                          borderRadius: "4px",
                          padding: "2px 8px",
                          textTransform: "capitalize",
                          border: `1px solid ${statusColor(item.status)}30`,
                          textAlign: "center",
                          background: statusBg(item.status),
                          color: statusColor(item.status),
                        }}
                      >
                        {displayStatus}
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
                        fontSize: "20px",
                        color: theme.palette.text.primary,
                      }}
                    >
                      {item.title}
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
                      {item.description}
                    </Typography>
                  </CardContent>
                  <Divider />
                  <CardActions sx={{ justifyContent: "space-between", padding: "8px 12px" }}>
                    <Typography
                      sx={{
                        fontFamily: portfolioSettings.fontType,
                        fontSize: "11px",
                        fontWeight: "400",
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {item.author}
                    </Typography>
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
                        {t("writings.viewLink")}
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