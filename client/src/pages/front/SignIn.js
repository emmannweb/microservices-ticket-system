import { Avatar, Box, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import LockClockOutlined from "@mui/icons-material/LockClockOutlined";
import Layout from "./Layout";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
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

  const handleLogin = async (e) => {
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
      const value = await fetch("/api/users/signin", options);

      const res = await value.json();
      if (res && res?.errors) {
        const errorResponse = res?.errors?.map((err) => err.message)?.join(" ");
        return toast.error(errorResponse);
      }
      login(res);

      setUser({ email: "", password: "" });

      toast("Sign In successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
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
              <Avatar sx={{ m: 1, bgcolor: "#fcca50", mb: 3 }}>
                <LockClockOutlined sx={{ color: "white" }} />
              </Avatar>
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
              onSubmit={(e) => handleLogin(e)}
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
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    to="/sign-up"
                    variant="body2"
                    style={{
                      color: "oklch(0.382774 0.071686 233.169)",
                      textDecoration: "none",
                    }}
                  >
                    {"Don't have account? create"}
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

export default SignIn;
