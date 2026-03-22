"use client";

import { Box, Button, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Download, ShieldCheck } from "lucide-react";

export default function AmlKycPolicyDocumentPage() {
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
              AML / KYC Policy
            </Typography>
            <Typography sx={{ color: "var(--muted-foreground)", "@media print": { color: "#666 !important" } }}>
              Voltsq Investments Group
            </Typography>
          </Stack>

          <Divider sx={{ borderColor: "var(--border)", mb: 4 }} />

          <Stack spacing={3}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                1. Purpose
              </Typography>
              <Typography sx={{ color: "var(--muted-foreground)", lineHeight: 1.8, "@media print": { color: "#444 !important" } }}>
                This Anti-Money Laundering (AML) and Know Your Customer (KYC) Policy sets out the controls Voltsq uses to deter, detect, and report money laundering, terrorist financing, fraud, and sanctions breaches.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                2. Scope
              </Typography>
              <Typography sx={{ color: "var(--muted-foreground)", lineHeight: 1.8, "@media print": { color: "#444 !important" } }}>
                This policy applies to all customers, beneficial owners, staff, agents, and third-party service providers involved in onboarding, payments, trading, investments, withdrawals, and support.
              </Typography>
            </Box>

            <Box>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                <ShieldCheck size={18} color="var(--primary)" />
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  3. Customer Due Diligence (CDD)
                </Typography>
              </Stack>
              <Stack spacing={1.25} sx={{ color: "var(--muted-foreground)", "@media print": { color: "#444 !important" } }}>
                <Typography>• Collect identifying information and verify identity using reliable sources.</Typography>
                <Typography>• Confirm beneficial ownership for entities and high-risk relationships.</Typography>
                <Typography>• Assess customer risk profile based on geography, source of funds, and product use.</Typography>
              </Stack>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                4. Enhanced Due Diligence (EDD)
              </Typography>
              <Stack spacing={1.25} sx={{ color: "var(--muted-foreground)", "@media print": { color: "#444 !important" } }}>
                <Typography>• Apply EDD for politically exposed persons (PEPs), high-risk jurisdictions, or unusual activity.</Typography>
                <Typography>• Obtain additional documentation for source of funds and source of wealth where required.</Typography>
                <Typography>• Apply senior management approval for high-risk onboarding and limit account capabilities if needed.</Typography>
              </Stack>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                5. Sanctions Screening
              </Typography>
              <Typography sx={{ color: "var(--muted-foreground)", lineHeight: 1.8, "@media print": { color: "#444 !important" } }}>
                Customers, beneficial owners, and transactions are screened against applicable sanctions lists. Confirmed matches are rejected or frozen in accordance with legal obligations and internal escalation procedures.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                6. Ongoing Monitoring
              </Typography>
              <Stack spacing={1.25} sx={{ color: "var(--muted-foreground)", "@media print": { color: "#444 !important" } }}>
                <Typography>• Monitor transactions for unusual patterns and velocity anomalies.</Typography>
                <Typography>• Review deposits/withdrawals for consistency with customer profile and declared source of funds.</Typography>
                <Typography>• Re-verify information when risk changes or required by regulation.</Typography>
              </Stack>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                7. Reporting & Escalation
              </Typography>
              <Typography sx={{ color: "var(--muted-foreground)", lineHeight: 1.8, "@media print": { color: "#444 !important" } }}>
                Suspicious activity is escalated to compliance for investigation. Where required by law, Voltsq will file reports with the relevant authorities and maintain confidentiality in accordance with reporting rules.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                8. Recordkeeping
              </Typography>
              <Typography sx={{ color: "var(--muted-foreground)", lineHeight: 1.8, "@media print": { color: "#444 !important" } }}>
                KYC records, transaction logs, and compliance decisions are retained for a legally required period (or longer where appropriate), with controlled access and audit trails.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                9. Training & Governance
              </Typography>
              <Typography sx={{ color: "var(--muted-foreground)", lineHeight: 1.8, "@media print": { color: "#444 !important" } }}>
                Staff receive AML/KYC training and periodic refreshers. This policy is reviewed regularly and updated to reflect regulatory changes, operational developments, and risk assessments.
              </Typography>
            </Box>

            <Divider sx={{ borderColor: "var(--border)" }} />

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                Contact
              </Typography>
              <Typography sx={{ color: "var(--muted-foreground)", mt: 0.5, "@media print": { color: "#666 !important" } }}>
                For AML/KYC policy requests or compliance questions, contact support@voltsq.com.
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

