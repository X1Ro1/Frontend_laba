import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled, Theme } from '@mui/material/styles';

interface BuildCardProps {
  building: {
    img: string;
    title: string;
    description: string[];
  };
  cardNumber: number;
  sx?: SxProps<Theme>;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'justify',
  marginBottom: theme.spacing(1),
  '&:last-child': {
    marginBottom: 0,
  }
}));

const BuildCard: React.FC<BuildCardProps> = ({ building, cardNumber, sx = {} }) => {
  const isEven = cardNumber % 2 === 0;

  return (
    <Card sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%',
      ...((Array.isArray(sx) ? sx : [sx]) as any)
    }}>
      {/* для мобилок */}
      <CardMedia
        component="img"
        sx={{ 
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          display: { xs: 'block', md: 'none' } 
        }}
        image={building.img}
        alt={building.title}
      />

      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        flex: 1 
      }}>
        {/* для десктопа */}
        <Box sx={{ 
          order: { xs: 0, md: isEven ? 0 : 1 },
          display: { xs: 'none', md: 'block' },
          flexShrink: 0
        }}>
          <CardMedia
            component="img"
            sx={{ 
              width: 200, 
              height: '100%', 
              objectFit: 'cover' 
            }}
            image={building.img}
            alt={building.title}
          />
        </Box>

        {/* Контентная часть */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          flex: 1,
          order: { xs: 1, md: isEven ? 1 : 0 }
        }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              {building.title}
            </Typography>
            {building.description.map((para, idx) => (
              <StyledTypography key={idx} variant="body2">
                {para}
              </StyledTypography>
            ))}
          </CardContent>
          <CardActions sx={{ mt: 'auto', justifyContent: isEven ? 'flex-end' : 'flex-start' }}>
            <Button size="small" color="success">Подробнее</Button>
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
};

export default BuildCard;