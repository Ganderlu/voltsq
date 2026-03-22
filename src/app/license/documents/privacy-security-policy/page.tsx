"use client";

import { Box, Button, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Download, Lock } from "lucide-react";

export default function PrivacySecurityPolicyDocumentPage() {
  return (
    <Box sx={{ bgcolor: "var(--background)", minHeight: "100vh", color: "var(--foreground)" }}>
      <Box className="no-print">
        <Navbar />
      </Box>

      <Container maxWidth="md" sx={{ pt: { xs: 14, md: 18 }, pb: 10 }}>
        <Box className="no-print" sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<Download size={18} />}
            onClick={() => window.print()}
            sx={{
              bgcolor: "var(--primary)",
              color: "var(--primary-foreground)",
              "&:hover": { bgcolor: "var(--primary)", opacity: 0.9 },
            }}
          >
            Download as PDF
          </Button>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 7 },
            borderRadius: 3,
            bgcolor: "var(--card)",
            border: "1px solid var(--border)",
            color: "var(--card-foreground)",
            "@media print": {
              bgcolor: "#fff !important",
              color: "#000 !important",
              border: "none",
              boxShadow: "none",
              p: 0,
            },
          }}
        >
          <Stack spacing={2} sx={{ mb: 4, textAlign: "center" }}>
            <Typography variant="overline" sx={{ color: "var(--primary)", fontWeight: 800, letterSpacing: 2 }}>
              POLICY DOCUMENT
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900 }}>
              Privacy & Security Policy
            </Typography>
            <Typography sx={{ color: "var(--muted-foreground)", "@media print": { color: "#666 !important" } }}>
              Voltsq Investments Group
            </Typography>
          </Stack>

          <Divider sx={{ borderColor: "var(--border)", mb: 4 }} />

          <Stack spacing={3}>
            <Box>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                <Lock size={18} color="var(--primary)" />
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  1. Overview
                </Typography>
              </Stack>
              <Typography sx={{ color: "var(--muted-foreground)", lineHeight: 1.8, "@media print": { color: "#444 !important" } }}>
                This policy explains how we collect, use, store, and protect personal information. We apply security controls designed to preserve confidentiality, integrity, and availability of customer data.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                2. Information We Collect
              </Typography>
              <Stack spacing={1.25} sx={{ color: "var(--muted-foreground)", "@media print": { color: "#444 !important" } }}>
                <Typography>• Identity & contact data (name, email, phone, address where applicable).</Typography>
                <Typography>• Verification data for compliance (documents, proof of address where required).</Typography>
                <Typography>• Account and transaction data (deposits, withdrawals, trading history).</Typography>
                <Typography>• Technical data (device details, IP address, log data, cookies).</Typography>
              </Stack>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                3. How We Use Information
              </Typography>
              <Stack spacing={1.25} sx={{ color: "var(--muted-foreground)", "@media print": { color: "#444 !important" } }}>
                <Typography>• To provide and improve services, features, and customer support.</Typography>
                <Typography>• To verify identity and meet AML/KYC obligations.</Typography>
                <Typography>• To prevent fraud, unauthorized access, and abuse.</Typography>
                <Typography>• To send transactional notifications and important service updates.</Typography>
              </Stack>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                4. Data Sharing
              </Typography>
              <Typography sx={{ color: "var(--muted-foreground)", lineHeight: 1.8, "@media print": { color: "#444 !important" } }}>
                We may share information with vetted service providers (e.g., hosting, payments, identity verification) strictly for service delivery, as well as with authorities where legally required. We do not sell personal information.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                5. Security Controls
              </Typography>
              <Stack spacing={1.25} sx={{ color: "var(--muted-foreground)", "@media print": { color: "#444 !important" } }}>
                <Typography>• Access control with least-privilege principles.</Typography>
                <Typography>• Encryption in transit and secure storage practices.</Typography>
                <Typography>• Monitoring, logging, and incident response procedures.</Typography>
                <Typography>• Regular reviews of permissions and operational security.</Typography>
              </Stack>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                6. Retention
              </Typography>
              <Typography sx={{ color: "var(--muted-foreground)", lineHeight: 1.8, "@media print": { color: "#444 !important" } }}>
                We retain data for as long as necessary for legal compliance, risk management, dispute resolution, and service delivery, and we securely delete or anonymize when no longer required.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                7. Your Rights
              </Typography>
              <Typography sx={{ color: "var(--muted-foreground)", lineHeight: 1.8, "@media print": { color: "#444 !important" } }}>
                Depending on your location, you may request access, correction, deletion, or restriction of processing. To request changes, contact support@voltsq.com.
              </Typography>
            </Box>

            <Divider sx={{ borderColor: "var(--border)" }} />

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                Contact
              </Typography>
              <Typography sx={{ color: "var(--muted-foreground)", mt: 0.5, "@media print": { color: "#666 !important" } }}>
                For privacy and security requests, contact support@voltsq.com.
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Container>

      <Box className="no-print">
        <Footer />
      </Box>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background-color: #fff !important;
            color: #000 !important;
          }
          @page {
            margin: 2cm;
          }
        }
      `}</style>
    </Box>
  );
}

