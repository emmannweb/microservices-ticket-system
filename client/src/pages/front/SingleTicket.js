import { Box, Button, Container, Typography } from "@mui/material";
import Layout from "./Layout";
import { useNavigate, useParams } from "react-router-dom";
import useSingle from "../../hooks/useSingle";
import { toast } from "react-toastify";

const SingleTicket = () => {
  const { id } = useParams();
  const { data, loading } = useSingle(`/api/tickets/${id}`);
  const navigate = useNavigate();

  const createOrder = async () => {
    try {
      const order = await fetch("/api/orders", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ ticketId: id }),
      });
      const res = await order.json();
      if (res && res?.errors) {
        const errorResponse = res?.errors?.map((err) => err.message)?.join(" ");
        return toast.error(errorResponse);
      }
      toast("Order created");

      setTimeout(() => {
        navigate(`/orders/${res.id}`);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

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
              {loading ? (
                "LOADING"
              ) : (
                <Box
                  sx={{
                    maxWidth: "600px",
                    bgcolor: "#031d2a",
                    border: "1px solid oklch(0.382774 0.071686 233.169)",
                    p: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ color: "#fafafa" }}
                  >
                    {data.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: "#fafafa" }}
                  >
                    Price: ${data.price}
                  </Typography>
                  <Button
                    onClick={createOrder}
                    sx={{ bgcolor: "green", color: "white" }}
                  >
                    Buy
                  </Button>
                </Box>
              )}
            </Box>
          </Container>
        </Box>
      </Layout>
    </>
  );
};

export default SingleTicket;
