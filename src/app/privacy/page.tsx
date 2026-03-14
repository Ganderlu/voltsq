"use client";

import { Box, Container, Typography, Paper, Divider } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <Box sx={{ bgcolor: "var(--background)", minHeight: "100vh" }}>
      <Navbar />
      
      <Box sx={{ pt: 15, pb: 8, textAlign: "center", bgcolor: "var(--card)" }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, color: "var(--foreground)" }}>
            Privacy Policy
          </Typography>
          <Typography variant="h6" sx={{ color: "var(--muted-foreground)", maxWidth: 800, mx: "auto" }}>
            Your privacy is our priority. Learn how we handle and protect your personal information.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 10 }}>
        <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, bgcolor: "var(--card)", border: "1px solid var(--border)", borderRadius: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "var(--foreground)" }}>
            1. Information Collection
          </Typography>
          <Typography variant="body1" sx={{ color: "var(--muted-foreground)", mb: 4, lineHeight: 1.8 }}>
            We collect personal information that you provide to us when you register on the platform, express an interest in obtaining information about us or our products and services, or otherwise contact us. This includes your name, email address, contact information, and financial data required for investment processing.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "var(--foreground)" }}>
            2. How We Use Your Information
          </Typography>
          <Typography variant="body1" sx={{ color: "var(--muted-foreground)", mb: 4, lineHeight: 1.8 }}>
            We use personal information collected via our platform for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "var(--foreground)" }}>
            3. Data Security
          </Typography>
          <Typography variant="body1" sx={{ color: "var(--muted-foreground)", mb: 4, lineHeight: 1.8 }}>
            We aim to protect your personal information through a system of organizational and technical security measures. We have implemented appropriate internal security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "var(--foreground)" }}>
            4. Your Privacy Rights
          </Typography>
          <Typography variant="body1" sx={{ color: "var(--muted-foreground)", mb: 4, lineHeight: 1.8 }}>
            In some regions, such as the European Economic Area (EEA) and United Kingdom (UK), you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time by contacting our support team.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "var(--foreground)" }}>
            5. Updates to This Policy
          </Typography>
          <Typography variant="body1" sx={{ color: "var(--muted-foreground)", mb: 4, lineHeight: 1.8 }}>
            We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible.
          </Typography>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
}
