import { Box, Button, TextField, Typography } from "@mui/material";
import Layout from "../front/Layout";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateTicket = () => {
  const [ticket, setTicket] = useState({ title: "", price: "" });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setError(false);
    setTicket((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTicket = async (e) => {
    e.preventDefault();

    try {
      if (!ticket.title || !ticket.price) {
        setError(true);
        return false;
      }
      const options = {
        method: "POST",
        body: JSON.stringify(ticket),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const value = await fetch("/api/tickets", options);

      const res = await value.json();
      if (res && res?.errors) {
        const errorResponse = res?.errors?.map((err) => err.message)?.join(" ");
        return toast.error(errorResponse);
      }

      setTicket({ title: "", price: "" });

      toast("Ticket created successfully!");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <Layout>
        <Box
          sx={{
            bgcolor: "oklch(0.27642 0.055827 233.809)",
            minHeight: "calc(100vh - 140px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#c1c1c1",
          }}
        >
          <Box
            sx={{
              bgcolor: "#031d2a",
              p: "20px 40px",
              border: "1px solid oklch(0.382774 0.071686 233.169)",
              maxWidth: "500px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h5"> Sell Ticket</Typography>
            </Box>
            {error ? (
              <Typography sx={{ color: "red" }}>
                {" "}
                *all fields are required!
              </Typography>
            ) : (
              ""
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleTicket}
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                sx={{
                  mb: 3,
                  mt: 1,
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  },

                  input: {
                    background: "#eee",
                  },
                }}
                fullWidth
                id="title"
                name="title"
                placeholder="Ticket title"
                autoFocus
                required
                value={ticket.title}
                onChange={handleChange}
              />
              <TextField
                sx={{
                  mb: 3,
                  mt: 1,
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  },

                  input: {
                    background: "#eee",
                  },
                }}
                fullWidth
                id="price"
                name="price"
                placeholder="Ticket price"
                autoFocus
                required
                type="number"
                value={ticket.price}
                onChange={handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                elevation={0}
                sx={{
                  mt: 3,
                  p: 2,
                  mb: 2,
                  borderRadius: "10px",
                  bgcolor: "rgb(252 202 80)",
                  color: "#031d2a",
                  transition: "all ease 1s",
                  "&:hover": { bgcolor: "#fcca50", opacity: 0.8 },
                }}
                // disabled={isLoading}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default CreateTicket;
