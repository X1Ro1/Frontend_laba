import React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

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
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const isActive = (value: string) => active === value;

  const menuItems = [
    { key: "1", label: "Главная", path: "/" },
    { key: "2", label: "Список аниме", path: "/list" },
    { key: "3", label: "Таблицы", path: "/chart" }
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

          {/* Десктопное меню */}
          <Box sx={{ display: { xs: 'none', md: 'flex', gap: '20px' } }}>
            {menuItems.map((item) => (
              <Button
                key={item.key}
                component={Link}
                to={item.path}
                variant={isActive(item.key) ? "contained" : "text"}
                sx={{
                  color: isActive(item.key) ? '#fff' : '#fff',
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
                size="medium"
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Мобильное меню */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ color: 'rgb(255, 255, 255)' }} />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
            >
              <Box>
                <IconButton
                  onClick={toggleDrawer(false)}
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                  <CloseRoundedIcon />
                </IconButton>
                <MenuList sx={{ pt: '40px' }}>
                  {menuItems.map((item) => (
                    <Link
                      key={item.key}
                      to={item.path}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <MenuItem
                        onClick={toggleDrawer(false)}
                        sx={{
                          backgroundColor: isActive(item.key) ? 'rgb(2, 132, 2)' : 'transparent',
                          color: isActive(item.key) ? '#fff' : 'inherit',
                          '&:hover': {
                            backgroundColor: 'rgb(2, 132, 2)',
                            color: '#fff'
                          }
                        }}
                      >
                        {item.label}
                      </MenuItem>
                    </Link>
                  ))}
                </MenuList>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;