"use client";

import {
  Box,
  Container,
  Typography,
  Stack,
  Divider,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { useLanguage } from "@/context/LanguageContext";
import {
  Download,
  ShieldCheck,
  TrendingUp,
  Globe,
  Users,
  Building2,
  Landmark,
  Target,
  Award,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CompanyProfilePage() {
  const { t } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box
      sx={{
        bgcolor: "var(--background)",
        minHeight: "100vh",
        color: "var(--foreground)",
      }}
    >
      {/* Hide navbar on print */}
      <Box className="no-print">
        <Navbar />
      </Box>

      <Container maxWidth="lg" sx={{ pt: { xs: 15, md: 20 }, pb: 10 }}>
        {/* ACTION BAR - Hide on print */}
        <Box
          className="no-print"
          sx={{ mb: 4, display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            variant="contained"
            startIcon={<Download size={20} />}
            onClick={handlePrint}
            sx={{
              bgcolor: "var(--primary)",
              color: "var(--primary-foreground)",
              "&:hover": { opacity: 0.9, bgcolor: "var(--primary)" },
            }}
          >
            Download as PDF
          </Button>
        </Box>

        {/* PROFILE CONTENT - Professional Document Style */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 10 },
            border: "1px solid var(--border)",
            borderRadius: "16px",
            bgcolor: "var(--card)",
            color: "var(--card-foreground)",
            "@media print": {
              p: 0,
              border: "none",
              boxShadow: "none",
              bgcolor: "#fff !important",
              color: "#000 !important",
            },
          }}
        >
          {/* HEADER */}
          <Box sx={{ mb: 8, textAlign: "center" }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: "32px", md: "48px" },
                color: "inherit",
              }}
            >
              Voltsq
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "var(--muted-foreground)",
                letterSpacing: 1,
                mb: 4,
                fontWeight: 500,
                "@media print": { color: "#666 !important" },
              }}
            >
              COMPANY PROFILE 2026
            </Typography>
            <Divider
              sx={{
                width: "80px",
                height: "4px",
                bgcolor: "var(--primary)",
                mx: "auto",
                mb: 4,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: "var(--foreground)",
                opacity: 0.8,
                maxWidth: "600px",
                mx: "auto",
                fontStyle: "italic",
                "@media print": { color: "#444 !important" },
              }}
            >
              "Empowering global investors with advanced technology,
              transparency, and superior financial strategies."
            </Typography>
          </Box>

          {/* EXECUTIVE SUMMARY */}
          <Box sx={{ mb: 10 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 4,
                display: "flex",
                alignItems: "center",
                gap: 2,
                color: "inherit",
              }}
            >
              <Target size={32} color="var(--primary)" /> Executive Summary
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                color: "inherit",
                opacity: 0.9,
                fontSize: "1.1rem",
                "@media print": { color: "#333 !important" },
              }}
            >
              Voltsq is a premier digital asset investment firm dedicated to
              revolutionizing how individuals and institutions grow their
              wealth. In an era of rapid digital transformation, we provide
              simpler, more transparent, and highly profitable ways to achieve
              financial success. Our platform leverages advanced trading
              algorithms and expert market analysis to deliver consistent
              results across Forex, Metrics, Investments, and Trades markets.
            </Typography>
          </Box>

          {/* MISSION & VISION */}
          <Grid container spacing={6} sx={{ mb: 10 }}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 4,
                  bgcolor: "var(--secondary)",
                  borderRadius: "12px",
                  height: "100%",
                  "@media print": { bgcolor: "#f9f9f9 !important" },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    color: "inherit",
                  }}
                >
                  <Award size={24} color="var(--primary)" /> Our Mission
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "inherit",
                    opacity: 0.8,
                    lineHeight: 1.7,
                    "@media print": { color: "#444 !important" },
                  }}
                >
                  To be the ultimate partner for skilled investors worldwide by
                  offering a diverse range of high-yield investment options,
                  backed by quality guidance and relationships of trust.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 4,
                  bgcolor: "var(--secondary)",
                  borderRadius: "12px",
                  height: "100%",
                  "@media print": { bgcolor: "#f9f9f9 !important" },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    color: "inherit",
                  }}
                >
                  <Globe size={24} color="var(--primary)" /> Our Vision
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "inherit",
                    opacity: 0.8,
                    lineHeight: 1.7,
                    "@media print": { color: "#444 !important" },
                  }}
                >
                  To become a leading force in global investment innovation,
                  fostering a worldwide community where financial growth is
                  accessible, secure, and technologically driven.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* CORE PRINCIPLES */}
          <Box sx={{ mb: 10 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 6, color: "inherit" }}
            >
              Core Operating Principles
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  title: "Transparency",
                  desc: "We maintain clear and open communication regarding all investment strategies and performance metrics.",
                  icon: <ShieldCheck size={28} />,
                },
                {
                  title: "Integrity",
                  desc: "Our commitment to ethical financial practices is the cornerstone of every relationship we build.",
                  icon: <Building2 size={28} />,
                },
                {
                  title: "Performance",
                  desc: "We utilize cutting-edge AI and market analysis to ensure superior returns for our global clients.",
                  icon: <TrendingUp size={28} />,
                },
                {
                  title: "Collaboration",
                  desc: "We believe in growing together with our community of traders, educators, and investors.",
                  icon: <Users size={28} />,
                },
              ].map((item, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <Stack spacing={2}>
                    <Box sx={{ color: "var(--primary)" }}>{item.icon}</Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: "inherit" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "var(--muted-foreground)",
                        lineHeight: 1.6,
                        "@media print": { color: "#666 !important" },
                      }}
                    >
                      {item.desc}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* INVESTMENT SECTORS */}
          <Box
            sx={{
              mb: 10,
              p: { xs: 4, md: 6 },
              bgcolor: "#000",
              borderRadius: "20px",
              color: "#fff",
              "@media print": {
                bgcolor: "#000 !important",
                color: "#fff !important",
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 4, color: "#fff" }}
            >
              Primary Investment Sectors
            </Typography>
            <Typography variant="body1" sx={{ mb: 6, opacity: 0.8, color: "#fff" }}>
              Voltsq focuses on four core pillars to deliver superior financial results and transparency:
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  title: "Forex",
                  desc: "Advanced currency trading leveraging the world's most liquid market with tight spreads and real-time execution.",
                },
                {
                  title: "Metrics",
                  desc: "Comprehensive data analytics and performance tracking to provide investors with deep insights and informed decision-making tools.",
                },
                {
                  title: "Investments",
                  desc: "Diverse funding solutions and tailored investment plans designed to maximize capital growth and passive income streams.",
                },
                {
                  title: "Trades",
                  desc: "Strategic market execution across multiple asset classes, focused on precision, security, and consistent results.",
                },
              ].map((sector, idx) => (
                  <Grid item xs={12} sm={6} key={idx}>
                    <Box sx={{ borderLeft: "3px solid var(--primary)", pl: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, mb: 1, color: "#fff" }}
                      >
                        {sector.title}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.7, color: "#fff" }}>
                        {sector.desc}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* INVESTMENT PLANS */}
            <Box sx={{ mb: 10 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 6, color: "inherit" }}>
                Exclusive Investment Plans
              </Typography>
              <Typography variant="body1" sx={{ mb: 6, opacity: 0.9, lineHeight: 1.8, color: "inherit", "@media print": { color: "#333 !important" } }}>
                Voltsq offers a range of meticulously designed investment plans to cater to various financial goals and capital sizes. Each plan is engineered for maximum stability and consistent returns.
              </Typography>
              <Grid container spacing={4}>
                {[
                  {
                    name: "Rare Plan",
                    rate: "3% Daily",
                    range: "$100 - $999",
                    desc: "Perfect for entry-level investors looking to start their digital asset journey. This plan offers a steady 3% daily return with access to our real-time market dashboard and 24/7 standard support.",
                  },
                  {
                    name: "Business Plan",
                    rate: "10% Daily",
                    range: "$1,000 - $9,999",
                    desc: "Designed for active traders, the Business Plan provides a significant 10% daily return. It includes priority fast-track support, monthly portfolio reviews, and advanced risk management tools.",
                  },
                  {
                    name: "Gold Plan",
                    rate: "15% Daily",
                    range: "$10,000 - $49,999",
                    desc: "Our VIP-tier plan for substantial portfolios. Enjoy a 15% daily return, a dedicated senior account manager, instant withdrawal processing, and exclusive networking event invitations.",
                  },
                  {
                    name: "Real Estate Plan",
                    rate: "20% Weekly",
                    range: "$50,000 - $400,000",
                    desc: "Focused on institutional-grade fractional property ownership. This plan offers a 20% weekly yield with direct ownership benefits and expert tax optimization consultations.",
                  },
                  {
                    name: "Promo Plan",
                    rate: "30% Weekly",
                    range: "$2,000 (Fixed)",
                    desc: "A high-yield promotional opportunity with a fixed entry. It guarantees a 30% weekly return with principal protection and automated daily profit distributions for maximum efficiency.",
                  },
                  {
                    name: "Joint Investment Plan",
                    rate: "50% Daily",
                    range: "$10,000 - $30,000",
                    desc: "Our most aggressive growth plan focused on collaborative wealth building. It delivers a staggering 50% daily return through shared risk-and-reward structures and monthly joint strategy meetings.",
                  },
                ].map((plan, idx) => (
                  <Grid item xs={12} md={6} key={idx}>
                    <Box sx={{ p: 4, bgcolor: "var(--secondary)", borderRadius: "16px", border: "1px solid var(--border)", height: "100%", "@media print": { bgcolor: "#fff !important", border: "1px solid #eee !important" } }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: "var(--primary)" }}>{plan.name}</Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "inherit", px: 1.5, py: 0.5, bgcolor: "var(--background)", borderRadius: "20px", border: "1px solid var(--border)", "@media print": { bgcolor: "#f0f0f0 !important" } }}>{plan.rate}</Typography>
                      </Stack>
                      <Typography variant="body2" sx={{ fontWeight: 700, mb: 2, color: "inherit" }}>Entry: {plan.range}</Typography>
                      <Typography variant="body2" sx={{ color: "var(--muted-foreground)", lineHeight: 1.7, "@media print": { color: "#555 !important" } }}>{plan.desc}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* WHY CHOOSE US */}
            <Box sx={{ mb: 10 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 6, color: "inherit" }}>
                Why Choose Voltsq 
              </Typography>
              <Grid container spacing={4}>
                {[
                  {
                    title: "Advanced Technology",
                    desc: "Our proprietary trading algorithms and real-time data analytics give our investors a competitive edge in the global markets.",
                  },
                  {
                    title: "Security First",
                    desc: "We prioritize the safety of your assets with top-tier encryption, Firebase-backed authentication, and strict regulatory compliance.",
                  },
                  {
                    title: "Diverse Portfolio",
                    desc: "From Forex and Stocks to Real Estate and Emerging Markets, we provide access to a wide range of profitable investment vehicles.",
                  },
                  {
                    title: "Expert Guidance",
                    desc: "Our team of seasoned financial advisors and market analysts provide the insights needed to navigate complex financial landscapes.",
                  },
                ].map((item, idx) => (
                  <Grid item xs={12} sm={6} key={idx}>
                    <Box sx={{ p: 4, bgcolor: "var(--secondary)", borderRadius: "12px", border: "1px solid var(--border)", "@media print": { bgcolor: "#f9f9f9 !important", border: "1px solid #eee !important" } }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "inherit" }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "var(--muted-foreground)", lineHeight: 1.6, "@media print": { color: "#666 !important" } }}>
                        {item.desc}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* TEAM MEMBERS */}
            <Box sx={{ mb: 10 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 6, color: "inherit" }}>
                Our Leadership Team
              </Typography>
              <Grid container spacing={4}>
                {[
                  { name: "Thomas Kralow", role: "Financial Adviser", desc: "A world-renowned trader and financial educator with over a decade of market experience." },
                  { name: "Alexander Volkov", role: "Chief Executive Officer", desc: "Leading the strategic vision and global expansion of Voltsq Investments." },
                  { name: "Sarah Jenkins", role: "Head of Trading Strategy", desc: "Specializing in algorithmic trading and risk management across multiple asset classes." },
                  { name: "Marcus Thorne", role: "Chief Technology Officer", desc: "Architecting the secure and scalable infrastructure that powers our investment platform." },
                ].map((member, idx) => (
                  <Grid item xs={12} sm={6} md={3} key={idx}>
                    <Box sx={{ textAlign: "center" }}>
                      <Box sx={{ width: "80px", height: "80px", bgcolor: "var(--primary)", borderRadius: "50%", mx: "auto", mb: 2, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "24px" }}>
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "inherit" }}>{member.name}</Typography>
                      <Typography variant="caption" sx={{ color: "var(--primary)", fontWeight: 600, display: "block", mb: 1 }}>{member.role}</Typography>
                      <Typography variant="body2" sx={{ color: "var(--muted-foreground)", fontSize: "0.8rem", lineHeight: 1.4, "@media print": { color: "#777 !important" } }}>{member.desc}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* TESTIMONIALS */}
            <Box sx={{ mb: 10 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 6, color: "inherit" }}>
                What Our Investors Say
              </Typography>
              <Grid container spacing={4}>
                {[
                  {
                    name: "James Wilson",
                    role: "Professional Trader",
                    content: "Voltsq has completely transformed my approach to digital assets. Their security protocols and intuitive interface are second to none in the industry.",
                  },
                  {
                    name: "Sarah Chen",
                    role: "Portfolio Manager",
                    content: "The real-time insights and automated trading features have helped me consistently outperform the market. Highly recommended for serious investors.",
                  },
                  {
                    name: "David Thompson",
                    role: "Strategic Investor",
                    content: "Transparency is key for me, and Voltsq delivers. Every transaction is clear, and the performance reports are incredibly detailed.",
                  }
                ].map((t, idx) => (
                  <Grid item xs={12} md={4} key={idx}>
                    <Box sx={{ p: 4, bgcolor: "var(--card)", border: "1px solid var(--border)", borderRadius: "16px", height: "100%", "@media print": { bgcolor: "#fff !important", border: "1px solid #eee !important" } }}>
                      <Typography sx={{ fontStyle: "italic", mb: 3, color: "inherit", opacity: 0.9, lineHeight: 1.6, "@media print": { color: "#444 !important" } }}>
                        "{t.content}"
                      </Typography>
                      <Divider sx={{ mb: 2, borderColor: "var(--border)" }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "inherit" }}>{t.name}</Typography>
                      <Typography variant="caption" sx={{ color: "var(--muted-foreground)", "@media print": { color: "#888 !important" } }}>{t.role}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* GLOBAL IMPACT */}
          <Box sx={{ mb: 10 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 6, color: "inherit" }}
            >
              Global Presence & Scale
            </Typography>
            <Grid container spacing={4} sx={{ textAlign: "center" }}>
              {[
                { label: "Active Investors", val: "25,000+" },
                { label: "Countries Served", val: "120+" },
                { label: "Assets Managed", val: "$50M+" },
                { label: "Traders Globally", val: "15,000+" },
              ].map((stat, idx) => (
                <Grid item xs={6} md={3} key={idx}>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 800, color: "var(--primary)", mb: 1 }}
                  >
                    {stat.val}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--muted-foreground)",
                      fontWeight: 600,
                      "@media print": { color: "#666 !important" },
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* REGULATORY & TRUST */}
          <Box sx={{ mb: 10 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 4,
                display: "flex",
                alignItems: "center",
                gap: 2,
                color: "inherit",
              }}
            >
              <Landmark size={32} color="var(--primary)" /> Licensing & Security
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                color: "inherit",
                opacity: 0.9,
                "@media print": { color: "#333 !important" },
              }}
            >
              We operate under strict regulatory standards to ensure the safety
              and security of your investments. Our platform utilizes
              Firebase-backed authentication and top-tier data security
              standards to protect your assets and information.
            </Typography>
          </Box>

          {/* FOOTER OF DOC */}
          <Divider sx={{ mb: 6, borderColor: "var(--border)" }} />
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "inherit" }}
              >
                VOLTSQ INVESTMENTS GROUP
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "var(--muted-foreground)",
                  "@media print": { color: "#999 !important" },
                }}
              >
                Official Company Documentation · © 2026
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--muted-foreground)",
                  "@media print": { color: "#666 !important" },
                }}
              >
                support@voltsq.com
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--muted-foreground)",
                  "@media print": { color: "#666 !important" },
                }}
              >
                www.voltsq.com
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      <Box className="no-print">
        <Footer />
      </Box>

      {/* Print Styles */}
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
          /* Ensure all text is dark and background is white when printing */
          .MuiPaper-root {
            background-color: #fff !important;
            color: #000 !important;
          }
        }
      `}</style>
    </Box>
  );
}
