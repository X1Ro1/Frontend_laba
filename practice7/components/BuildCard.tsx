import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface BuildCardProps {
  building: {
    title: string;
    description: string[];
    img: string;
  };
  cardNumber: number;
  sx?: object;
}

const BuildCard: React.FC<BuildCardProps> = ({ building, cardNumber, sx = {} }) => {
  const isEven = cardNumber % 2 === 0;

  return (
    <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      ...sx
    }}>

      {/* Картинка внизу */}
      <CardMedia
        component="img"
        image={building.img}
        alt={building.title}
        sx={{
          height: '30vh',
          objectFit: 'cover',
          mt: 'auto',
          padding: '20px',
          borderRadius: '6px'
        }}
      />
      
      {/* Текстовая часть */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h4" sx={{textAlign: 'center'}}>
          {building.title}
        </Typography>
        
        {building.description.map((para, idx) => (
          <Typography 
            key={idx} 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              textAlign: 'justify',
            }}
          >
            {para}
          </Typography>
        ))}
      </CardContent>

      {/* Кнопка */}
      <CardActions sx={{
        justifyContent: {
          xs: 'flex-start',
          md: isEven ? 'flex-end' : 'flex-start'
        },
        px: 2,
        pb: 2
      }}>
        <Button size="small" 
          sx={{
            backgroundColor: '#6120cb',
            borderRadius: '6px',
            padding: '6px 10px',
            border: '1px solid #000000',
            color: '#ffffff'
          }}>Подробнее
        </Button>
      </CardActions>
    </Card>
  );
};

export default BuildCard;