"use client";

import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQSection() {
  const faqs = [
    {
      question: "How do I create my account?",
      answer: "Creating an account is simple. Click on the 'Sign Up' button on the top right of the landing page, fill in your personal details, and follow the security steps to verify your email. Once completed, you'll have immediate access to your dashboard and a $10,000 demo account to start practicing."
    },
    {
      question: "How long does my deposit take before it can reflect on my Voltsq Investments account dashboard?",
      answer: "Deposits typically reflect in your account within 10 to 30 minutes after the transaction is confirmed on the blockchain. For bank transfers, it may take 1-3 business days depending on your location and bank processing times."
    },
    {
      question: "How many times can I make a deposit?",
      answer: "There is no limit to the number of deposits you can make. You can fund your account as often as you like to increase your investment capital or join multiple investment plans simultaneously."
    },
    {
      question: "How do I make a deposit?",
      answer: "Log in to your dashboard, navigate to the 'Deposit' section, and choose your preferred payment method (Crypto or Bank Transfer). Follow the on-screen instructions to complete the transfer. Make sure to upload your proof of payment if required for faster processing."
    },
    {
      question: "How many years has it been functional?",
      answer: "Voltsq Investments has been operational and serving global investors since 2018. Over the years, we have expanded our services to include advanced crypto trading, real estate investment pools, and institutional-grade wealth management."
    },
    {
      question: "How long does it take to process my withdrawal?",
      answer: "Withdrawal requests are processed within 24 hours. Once approved, the funds are sent immediately. Crypto withdrawals usually arrive within an hour, while bank transfers may take 2-5 business days depending on the receiving bank."
    },
  ];

  return (
    <Box sx={{ bgcolor: "var(--background)", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
            gap: 4,
          }}
        >
          {/* FAQ LIST */}
          <Paper
            sx={{
              p: { xs: 2, md: 4 },
              bgcolor: "var(--card)",
              color: "var(--card-foreground)",
              border: "1px solid",
              borderColor: "var(--border)",
              borderRadius: 4
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: "var(--foreground)" }}>
              Frequently Asked Questions
            </Typography>

            {faqs.map((f, index) => (
              <Accordion
                key={index}
                elevation={0}
                disableGutters
                sx={{
                  bgcolor: "transparent",
                  color: "var(--foreground)",
                  borderBottom: index !== faqs.length - 1 ? "1px solid var(--border)" : "none",
                  "&:before": { display: "none" },
                  py: 1
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon sx={{ color: "var(--primary)" }} />
                  }
                  sx={{ px: 0 }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: "1.1rem" }}>{f.question}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0, pb: 2 }}>
                  <Typography sx={{ color: "var(--muted-foreground)", lineHeight: 1.7 }}>
                    {f.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>

          {/* HELP CARD */}
          <Paper
            sx={{
              bgcolor: "var(--primary)",
              color: "var(--primary-foreground)",
              p: { xs: 3, md: 4 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Need any help!
              </Typography>
              <Typography sx={{ opacity: 0.9, mb: 4 }}>
                Find answers to frequently asked questions about voltsq
              </Typography>
            </Box>

            <Button
              variant="contained"
              sx={{
                bgcolor: "var(--background)",
                color: "var(--foreground)",
                borderRadius: 999,
                py: 1.2,
                fontWeight: 600,
                "&:hover": { bgcolor: "var(--muted)" },
              }}
            >
              Contact Us
            </Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
