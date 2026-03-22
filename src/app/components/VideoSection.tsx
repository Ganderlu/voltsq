"use client";

import { Box, Container, Typography } from "@mui/material";

export default function VideoSection() {
  const cloudinaryEmbedUrl =
    "https://player.cloudinary.com/embed/?cloud_name=ddhhtyev6&public_id=rm5ih70sr1tfe6syo3kr&autoplay=true&muted=true&loop=true";

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
          <iframe
            src={cloudinaryEmbedUrl}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            style={{
              width: "100%",
              height: "100%",
              border: 0,
            }}
            title="Voltsq Video"
          />
        </Box>
      </Container>
    </Box>
  );
}
