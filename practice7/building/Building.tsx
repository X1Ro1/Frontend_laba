import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import structures from '../data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Building: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const buildingIndex = Number(id);
  const building = structures[buildingIndex];
  if (isNaN(buildingIndex) || !building) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar active="" />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1, textAlign: 'center' }}>
          <Typography variant="h4" color="error">Здание не найдено</Typography>
        </Container>
        <Footer />
      </div>
    );
  }

  const isDescriptionArray = Array.isArray(building.description);
  
  let leftColumnText = "";
  let rightColumnText = "";

  if (isDescriptionArray) {
    leftColumnText = building.description || "Описание отсутствует.";
    rightColumnText = building.description2 || building.description || "Описание отсутствует.";
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar active="" />
      
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4, flexGrow: 1 }}>
        <Breadcrumbs separator=">" aria-label="breadcrumb" sx={{ mb: 3, textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 'bold' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#34a44a' }}>
            Главная
          </Link>
          <Typography sx={{ fontWeight: 'bold', fontSize: '0.8rem' }} color="text.secondary">
            {building.title}
          </Typography>
        </Breadcrumbs>

        {/* Заголовок */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ color: '#555', fontWeight: 'normal', fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
            {building.title}
          </Typography>
        </Box>

        {/* Рисунок */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Box
            component="img"
            src={building.img}
            alt={building.title}
            sx={{
              width: '100%',
              maxWidth: '520px',
              height: 'auto',
              display: 'block',
              boxShadow: '0px 2px 5px rgba(0,0,0,0.15)'
            }}
          />
        </Box>

        <Grid container spacing={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'justify', lineHeight: 1.6, color: '#333' }}>
          
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ fontSize: '0.95rem', maxWidth: '500px' }}>
              {leftColumnText}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ fontSize: '0.95rem', maxWidth: '500px' }}>
              {rightColumnText}
            </Typography>
          </Grid>

        </Grid>

        <Footer/>

      </Container>
    </div>
  );
};

export default Building;