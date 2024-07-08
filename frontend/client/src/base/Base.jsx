import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Base({title,children}) {
  const navigate=useNavigate()

  const handleLogout=()=>{
    localStorage.removeItem("token")
    navigate("/login")

  }
  return (
        <div className="main-container">
      <header >
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography sx={{ mr: 2 }}>GIRI - APP </Typography>
            <IconButton
              edge="end"
              color="inherit"
              arial-label="dahsboard"
              onClick={()=>navigate("/")}
              sx={{ mr: 2 }}
            >
              Dashboard
            </IconButton>

            <IconButton
              edge="end"
              color="inherit"
              arial-label="Account"
              onClick={()=>navigate("/account")}
              sx={{ mr: 2 }}
            >
              My Account
            </IconButton>

            <IconButton
              edge="end"
              color="inherit"
              onClick={()=>navigate("/login")}
              arial-label="login"
              sx={{ mr: 2 }}
            >
              Login
            </IconButton>

            <IconButton
              edge="end"
              color="inherit"
              onClick={()=>navigate("/signup")}
              arial-label="signup"
              sx={{ mr: 2 }}
            >
              Signup
            </IconButton>

            <IconButton
              edge="end"
              color="inherit"
              onClick={handleLogout}
              arial-label="logout"
              sx={{ mr: 2 }}
            >
              Logout
            </IconButton>
          </Toolbar>
        </AppBar>
      </header>
      <main>
        <h1>{title}</h1>
        <div className="content">{children}</div>
      </main>
    </div>
  )
}

export default Base