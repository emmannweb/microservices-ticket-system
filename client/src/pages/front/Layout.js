import { Box } from "@mui/material";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box sx={{ minHeight: "calc(100vh - 140px)", bgcolor: "#fafafa" }}>
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
