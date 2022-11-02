import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authActions } from '../Store'

const Auth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isSignup, setSignup] = useState(false)
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setInputs((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }))
  }
  const sendRequest = async (type = 'login') => {
    const res = await axios
      .post(`http://localhost:8000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err))

    const data = await res.data
    console.log(data)
    return data
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    if (isSignup) {
      sendRequest('register')
        .then((data) => localStorage.setItem('userid', data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate('/blogs'))
        .then((data) => console.log(data))
    } else {
      sendRequest()
        .then((data) => localStorage.setItem('userid', data.user._id))

        .then(() => dispatch(authActions.login()))
        .then(() => navigate('/blogs'))
        .then((data) => console.log(data))
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
          maxWidth={400}
        >
          <Typography variant="h2" padding={3} textAlign={'center'}>
            {isSignup ? 'SignUp' : 'Login'}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
            ></TextField>
          )}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={'email'}
            placeholder="Email"
            margin="normal"
          ></TextField>
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={'password'}
            placeholder="password"
            margin="normal"
          ></TextField>
          <Button
            type="submit"
            color="warning"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Submit
          </Button>
          <Button
            onClick={() => setSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Change TO {isSignup ? 'Login' : 'Signup'}
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth
