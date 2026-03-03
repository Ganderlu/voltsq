"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Alert,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { submitContactForm } from "./actions";
import { Mail, MapPin, Phone, Send } from "lucide-react";
// import { useLanguage } from "@/context/LanguageContext"; // Removing temporarily if problematic, or keep if context is client-safe

export default function ContactUsPage() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  // const { t } = useLanguage();

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    try {
      const res = await submitContactForm(formData);
      if (res.success) {
        setStatus("success");
        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement;
        form?.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <Box sx={{ bgcolor: "var(--background)", minHeight: "100vh" }}>
      <Navbar />

      {/* Page Header */}
      <Box
        sx={{
          pt: 15,
          pb: 8,
          textAlign: "center",
          background:
            "linear-gradient(180deg, var(--background) 0%, var(--card) 100%)",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: "var(--foreground)",
              mb: 2,
              letterSpacing: "-0.02em",
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "var(--muted-foreground)",
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Have questions? We're here to help. Reach out to our team for any
            inquiries or support.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <Grid container spacing={6}>
          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <InfoCard
                icon={<Mail size={24} className="text-emerald-500" />}
                title="Email Us"
                subtitle="For general inquiries and support."
                content="support@voltsq.com"
                bg="rgba(16, 185, 129, 0.1)"
              />
              <InfoCard
                icon={<Phone size={24} className="text-amber-500" />}
                title="Call Us"
                subtitle="Mon-Fri from 8am to 5pm."
                content="+1 (555) 123-4567"
                bg="rgba(245, 158, 11, 0.1)"
              />
              <InfoCard
                icon={<MapPin size={24} className="text-blue-500" />}
                title="Visit Us"
                subtitle="Our global headquarters."
                content="12 Financial District, Canary Wharf, London, UK"
                bg="rgba(59, 130, 246, 0.1)"
              />
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Card
              elevation={0}
              sx={{
                bgcolor: "var(--card)",
                border: "1px solid",
                borderColor: "var(--border)",
                borderRadius: 4,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Typography
                  variant="h5"
                  sx={{ mb: 1, fontWeight: "bold", color: "var(--foreground)" }}
                >
                  Send us a Message
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mb: 4, color: "var(--muted-foreground)" }}
                >
                  Fill out the form below and we'll get back to you shortly.
                </Typography>

                {status === "success" && (
                  <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                    Message sent successfully! We'll get back to you soon.
                  </Alert>
                )}
                {status === "error" && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    Failed to send message. Please try again.
                  </Alert>
                )}

                <form id="contact-form" action={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <CustomTextField
                        name="name"
                        label="Your Name"
                        placeholder="John Doe"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomTextField
                        name="email"
                        type="email"
                        label="Email Address"
                        placeholder="john@example.com"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField
                        name="subject"
                        label="Subject"
                        placeholder="How can we help?"
                        required={false}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField
                        name="message"
                        label="Message"
                        multiline
                        rows={5}
                        placeholder="Tell us more about your inquiry..."
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={status === "loading"}
                        startIcon={
                          status === "loading" ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <Send size={18} />
                          )
                        }
                        sx={{
                          bgcolor: "var(--primary)",
                          color: "var(--primary-foreground)",
                          py: 1.5,
                          fontWeight: "bold",
                          borderRadius: 2,
                          textTransform: "none",
                          fontSize: "1rem",
                          boxShadow: "0 4px 14px 0 rgba(0,118,255,0.39)",
                          "&:hover": {
                            bgcolor: "var(--primary)",
                            opacity: 0.9,
                            boxShadow: "0 6px 20px rgba(0,118,255,0.23)",
                          },
                        }}
                      >
                        {status === "loading" ? "Sending..." : "Send Message"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}

function InfoCard({
  icon,
  title,
  subtitle,
  content,
  bg,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  content: string;
  bg: string;
}) {
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "var(--card)",
        border: "1px solid",
        borderColor: "var(--border)",
        borderRadius: 3,
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: "var(--primary)",
        },
      }}
    >
      <CardContent sx={{ display: "flex", alignItems: "start", gap: 3, p: 3 }}>
        <Box
          sx={{
            p: 1.5,
            bgcolor: bg,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: "var(--foreground)",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--muted-foreground)", mb: 0.5 }}
          >
            {subtitle}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "var(--primary)", fontWeight: "600" }}
          >
            {content}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

function CustomTextField({
  name,
  label,
  placeholder,
  type = "text",
  multiline = false,
  rows = 1,
  required = true,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
}) {
  return (
    <TextField
      fullWidth
      name={name}
      label={label}
      placeholder={placeholder}
      type={type}
      multiline={multiline}
      rows={rows}
      required={required}
      variant="outlined"
      InputLabelProps={{ shrink: true }}
      sx={{
        "& .MuiOutlinedInput-root": {
          color: "var(--foreground)",
          bgcolor: "var(--background)",
          borderRadius: 2,
          "& fieldset": {
            borderColor: "var(--input)",
          },
          "&:hover fieldset": {
            borderColor: "var(--ring)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "var(--ring)",
            borderWidth: 2,
          },
        },
        "& .MuiInputLabel-root": {
          color: "var(--muted-foreground)",
          "&.Mui-focused": {
            color: "var(--primary)",
          },
        },
        "& .MuiInputBase-input::placeholder": {
          color: "var(--muted-foreground)",
          opacity: 0.5,
        },
      }}
    />
  );
}
