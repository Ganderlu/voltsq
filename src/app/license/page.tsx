"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShieldCheck, FileCheck, Globe, Building2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { Download } from "lucide-react";

export default function LicensePage() {
  const { t } = useLanguage();

  return (
    <Box sx={{ bgcolor: "var(--background)", minHeight: "100vh" }}>
      <Navbar />

      <Box
        sx={{
          pt: 15,
          pb: 8,
          textAlign: "center",
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
            }}
          >
            {t("license.title")}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "var(--text-secondary)",
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            {t("license.subtitle")}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                bgcolor: "var(--card)",
                border: "1px solid var(--border)",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <ShieldCheck size={32} color="#10b981" />
                  <Typography
                    variant="h5"
                    sx={{
                      ml: 2,
                      fontWeight: "bold",
                      color: "var(--foreground)",
                    }}
                  >
                    Registered Entity
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", mb: 2 }}
                >
                  Voltsq Invest is a fully registered financial services
                  provider, operating in compliance with international financial
                  laws.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "var(--primary)", fontWeight: "bold" }}
                  >
                    Registration Number:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    RF-2024-8892-GLOBAL
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                bgcolor: "var(--card)",
                border: "1px solid var(--border)",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <FileCheck size={32} color="#f59e0b" />
                  <Typography
                    variant="h5"
                    sx={{
                      ml: 2,
                      fontWeight: "bold",
                      color: "var(--foreground)",
                    }}
                  >
                    Compliance & Audit
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", mb: 2 }}
                >
                  Our platform undergoes regular third-party audits to verify
                  solvency, security protocols, and fair trading practices.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "var(--primary)", fontWeight: "bold" }}
                  >
                    Regulator:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Global Financial Markets Authority (GFMA)
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{ p: 3, border: "1px solid var(--border)", borderRadius: 2 }}
            >
              <Globe size={24} className="text-blue-500 mb-2" />
              <Typography
                variant="h6"
                sx={{ color: "var(--foreground)", mb: 1 }}
              >
                Global Coverage
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "var(--text-secondary)" }}
              >
                Licensed to operate in over 150 countries worldwide, excluding
                restricted jurisdictions.
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{ p: 3, border: "1px solid var(--border)", borderRadius: 2 }}
            >
              <Building2 size={24} className="text-purple-500 mb-2" />
              <Typography
                variant="h6"
                sx={{ color: "var(--foreground)", mb: 1 }}
              >
                Headquarters
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "var(--text-secondary)" }}
              >
                12 Financial District, Canary Wharf, London, United Kingdom.
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{ p: 3, border: "1px solid var(--border)", borderRadius: 2 }}
            >
              <ShieldCheck size={24} className="text-emerald-500 mb-2" />
              <Typography
                variant="h6"
                sx={{ color: "var(--foreground)", mb: 1 }}
              >
                Insurance
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "var(--text-secondary)" }}
              >
                Client funds are insured up to $1,000,000 against platform
                insolvency.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "var(--foreground)", mb: 2 }}
          >
            Download Company Documents
          </Typography>
          <Typography sx={{ color: "var(--muted-foreground)", mb: 4, maxWidth: 900 }}>
            Download professional documents (PDF via print) covering company licensing, compliance, risk disclosure, and privacy/security requirements.
          </Typography>

          <Grid container spacing={3}>
            {[
              {
                title: "Company Licence",
                desc: "Registration details, operational scope, compliance obligations, and verification.",
                href: "/license/documents/company-license",
              },
              {
                title: "AML / KYC Policy",
                desc: "CDD/EDD, sanctions screening, monitoring, escalation, recordkeeping, and governance.",
                href: "/license/documents/aml-kyc-policy",
              },
              {
                title: "Risk Disclosure",
                desc: "Market, leverage, liquidity, custody, and technology risks with acceptance statement.",
                href: "/license/documents/risk-disclosure",
              },
              {
                title: "Privacy & Security Policy",
                desc: "Data collection, usage, sharing, retention, security controls, and user rights.",
                href: "/license/documents/privacy-security-policy",
              },
            ].map((doc) => (
              <Grid key={doc.href} size={{ xs: 12, md: 6 }}>
                <Card
                  sx={{
                    bgcolor: "var(--card)",
                    border: "1px solid var(--border)",
                    height: "100%",
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "var(--foreground)" }}>
                      {doc.title}
                    </Typography>
                    <Typography sx={{ mt: 1, color: "var(--muted-foreground)", lineHeight: 1.7 }}>
                      {doc.desc}
                    </Typography>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 3 }}>
                      <Button
                        component={Link}
                        href={doc.href}
                        variant="contained"
                        startIcon={<Download size={18} />}
                        sx={{
                          bgcolor: "var(--primary)",
                          color: "var(--primary-foreground)",
                          "&:hover": { bgcolor: "var(--primary)", opacity: 0.9 },
                        }}
                      >
                        Open & Download
                      </Button>
                      <Button
                        component={Link}
                        href={doc.href}
                        variant="outlined"
                        sx={{
                          borderColor: "var(--border)",
                          color: "var(--foreground)",
                          "&:hover": { borderColor: "var(--primary)" },
                        }}
                      >
                        Preview
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
