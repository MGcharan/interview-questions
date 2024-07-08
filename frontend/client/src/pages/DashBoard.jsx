// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import Base from '../base/Base'
import { useNavigate } from 'react-router-dom'
import { Paper, Typography } from '@mui/material'

const DashBoard = () => {
    const[notes,setNotes]=useState([])
    const[err,setError]=useState("")

    const navigate=useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate("/login",{replace:true})
        }
        let  token=localStorage.getItem("token")
        const fetchData=async ()=>{
            const res= await fetch("http://localhost:8080/api/notes/user/all",{
                method:"GET",
                headers:{
                    "x-auth-token":token,
                }
            })
            const data = await res.json();
      if (!data.data) {
        setError(data.error);
      } else {
        setNotes(data.data);
      }
        };
    fetchData()
    

    },[])

    



  return (
    <Base title={"Dashboard"}>
        {notes && 
        <div>
            {notes?.map((data) => (
            <Paper elevation={6} key={data._id}  sx={{ padding: 2, margin: 2,}} >
            <Typography variant="h6">Company Name: {data.companyName}</Typography>
            <Typography>Role: {data.role}</Typography>
            <Typography>Package: {data.package}</Typography>
            <Typography>Questions: {data.questions}</Typography>
            <Typography>Date : {new Date(data.date).toLocaleDateString()}</Typography>
            <Typography>Posted by: {data.user.username}</Typography>
            </Paper>
          ))}
        </div>
        
        }
    
    
    {err ? <Typography color={"danger"}>{err}</Typography> : ""}
    
    
    </Base>
  )
}

export default DashBoard