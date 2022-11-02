import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  Typography,
  CardContent,
  Box,
  IconButton,
} from '@mui/material'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import axios from 'axios'
const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  console.log(id)
  const navigate = useNavigate()

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:8000/api/deleteBlog/${id}`)
      .catch((err) => console.log(err))
    const data = await res.data
    return data
  }
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate('/'))
      .then(() => navigate('/blogs'))
  }

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`)
  }
  return (
    <div>
      <Card
        sx={{
          width: '40%',
          margin: 'auto',
          mt: 2,
          padding: 2,
          boxShadow: '5px 5px 10px #ccc',
          ':hover': {
            boxShadow: '10px, 10px 20px #ccc',
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton
              onClick={() => handleEdit(id)}
              sx={{ marginLeft: 'auto' }}
            >
              <EditIcon color="warning"></EditIcon>
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error"></DeleteForeverIcon>
            </IconButton>
          </Box>
        )}

        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
              {userName}
            </Avatar>
          }
          title={title}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="Paella dish"
        />

        <CardContent>
          <hr></hr>
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>{userName} </b> {':'}
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default Blog
