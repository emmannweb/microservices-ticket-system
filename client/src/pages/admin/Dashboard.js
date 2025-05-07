import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Layout from "../front/Layout";
import useFetchData from "../../hooks/useFetchData";
import { Container } from "@mui/material";

const Dashboard = () => {
  const { data } = useFetchData("/api/orders");

  return (
    <>
      <Layout>
        <Container sx={{ pt: 5 }}>
          <h2>My orders:</h2>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Order Id</TableCell>
                  <TableCell align="right">Ticket name</TableCell>
                  <TableCell align="right">Price&nbsp;(usd)</TableCell>
                  <TableCell align="right">Payment Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((order) => (
                  <TableRow
                    key={order.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {order.id}
                    </TableCell>
                    <TableCell align="right">{order?.ticket?.title}</TableCell>
                    <TableCell align="right">{order?.ticket?.price}</TableCell>
                    <TableCell align="right">
                      {" "}
                      <span
                        style={{
                          color:
                            order?.status === "cancelled" ? "red" : "green",
                        }}
                      >
                        {order?.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Layout>
    </>
  );
};

export default Dashboard;
