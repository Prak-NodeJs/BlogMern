import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  Typography,
  Box,
  Button,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { authActions } from '../Store'
export const Header = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  console.log(isLoggedIn)
  const [value, setValue] = useState(undefined)
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(90,90,157,1) 49%, rgba(0,212,255,1) 100%)',
      }}
    >
      <Toolbar>
        <Typography variant="h4"> BlogsApp</Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft={'auto'} marginRight={'auto'}>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs"></Tab>
              <Tab LinkComponent={Link} to="/myblogs" label="My Blogs"></Tab>
              <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs"></Tab>
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Signup
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/auth"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="warning"
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
