import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAsync, selectLoggedInUser } from '../../auth/AuthSlice.jsx'
import { LoadingButton } from '@mui/lab'
import { useNavigate } from 'react-router-dom'

const Greeting = () => {

  const dispatch = useDispatch()
  const loggedInUser = useSelector(selectLoggedInUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login')
    }
    else if (loggedInUser && loggedInUser?.isVerified) {
      navigate("/")
    }
  }, [loggedInUser,navigate])

  const handleLogout = () => {
    dispatch(logoutAsync())
  }

  return (
    <Stack
      width={'100vw'}
      height={'100vh'}
      flexDirection={'row'}
      sx={{ overflowY: "hidden" }}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Stack flex={1} justifyContent={'center'} alignItems={'center'}>
        {/* Greeting Section */}
        <Stack spacing={2} justifyContent={'center'} alignItems={'center'}>
          <Typography variant='h2' fontWeight={600} textAlign="center">
            Welcome to Mern Stack Template!
          </Typography>
          <Typography variant='body1' color='GrayText' textAlign="center">
            Your one-stop solution for full-stack development.
          </Typography>
        </Stack>

        {/* Action Buttons */}
        <Stack mt={4} spacing={2} width={{ xs: '90vw', sm: '20rem' }} alignItems="center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <LoadingButton onClick={handleLogout} fullWidth variant='outlined'>Logout</LoadingButton>
          </motion.div>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Greeting;