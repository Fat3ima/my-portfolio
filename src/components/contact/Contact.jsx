// REACT
import { useContext, useState } from "react";

// COMPONENT
import PortfolioDataContext from "../../contexts/PortfolioDataContext";
import PortfolioSettingsContext from "../../contexts/PortfolioSettingsContext";

// MATERIAL UI
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

// EXTERNAL
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";

// MAIN COMPONENT
export default function Contact() {
  // VARIABLE ===================================>
  const theme = useTheme();
  const portfolioData = useContext(PortfolioDataContext);
  const portfolioSettings = useContext(PortfolioSettingsContext);
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  // ANIMATIONS
  const fromLeft = {
    hidden: { opacity: 0, x: isAr ? 80 : -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const fromRight = {
    hidden: { opacity: 0, x: isAr ? -80 : 80 },
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

  const fromLeft2 = {
    hidden: { opacity: 0, x: isAr ? 80 : -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.2 },
    },
  };

  // ⚠️ بدلها بروابطك الحقيقية قبل النشر
  const socialInfo = [
    { name: "GitHub", link: portfolioData.socialLink.gitHup, icon: "🐙" },
    { name: "LinkedIn", link: portfolioData.socialLink.linkedin, icon: "💼" },
    { name: "X", link: portfolioData.socialLink.x, icon: "🐦" },
    { name: "Instagram", link: portfolioData.socialLink.instagram, icon: "📸" },
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  const fieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "6px",
      fontFamily: portfolioSettings.fontType,
      fontSize: "13px",
      "& fieldset": { borderColor: "#2a2a2a" },
      "&:hover fieldset": { borderColor: "#444" },
      "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
    },
    "& .MuiInputLabel-root": {
      fontFamily: portfolioSettings.fontType,
      fontSize: "13px",
      color: theme.palette.text.secondary,
      left: isAr ? "auto" : 0,
      right: isAr ? 28 : "auto",
      transformOrigin: isAr ? "right" : "left",
      "&.Mui-focused": { color: theme.palette.primary.main },
    },
    "& .MuiInputBase-input": {
      color: theme.palette.text.primary,
      fontFamily: portfolioSettings.fontType,
      textAlign: isAr ? "right" : "left",
    },
    "& .MuiInputBase-inputMultiline": {
      color: theme.palette.text.primary,
    },
  };
  // <=================================== VARIABLE

  // FUNCTION ===================================>
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(false);
    setSendError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setError(true);
      return;
    }

    setSending(true);
    setSendError(false);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          subject: form.subject || "No subject",
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setSending(false);
        setSent(true);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setSending(false);
        setSendError(true);
      });
  };

  const handleReset = () => {
    setForm({ name: "", email: "", subject: "", message: "" });
    setSent(false);
    setError(false);
    setSendError(false);
  };
  // <=================================== FUNCTION

  // COMPONENT ===================================>
  return (
    <Container
      id="contact"
      maxWidth="md"
      dir={isAr ? "rtl" : "ltr"}
      sx={{
        background: theme.palette.background.default,
        overflow: "hidden",
        marginTop: "30px",
      }}
    >
      <Divider
        textAlign={isAr ? "right" : "left"}
        sx={{
          color: theme.palette.primary.main,
          fontFamily: portfolioSettings.fontType,
          fontSize: "13px",
          textTransform: "uppercase",
          fontWeight: "500",
        }}
      >
        {t("contact.divider")}
      </Divider>

      <Stack direction={"row"} spacing={3}>
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
              maxWidth: "400px",
              fontSize: "40px",
              fontWeight: "600",
              paddingTop: "30px",
            }}
          >
            {t("contact.title")}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: portfolioSettings.fontType,
              color: theme.palette.text.secondary,
              maxWidth: "500px",
              fontSize: "13px",
              fontWeight: "300",
              marginTop: "20px",
            }}
          >
            {t("contact.subtitle")}
          </Typography>
        </motion.div>
      </Stack>

      <Grid container spacing={4} sx={{ marginTop: "20px" }}>
        {/* SOCIAL LINKS */}
        <Grid
          key="social-links-grid"
          size={{ xs: 12, sm: 5, md: 5 }}
          sx={{
            background: theme.palette.background.paper,
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <motion.div
            variants={fromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{ height: "100%" }}
          >
            <Stack direction={"column"} spacing={2}>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: portfolioSettings.fontType,
                  color: theme.palette.text.primary,
                  fontSize: "14px",
                  fontWeight: "500",
                  marginTop: "20px",
                }}
              >
                {t("contact.findMe")}
              </Typography>

              {socialInfo.map((item) => {
                return (
                  <Link
                    key={item.name}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    component="a"
                    variant="body2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      background: "#161616",
                      cursor: "pointer",
                      textDecoration: "none",
                      border: "1px solid #1e1e1e",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        border: "1px solid #2a2a2a",
                        background: "#1c1c1c",
                        "& .MuiSvgIcon-root": {
                          color: "primary.main",
                          transform: isAr ? "translate(-3px, -3px)" : "translate(3px, -3px)",
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "7px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        flexShrink: 0,
                        background: "rgba(255, 255, 255, .06)",
                        border: "1px solid #2a2a2a",
                      }}
                    >
                      {item.icon}
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: portfolioSettings.fontType,
                          color: theme.palette.text.primary,
                          fontSize: "10px",
                          fontWeight: "400",
                          textAlign: "start",
                          textTransform: "capitalize",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: portfolioSettings.fontType,
                          color: theme.palette.text.secondary,
                          fontSize: "10px",
                          fontWeight: "400",
                          textAlign: "start",
                        }}
                      >
                        {item.link.replace("https://", "")}
                      </Typography>
                    </Box>

                    <ArrowOutwardIcon
                      sx={{
                        fontSize: "12px",
                        transition: "all 0.3s ease",
                        color: theme.palette.text.secondary,
                        transform: isAr ? "scaleX(-1)" : "none",
                      }}
                    />
                  </Link>
                );
              })}
            </Stack>
          </motion.div>
        </Grid>

        {/* FORM */}
        <Grid
          key="form-grid"
          size={{ xs: 12, sm: 7, md: 7 }}
          sx={{
            background: theme.palette.background.paper,
            padding: "20px",
            borderRadius: "12px",
            order: { xs: 3, sm: 2, md: 2 },
          }}
        >
          <motion.div
            variants={fromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{ height: "100%" }}
          >
            {sent ? (
              <Stack
                direction={"column"}
                spacing={2}
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  padding: "40px 0",
                }}
              >
                <Typography sx={{ fontSize: "40px" }}>✅</Typography>
                <Typography
                  sx={{
                    fontFamily: portfolioSettings.fontType,
                    fontSize: "18px",
                    fontWeight: "700",
                    color: theme.palette.text.primary,
                  }}
                >
                  {t("contact.successTitle")}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: portfolioSettings.fontType,
                    fontSize: "13px",
                    fontWeight: "300",
                    color: theme.palette.text.secondary,
                    textAlign: "center",
                  }}
                >
                  {t("contact.successMessage")}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleReset}
                  sx={{
                    fontFamily: portfolioSettings.fontType,
                    textTransform: "capitalize",
                    fontSize: "12px",
                    color: theme.palette.text.secondary,
                    border: `1px solid ${theme.palette.text.secondary}`,
                    borderRadius: "6px",
                    marginTop: "8px",
                  }}
                >
                  {t("contact.sendAnother")}
                </Button>
              </Stack>
            ) : (
              <form onSubmit={handleSubmit}>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: portfolioSettings.fontType,
                    color: theme.palette.text.primary,
                    fontSize: "14px",
                    fontWeight: "500",
                    marginTop: "20px",
                    marginBottom: "16px",
                  }}
                >
                  {t("contact.formTitle")}
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.5}
                  sx={{ marginBottom: "16px" }}
                >
                  <TextField
                    label={t("contact.labels.name")}
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    size="small"
                    error={error && !form.name}
                    sx={fieldStyle}
                  />
                  <TextField
                    label={t("contact.labels.email")}
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    size="small"
                    error={error && !form.email}
                    sx={fieldStyle}
                  />
                </Stack>

                <FormControl
                  fullWidth
                  size="small"
                  sx={{ marginBottom: "16px", ...fieldStyle }}
                >
                  <InputLabel
                    id="subject-label"
                    sx={{
                      right: isAr ? 28 : "auto",
                      transformOrigin: isAr ? "right" : "left",
                    }}
                  >
                    {t("contact.labels.subject")}
                  </InputLabel>
                  <Select
                    labelId="subject-label"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    label={t("contact.labels.subject")}
                    sx={{
                      borderRadius: "6px",
                      fontFamily: portfolioSettings.fontType,
                      fontSize: "13px",
                      color: theme.palette.text.primary,
                      "& .MuiSelect-select": {
                        textAlign: isAr ? "right" : "left",
                      },
                    }}
                  >
                    <MenuItem value="Freelance Project">
                      {t("contact.subjects.freelance")}
                    </MenuItem>
                    <MenuItem value="Full-time Role">
                      {t("contact.subjects.fullTime")}
                    </MenuItem>
                    <MenuItem value="Collaboration">
                      {t("contact.subjects.collaboration")}
                    </MenuItem>
                    <MenuItem value="Just saying hi">
                      {t("contact.subjects.sayHi")}
                    </MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label={t("contact.labels.message")}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  error={error && !form.message}
                  sx={{ ...fieldStyle, marginBottom: "16px" }}
                />

                {error && (
                  <Typography
                    sx={{
                      fontFamily: portfolioSettings.fontType,
                      fontSize: "11px",
                      color: "#ff6b6b",
                      marginBottom: "8px",
                      textAlign: isAr ? "right" : "left",
                    }}
                  >
                    {t("contact.errorRequired")}
                  </Typography>
                )}

                {sendError && (
                  <Typography
                    sx={{
                      fontFamily: portfolioSettings.fontType,
                      fontSize: "11px",
                      color: "#ff6b6b",
                      marginBottom: "8px",
                      textAlign: isAr ? "right" : "left",
                    }}
                  >
                    {t("contact.errorSend")}
                  </Typography>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={sending}
                  endIcon={
                    sending ? (
                      <CircularProgress size={14} sx={{ color: "#080808" }} />
                    ) : (
                      <SendIcon
                        sx={{
                          fontSize: "14px",
                          transform: isAr ? "rotate(180deg)" : "none",
                        }}
                      />
                    )
                  }
                  sx={{
                    fontFamily: portfolioSettings.fontType,
                    textTransform: "capitalize",
                    fontSize: "13px",
                    fontWeight: "600",
                    borderRadius: "6px",
                    padding: "10px",
                    background: theme.palette.primary.main,
                    color: "#080808",
                    direction: "ltr",
                    "&:hover": { background: theme.palette.primary.dark },
                    "&.Mui-disabled": {
                      background: theme.palette.primary.main,
                      opacity: 0.6,
                      color: "#080808",
                    },
                  }}
                >
                  {sending
                    ? t("contact.sending")
                    : t("contact.sendButton")}
                </Button>
              </form>
            )}
          </motion.div>
        </Grid>

        {/* AVAILABILITY */}
        <Grid
          key="availability-grid"
          size={{ xs: 12, sm: 5, md: 5 }}
          sx={{
            background: theme.palette.background.paper,
            padding: "20px",
            borderRadius: "12px",
            order: { xs: 2, sm: 3, md: 3 },
          }}
        >
          <motion.div
            variants={fromLeft2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Stack
              direction={"row"}
              spacing={1}
              sx={{ alignItems: "center", marginBottom: "10px" }}
            >
              <Box
                sx={{
                  width: "8px",
                  height: "8px",
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
                  fontSize: "12px",
                  fontWeight: "600",
                  color: theme.palette.primary.main,
                }}
              >
                {t("contact.availabilityTitle")}
              </Typography>
            </Stack>

            <Typography
              variant="body2"
              sx={{
                fontFamily: portfolioSettings.fontType,
                color: theme.palette.text.secondary,
                fontSize: "12px",
                fontWeight: "300",
                lineHeight: 1.7,
                textAlign: isAr ? "right" : "left",
              }}
            >
              {t("contact.availabilityDesc")}
            </Typography>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
  // <=================================== COMPONENT
}