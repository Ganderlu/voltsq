"use client";

import { Box, Button, Container } from "@mui/material";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import { Download } from "lucide-react";

export default function CompanyLicenseDocumentPage() {
  return (
    <Box
      sx={{
        bgcolor: "var(--background)",
        minHeight: "100vh",
        color: "var(--foreground)",
      }}
    >
      <Box className="no-print">
        <Navbar />
      </Box>

      <Container maxWidth="md" sx={{ pt: { xs: 14, md: 18 }, pb: 10 }}>
        <Box
          className="no-print"
          sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}
        >
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

        <Box
          sx={{
            borderRadius: 3,
            border: "1px solid var(--border)",
            bgcolor: "var(--card)",
            p: { xs: 2, sm: 3, md: 4 },
            "@media print": {
              bgcolor: "#fff !important",
              border: "none",
              p: 0,
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 900,
              mx: "auto",
            }}
          >
            <Image
              src="/images/VOLTSQ%20INVESTMENT%20GROUP.png"
              alt="VOLTSQ INVESTMENT GROUP Company Licence"
              width={1400}
              height={2000}
              priority
              sizes="(max-width: 900px) 100vw, 900px"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 12,
              }}
            />
          </Box>
        </Box>
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
            margin: 1cm;
          }
          img {
            max-width: 100% !important;
            height: auto !important;
          }
        }
      `}</style>
    </Box>
  );
}
