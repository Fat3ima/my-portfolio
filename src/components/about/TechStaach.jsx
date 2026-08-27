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

import { useTranslation } from "react-i18next";
// MAIN COMPONENT
export default function TechStack() {
  // VARIABLE ===================================>
  const theme = useTheme();
  const { techStack } = useContext(PortfolioDataContext);
  const portfolioSettings = useContext(PortfolioSettingsContext);
  const {t} = useTranslation()
  // <=================================== VARIABLE

  // COMPONENT ===================================>
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1px",
        background: "#1a1a1a",
        border: "1px solid #1a1a1a",
        borderRadius: "10px",
        overflow: "hidden",
        "@media (max-width: 600px)": {
          gridTemplateColumns: "repeat(2, 1fr)",
        },
      }}
    >
      {techStack.map((tech) => (
        <Box
          key={tech.id}
          sx={{
            background: theme.palette.background.paper,
            padding: "14px 16px",
            transition: "background 0.2s",
            "&:hover": {
              background: "#141414",
            },
          }}
        >
          <Stack direction="column" spacing={0.5}>
            {/* ABBR */}
            <Typography
              sx={{
                fontFamily: portfolioSettings.fontType,
                fontSize: "11px",
                fontWeight: "700",
                color: theme.palette.primary.main,
                letterSpacing: "0.5px",
              }}
            >
              {tech.abbr}
            </Typography>

            {/* TITLE */}
            <Typography
              sx={{
                fontFamily: portfolioSettings.fontType,
                fontSize: "13px",
                fontWeight: "600",
                color: theme.palette.text.primary,
              }}
            >
              {t(`techStackData.${tech.key}.title`)}
            </Typography>

            {/* DESC */}
            <Typography
              sx={{
                fontFamily: portfolioSettings.fontType,
                fontSize: "11px",
                fontWeight: "300",
                color: theme.palette.text.secondary,
                lineHeight: 1.6,
              }}
            >
              {t(`techStackData.${tech.key}.desc`)}
            </Typography>
          </Stack>
        </Box>
      ))}
    </Box>
  );
  // <=================================== COMPONENT

  // FUNCTION ===================================>
  // <=================================== FUNCTION
}
