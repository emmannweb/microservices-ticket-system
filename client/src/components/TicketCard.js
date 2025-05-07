import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function TicketCard({ ticket }) {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "500px",
        bgcolor: "#031d2a",
        border: "1px solid oklch(0.382774 0.071686 233.169)",
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5" color="white">
            <Link to={`/ticket/${ticket.id}`} style={{ color: "white" }}>
              {" "}
              {ticket.title}
            </Link>
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "#fafafa" }}
          >
            ticket
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ pr: 2 }}>
        <Typography sx={{ fontWeight: "bold", color: "#fafafa" }}>
          Price: {`$${ticket.price}`}
        </Typography>
      </Box>
    </Card>
  );
}
