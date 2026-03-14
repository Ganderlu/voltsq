"use client";

import { Box, Container, Typography, Avatar, Rating } from "@mui/material";

const testimonials = [
  {
    name: "James Wilson",
    role: "Professional Trader",
    content: "Voltsq has completely transformed my approach to digital assets. Their security protocols and intuitive interface are second to none in the industry.",
    rating: 5,
    avatar: "JW"
  },
  {
    name: "Sarah Chen",
    role: "Portfolio Manager",
    content: "The real-time insights and automated trading features have helped me consistently outperform the market. Highly recommended for serious investors.",
    rating: 5,
    avatar: "SC"
  },
  {
    name: "Marcus Rodriguez",
    role: "Early Adopter",
    content: "I've been with Voltsq since the beginning. Their customer support and commitment to innovation are why I keep my entire portfolio here.",
    rating: 5,
    avatar: "MR"
  },
  {
    name: "Elena Petrova",
    role: "Crypto Analyst",
    content: "The analytics tools provided by Voltsq are professional-grade. It's rare to find such a comprehensive suite of tools in one platform.",
    rating: 4.5,
    avatar: "EP"
  },
  {
    name: "David Thompson",
    role: "Strategic Investor",
    content: "Transparency is key for me, and Voltsq delivers. Every transaction is clear, and the performance reports are incredibly detailed.",
    rating: 5,
    avatar: "DT"
  }
];

export default function TestimonialsSection() {
  // Triple the array for a seamless loop
  const displayTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <Box sx={{ bgcolor: "var(--background)", py: { xs: 8, md: 12 }, overflow: "hidden" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="overline"
            sx={{ color: "var(--primary)", fontWeight: 700, letterSpacing: 2 }}
          >
            TESTIMONIALS
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mt: 1,
              mb: 2,
              background: "linear-gradient(to right, var(--foreground), var(--primary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            What Our Investors Say
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "var(--muted-foreground)", maxWidth: "700px", mx: "auto" }}
          >
            Join thousands of successful investors who trust Voltsq for their digital asset management and trading needs.
          </Typography>
        </Box>
      </Container>

      {/* Marquee Container */}
      <Box sx={{ position: "relative", width: "100%" }}>
        <Box className="animate-marquee">
          {displayTestimonials.map((t, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: "300px", md: "400px" },
                mx: 2,
                p: 4,
                bgcolor: "var(--card)",
                borderRadius: "24px",
                border: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                flexShrink: 0,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-12px) scale(1.02)",
                  borderColor: "var(--primary)",
                  boxShadow: "0 20px 40px -15px rgba(37, 99, 235, 0.3)",
                }
              }}
            >
              <Rating value={t.rating} precision={0.5} readOnly size="small" sx={{ color: "var(--primary)" }} />
              <Typography sx={{ color: "var(--foreground)", fontStyle: "italic", mb: 2, fontSize: "1.1rem", lineHeight: 1.6 }}>
                "{t.content}"
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: "auto" }}>
                <Avatar 
                  sx={{ 
                    bgcolor: "var(--primary)", 
                    fontWeight: 700,
                    width: 48,
                    height: 48,
                    border: "2px solid var(--background)"
                  }}
                >
                  {t.avatar}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "var(--foreground)" }}>
                    {t.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "var(--muted-foreground)", fontWeight: 500 }}>
                    {t.role}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Gradient Overlays for Smooth Fading */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: { xs: "50px", md: "150px" },
            height: "100%",
            background: "linear-gradient(to right, var(--background), transparent)",
            zIndex: 2,
            pointerEvents: "none"
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: { xs: "50px", md: "150px" },
            height: "100%",
            background: "linear-gradient(to left, var(--background), transparent)",
            zIndex: 2,
            pointerEvents: "none"
          }}
        />
      </Box>
    </Box>
  );
}
