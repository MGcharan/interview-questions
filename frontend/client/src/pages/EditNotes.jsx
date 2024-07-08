import React, { useEffect, useState } from "react";
import Base from "../base/Base";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const EditNotes = ({ userNotes, setUserNotes }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [pack, setPack] = useState(0);
  const [questions, setQuestions] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
    const data = userNotes?.find((data) => data._id === id);
    if (data) {
      setCompanyName(data.companyName);
      setRole(data.role);
      setPack(data.package);
      setQuestions(data.questions);
    }
  }, [id, userNotes, navigate]);

  async function EditNewNotes(event) {
    event.preventDefault();

    const notes = {
      companyName,
      role,
      package: pack,
      questions,
    };

    try {
      const res = await fetch(
        `http://localhost:8080/api/notes/user/edit/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(notes),
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      const data = await res.json();

      if (!data.data) {
        setErr(data.err);
        setMsg(data.message);
      } else {
        const notesIndex = userNotes.findIndex((note) => note._id === id);
        const updatedNotes = [...userNotes];
        updatedNotes[notesIndex] = data.data;
        setUserNotes(updatedNotes);
        setMsg(data.message);
        setErr("");
        navigate("/account"); // Navigate back to the user account page
      }
    } catch (error) {
      setErr("An error occurred while editing the note");
    }
  }

  return (
    <Base title={"Edit Notes"}>
      <form onSubmit={EditNewNotes}>
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
          Edit Notes
        </Button>

        {err && <Typography color="error">{err}</Typography>}
        {msg && <Typography color="success">{msg}</Typography>}
      </form>
    </Base>
  );
};

export default EditNotes;
