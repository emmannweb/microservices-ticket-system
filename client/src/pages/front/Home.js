import { Box, Container } from "@mui/material";
import TicketCard from "../../components/TicketCard";
import Layout from "./Layout";
import useFetchData from "../../hooks/useFetchData";

const Home = () => {
  const { data, loading } = useFetchData("/api/tickets");

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
              <h2 style={{ color: "#fafafa" }}>Tickets for sale:</h2>
              {loading ? (
                <>
                  <h3 style={{ color: "white" }}>LOADING...</h3>
                </>
              ) : (
                data.map((ticket, id) => (
                  <TicketCard ticket={ticket} key={id} />
                ))
              )}
            </Box>
          </Container>
        </Box>
      </Layout>
    </>
  );
};

export default Home;
