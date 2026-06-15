import React from 'react';
import Navbar from '../components/Navbar';
import Quiz from './features/Quiz';
import Footer from '../components/Footer';
import { Box } from '@mui/material';

const Testing = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar active="4" />
      
      <Box sx={{ flex: 1, py: 4 }}>
        <Quiz />
      </Box>
      
      <Footer />
    </Box>
  );
};

export default Testing;