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

// DATA
import { useTranslation } from "react-i18next";

// MAIN COMPONENT
export default function Certificates({ currentIndex }) {
  // VARIABLE ===================================>
  const theme = useTheme();
  const {certificates} = useContext(PortfolioDataContext);
  const portfolioSettings = useContext(PortfolioSettingsContext);
  const {t} = useTranslation()
  
  // <=================================== VARIABLE

  // COMPONENT ===================================>
  return (
    <Box sx={{ width: "100%", overflow: "hidden", direction: "ltr" }}>
      <Box
        sx={{
          display: "flex",
          width: `${certificates.length * 100}%`,
          transform: `translateX(-${(currentIndex * 100) / certificates.length}%)`,
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {certificates.map((cert) => (
          <Box
            key={cert.id}
            sx={{
              width: `${100 / certificates.length}%`,
              flexShrink: 0,
              padding: "0 2px",
              direction: portfolioSettings.lang === "en"? "ltr": "rtl"
            }}
          >
            <Stack direction="column" spacing={1.5}>
              {/* CERT ICON */}
              <Box
                sx={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #252525",
                  background: "#161616",
                }}
              >
                <img
                  alt={cert.title}
                  src={cert.icon}
                  style={{ width: "60%", height: "60%", objectFit: "contain" }}
                />
              </Box>

              {/* CERT NAME */}
              <Typography
                sx={{
                  fontFamily: portfolioSettings.fontType,
                  fontSize: "16px",
                  fontWeight: "700",
                  color: theme.palette.text.primary,
                  lineHeight: 1.2,
                  letterSpacing: "-0.3px",
                }}
              >
                {t(`certificatesData.${cert.key}.title`)}
              </Typography>

              {/* ISSUER */}
              <Typography
                sx={{
                  fontFamily: portfolioSettings.fontType,
                  fontSize: "13px",
                  fontWeight: "400",
                  color: theme.customColors.moreColor,
                }}
              >
                {t(`certificatesData.${cert.key}.issuer`)}
              </Typography>

              {/* DATE ROW */}
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <img
                  alt="date icon"
                  src="icons/calendar.png"
                  style={{
                    width: "16px",
                    height: "16px",
                    objectFit: "contain",
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: portfolioSettings.fontType,
                    fontSize: "11px",
                    fontWeight: "300",
                    color: theme.palette.text.secondary,
                  }}
                >
                 {t(`certificatesData.${cert.key}.date`)}
                </Typography>
                {cert.expiry !== "No Expiry" && (
                  <>
                    <Typography
                      sx={{
                        fontFamily: portfolioSettings.fontType,
                        fontSize: "11px",
                        fontWeight: "300",
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {t(`certificatesData.${cert.key}.expiry`)}
                    </Typography>
                  </>
                )}
              </Stack>

              {/* CERT ID */}
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: "10px",
                  color: "#444",
                  background: "#161616",
                  border: "1px solid #252525",
                  borderRadius: "4px",
                  padding: "3px 8px",
                  letterSpacing: "0.3px",
                  display: "inline-block",
                  width: "fit-content",
                }}
              >
                 {t(`certificatesData.${cert.key}.certId`)}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
  // <=================================== COMPONENT
}
