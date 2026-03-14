"use client";

import { Box, Container, Typography, Paper, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { ShieldCheck, Award, FileText, Globe } from "lucide-react";

export default function CertificationPage() {
  const certifications = [
    {
      title: "Financial Services License",
      description:
        "Authorized and regulated by the Financial Services Authority (FSA) for global digital asset management.",
      icon: <ShieldCheck size={40} className="text-primary" />,
      id: "FSA-2026-VOLTSQ",
    },
    {
      title: "Data Security Certification",
      description:
        "ISO/IEC 27001 certified for information security management systems and user data protection.",
      icon: <Award size={40} className="text-primary" />,
      id: "ISO-27001-2026",
    },
    {
      title: "Anti-Money Laundering (AML)",
      description:
        "Full compliance with global AML and KYC protocols to ensure safe and legal investment environments.",
      icon: <FileText size={40} className="text-primary" />,
      id: "AML-KYC-COMPLIANT",
    },
    {
      title: "Global Investment Provider",
      description:
        "Certified to operate as a cross-border investment entity in over 150 jurisdictions worldwide.",
      icon: <Globe size={40} className="text-primary" />,
      id: "GIP-CERT-GLOBAL",
    },
  ];

  return (
    <Box sx={{ bgcolor: "var(--background)", minHeight: "100vh" }}>
      <Navbar />

      <Box sx={{ pt: 15, pb: 8, textAlign: "center", bgcolor: "var(--card)" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, mb: 2, color: "var(--foreground)" }}
          >
            Our Certifications
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "var(--muted-foreground)", maxWidth: 800, mx: "auto" }}
          >
            Voltsq is fully regulated and certified to provide
            institutional-grade investment services globally.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {certifications.map((cert, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  bgcolor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    borderColor: "var(--primary)",
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{cert.icon}</Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: "var(--foreground)" }}
                >
                  {cert.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "var(--muted-foreground)", flex: 1 }}
                >
                  {cert.description}
                </Typography>
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    bgcolor: "var(--background)",
                    borderRadius: 2,
                    border: "1px dashed var(--border)",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: "var(--muted-foreground)",
                      fontWeight: 700,
                      letterSpacing: 1,
                    }}
                  >
                    REGISTRATION ID: {cert.id}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: 10,
            textAlign: "center",
            p: 6,
            bgcolor: "var(--card)",
            borderRadius: 4,
            border: "1px solid var(--border)",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, mb: 4, color: "var(--foreground)" }}
          >
            Legal Verification
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "var(--muted-foreground)",
              mb: 4,
              maxWidth: 800,
              mx: "auto",
            }}
          >
            For official verification of our legal status or to request
            documentation for institutional partnerships, please contact our
            legal department directly.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              flexWrap: "wrap",
            }}
          >
            <Image
              src="/images/financial.png"
              alt="Financial Commission"
              width={120}
              height={40}
            />
            <Image
              src="/images/regulation.png"
              alt="Regulatory Body"
              width={120}
              height={40}
            />
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
