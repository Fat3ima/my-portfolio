import { useContext } from "react";
import PortfolioDataContext from "../../contexts/PortfolioDataContext";
import PortfolioSettingsContext from "../../contexts/PortfolioSettingsContext";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

export default function Skills({ currentIndex }) {
  const theme = useTheme();
  const {skills} = useContext(PortfolioDataContext);
  const portfolioSettings = useContext(PortfolioSettingsContext);
  const {t, i18n} = useTranslation()

  const skillsDetails = (details, key) =>
    details.map((de, i) => (
      <Typography
        key={de.id}
        sx={{
          fontFamily: portfolioSettings.fontType,
          fontSize: "10px",
          fontWeight: "400",
          color: theme.palette.text.secondary,
          background: "#161616",
          border: "1px solid #252525",
          borderRadius: "3px",
          padding: "2px 8px",
        }}
      >
        {t(`skillsData.${key}.tag${i + 1}`)}
      </Typography>
    ));
  return (
    <Box sx={{ width: "100%", overflow: "hidden" ,direction: "ltr"}}>
      <Box
        sx={{
          display: "flex",
          width: `${skills.length * 100}%`,
          transform: `translateX(-${(currentIndex * 100) / skills.length}%)`,
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {skills.map((skill) => (
          <Box
            key={skill.id}
            sx={{
              width: `${100 / skills.length}%`,
              flexShrink: 0,
              padding: "0 2px",
              direction: portfolioSettings.lang === "en"? "ltr": "rtl"
            }}
          >
            <Stack direction="column" spacing={1.5}>
              {/* SKILL IMAGE */}
              <Box
                sx={{
                  width: "100%",
                  height: "100px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #0d0d0d 40%, #c8ff0025)",
                  border: "1px solid #1e1e1e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={skill.icon}
                  alt={skill.title}
                  style={{
                    width: "50%",
                    height: "50%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              {/* SKILL NAME */}
              <Typography
                sx={{
                  fontFamily: portfolioSettings.fontType,
                  fontSize: "16px",
                  fontWeight: "700",
                  color: theme.palette.text.primary,
                  letterSpacing: "-0.3px",
                }}
              >
                {t(`skillsData.${skill.key}.title`)}
              </Typography>

              {/* SKILL DESC */}
              <Typography
                sx={{
                  fontFamily: portfolioSettings.fontType,
                  fontSize: "12px",
                  fontWeight: "300",
                  color: theme.palette.text.secondary,
                  lineHeight: 1.6,
                }}
              >
                {t(`skillsData.${skill.key}.desc`)}
              </Typography>

              {/* SKILL TAGS */}
              <Stack
                direction="row"
                spacing={0.8}
                sx={{ flexWrap: "wrap" }}
                useFlexGap
              >
                {skillsDetails(skill.details, skill.key)}
              </Stack>
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
