import React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  border: '1px solid',
  backgroundColor: 'rgb(48, 47, 47)',
}));

interface NavbarProps {
  active: string;
}

const Navbar: React.FC<NavbarProps> = ({ active }) => {
  const isActive = (value: string) => active === value;

  const menuItems = [
    { key: "1", label: "Главная" },
    { key: "2", label: "Аниме страница" },
    { key: "3", label: "Таблица" }
  ];

  const greenColor = 'rgb(2, 132, 2)';

  return (
    <AppBar
      position="static"
      sx={{ boxShadow: 0, bgcolor: 'rgb(255, 255, 255)', mt: '10px' }}
    >
      <Container maxWidth="xl">
        <StyledToolbar>
          <Typography variant="h6" sx={{ color: greenColor }}>
            {/* */}
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex', gap: 20} }}>
            {menuItems.map((item) => (
              <Button
                key={item.key}
                variant={isActive(item.key) ? "contained" : "text"}
                sx={{
                  color: isActive(item.key) ? '#fff' : '#fff',
                  fontSize: '12px',
                  borderColor: greenColor,
                  '&:hover': {
                    backgroundColor: greenColor,
                    color: '#fff',
                    borderColor: greenColor,
                  },
                  '&.MuiButton-contained': {
                    backgroundColor: greenColor,
                  },
                  '&.MuiButton-contained:hover': {
                    backgroundColor: greenColor,
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;