"use client";

import { Box, Container, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = useState("/videos/Voltsq.mp4");

  useEffect(() => {
    // Use getDoc instead of onSnapshot to avoid permission errors if rules are strict
    // Ideally, "system/settings" should be readable by public in security rules
    const fetchVideo = async () => {
      try {
        const snap = await getDoc(doc(db, "system", "settings"));
        if (snap.exists()) {
          const data = snap.data();
          if (data.landingVideoUrl) {
            setVideoUrl(data.landingVideoUrl);
          }
        }
      } catch (error) {
        console.warn("Could not fetch custom video, using default.", error);
      }
    };
    fetchVideo();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      // Ensure video is muted to allow autoplay on most browsers
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;

      const playVideo = async () => {
        try {
          await videoRef.current?.play();
        } catch (error) {
          console.warn(
            "Initial video play failed, retrying after interaction:",
            error,
          );
          // Some browsers block autoplay even if muted until first interaction
        }
      };

      playVideo();
    }
  }, [videoUrl]); // Re-play when URL changes

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
            key={videoUrl}
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            controls
            preload="auto"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </Container>
    </Box>
  );
}
