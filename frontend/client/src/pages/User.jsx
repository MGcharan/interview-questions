import React, { useEffect, useState } from 'react';
import Base from '../base/Base';
import { Button, Paper, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const User = ({ userNotes, setUserNotes }) => {
  const [err, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
    let token = localStorage.getItem("token");
    const fetchUserData = async () => {
      const res = await fetch("http://localhost:8080/api/notes/user/all", {
        method: "GET",
        headers: {
          "x-auth-token": token,
        },
      });
      const data = await res.json();
      if (!data.data) {
        setError(data.error);
      } else {
        setUserNotes(data.data);
      }
    };
    fetchUserData();
  }, [navigate, setUserNotes]);

  async function handleDelete(id) {
    try {
      const res = await fetch(`http://localhost:8080/api/notes/user/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      if (data.success) {
        const newUserNotes = userNotes.filter((note) => note._id !== id);
        setUserNotes(newUserNotes);
        setSuccessMsg(data.message);
        setOpenSnackbar(true); // Open Snackbar on success
        setError("");
      } else {
        setError(data.error);
        setSuccessMsg("");
      }
    } catch (error) {
      setError("An error occurred while deleting the note.");
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Base title={"My Account"}>
      <div>
        <Button
          edge="end"
          color="primary"
          aria-label="Add-Notes"
          onClick={() => navigate("/add/notes")}
        >
          Add Notes
        </Button>
      </div>
      {userNotes && (
        <div>
          {userNotes?.map((data) => (
            <Paper elevation={6} key={data._id} sx={{ padding: 2, margin: 2 }}>
              <Typography variant="h6">Company Name: {data.companyName}</Typography>
              <Typography>Role: {data.role}</Typography>
              <Typography>Package: {data.package}</Typography>
              <Typography>Questions: {data.questions}</Typography>
              <Typography>Date: {data.date}</Typography>
              <Typography>Posted by: {data.user.username}</Typography>
              <Button variant="contained" color="primary" onClick={() => navigate(`/edit/notes/${data._id}`)} sx={{ marginRight: 1 }}>
                Edit
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleDelete(data._id)}>
                Delete
              </Button>
            </Paper>
          ))}
        </div>
      )}
      {err && <Typography color="error">{err}</Typography>}
      {successMsg && (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {successMsg}
          </Alert>
        </Snackbar>
      )}
    </Base>
  );
};

export default User;
