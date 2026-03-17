"use client";

import { Box, Container, Typography } from "@mui/material";
import { useEffect, useRef } from "react";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => {
        console.error("Video play failed:", error);
      });
    }
  }, []);

  return (
    <Box sx={{ bgcolor: "var(--background)", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              background:
                "linear-gradient(to right, var(--foreground), var(--primary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Experience the Future of Investing
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "var(--muted-foreground)",
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            See how Voltsq Investments is revolutionizing the digital asset
            landscape with cutting-edge technology and secure strategies.
          </Typography>
        </Box>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            border: "1px solid var(--border)",
            aspectRatio: "16/9",
            bgcolor: "black",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            controls
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src="/videos/Voltsq.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </Container>
    </Box>
  );
}
