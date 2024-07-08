import React, { useEffect, useState } from "react";
import Base from "../base/Base";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Snackbar, Alert } from "@mui/material";

const AddNotes = ({ userNotes, setUserNotes }) => {
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [pack, setPack] = useState(0);
  const [questions, setQuestions] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  async function postNewNotes(event) {
    event.preventDefault();
    const notes = {
      companyName,
      role,
      package: pack,
      questions,
    };

    try {
      const res = await fetch("http://localhost:8080/api/notes/user/add", {
        method: "POST",
        body: JSON.stringify(notes),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      const data = await res.json();
      if (!data.data) {
        setErr(data.err);
        setMsg(data.message);
      } else {
        setUserNotes([...userNotes, data.data]);
        setMsg(data.message);
        setOpenSnackbar(true); // Open Snackbar on success
        setErr("");
      }
    } catch (error) {
      setErr("An error occurred while adding the note");
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    navigate("/account"); // Navigate back to the user account page after closing the snackbar
  };

  return (
    <Base title={"Add Notes"}>
      <form onSubmit={postNewNotes}>
        <TextField
          label="Company Name"
          variant="outlined"
          fullWidth
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          sx={{ m: 2 }}
        />

        <TextField
          label="Role"
          variant="outlined"
          fullWidth
          type="text"
          sx={{ m: 2 }}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <TextField
          label="Package"
          variant="outlined"
          type="number"
          fullWidth
          sx={{ m: 2 }}
          value={pack}
          onChange={(e) => setPack(e.target.value)}
        />

        <TextField
          label="Questions"
          variant="outlined"
          fullWidth
          value={questions}
          onChange={(e) => setQuestions(e.target.value)}
          inputProps={{ sx: { height: 100 } }}
          sx={{ m: 2 }}
        />

        <Button type="submit" variant="contained">
          Add Notes
        </Button>

        {err && <Typography color="error">{err}</Typography>}
        {msg && (
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
              {msg}
            </Alert>
          </Snackbar>
        )}
      </form>
    </Base>
  );
};

export default AddNotes;
