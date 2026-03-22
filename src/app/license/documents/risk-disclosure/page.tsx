"use client";

import { Box, Button, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { AlertTriangle, Download } from "lucide-react";

export default function RiskDisclosureDocumentPage() {
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
              DISCLOSURE DOCUMENT
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900 }}>
              Risk Disclosure Statement
            </Typography>
            <Typography sx={{ color: "var(--muted-foreground)", "@media print": { color: "#666 !important" } }}>
              Voltsq Investments Group
            </Typography>
          </Stack>

          <Divider sx={{ borderColor: "var(--border)", mb: 4 }} />

          <Stack spacing={3}>
            <Box>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                <AlertTriangle size={18} color="var(--primary)" />
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Important Notice
                </Typography>
              </Stack>
              <Typography sx={{ color: "var(--muted-foreground)", lineHeight: 1.8, "@media print": { color: "#444 !important" } }}>
                Trading and investing involve substantial risk and may not be suitable for all investors. You should carefully consider your financial situation, objectives, and risk tolerance before using any trading or investment service.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                1. Market Risk
              </Typography>
              <Typography sx={{ color: "var(--muted-foreground)", lineHeight: 1.8, "@media print": { color: "#444 !important" } }}>
                Prices may move rapidly due to volatility, liquidity changes, economic events, and market sentiment. Losses can occur quickly and may exceed expectations.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                2. Leverage Risk
              </Typography>
              <Typography sx={{ color: "var(--muted-foreground)", lineHeight: 1.8, "@media print": { color: "#444 !important" } }}>
                Leveraged products amplify both gains and losses. A small market movement may result in a large loss. Use leverage responsibly and consider stop-loss and position sizing practices.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                3. Liquidity & Execution Risk
              </Typography>
              <Typography sx={{ color: "var(--muted-foreground)", lineHeight: 1.8, "@media print": { color: "#444 !important" } }}>
                Orders may be executed at different prices than expected due to slippage, spreads, or limited liquidity. During high volatility, execution delays can occur.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                4. Technology & Operational Risk
              </Typography>
              <Typography sx={{ color: "var(--muted-foreground)", lineHeight: 1.8, "@media print": { color: "#444 !important" } }}>
                Service interruptions, connectivity issues, third-party outages, or platform maintenance may affect the ability to place or manage trades. Keep your account credentials secure and use multi-factor protections where available.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                5. Counterparty & Custody Risk
              </Typography>
              <Typography sx={{ color: "var(--muted-foreground)", lineHeight: 1.8, "@media print": { color: "#444 !important" } }}>
                Depending on product structure, you may be exposed to counterparty and custody risks. Understand how assets are held, how withdrawals work, and what safeguards apply.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                6. No Investment Advice
              </Typography>
              <Typography sx={{ color: "var(--muted-foreground)", lineHeight: 1.8, "@media print": { color: "#444 !important" } }}>
                Content on the platform is for informational purposes only and does not constitute financial, legal, or tax advice. Seek professional advice where appropriate.
              </Typography>
            </Box>

            <Divider sx={{ borderColor: "var(--border)" }} />

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                Acceptance
              </Typography>
              <Typography sx={{ color: "var(--muted-foreground)", mt: 0.5, "@media print": { color: "#666 !important" } }}>
                By using the platform, you acknowledge that you understand and accept these risks. For questions, contact support@voltsq.com.
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

