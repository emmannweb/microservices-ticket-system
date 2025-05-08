import { Box, Container } from "@mui/material";
import Layout from "./Layout";

const NotFound = () => {
  return (
    <>
      <Layout>
        <Box
          sx={{
            bgcolor: "oklch(0.27642 0.055827 233.809)",
            minHeight: "calc(100vh - 140px)",
          }}
        >
          <Container>
            <Box sx={{ pt: 4, pb: 3 }}>
              <h2 style={{ color: "#fafafa" }}>Page not found!</h2>
            </Box>
          </Container>
        </Box>
      </Layout>
    </>
  );
};

export default NotFound;
