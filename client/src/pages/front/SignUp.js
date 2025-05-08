import { Box, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { useState } from "react";
import { toast } from "react-toastify";

const SignUp = () => {
  // handle input show off password
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //end of handle input show off password

  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setError(false);
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const register = async (e) => {
    e.preventDefault();

    try {
      if (!user.email || !user.password) {
        setError(true);
        return false;
      }
      const options = {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const value = await fetch("/api/users/signup", options);

      const res = await value.json();
      if (res && res?.errors) {
        const errorResponse = res?.errors?.map((err) => err.message)?.join(" ");
        return toast.error(errorResponse);
      }

      setUser({ email: "", password: "" });

      toast("Sign Up successfully!");
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
              <Typography variant="h5"> SIGN UP</Typography>
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
              onSubmit={(e) => register(e)}
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
                id="email"
                name="email"
                placeholder="E-mail"
                autoFocus
                required
                value={user.email}
                onChange={handleChange}
              />

              <TextField
                required
                sx={{
                  background: "#eee",
                  mb: 1,
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
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                placeholder="Password"
                value={user.password}
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
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link
                    to="/sign-in"
                    variant="body2"
                    style={{
                      color: "oklch(0.382774 0.071686 233.169)",
                      textDecoration: "none",
                    }}
                  >
                    {"Already have an account? Login"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default SignUp;
