import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import BuildCard from './BuildCard';
import structures from '../data';

const cardData = structures;

const layout = [
  { 
    type: 'row3', cards: [0, 1, 3],
    cardSx: [
      //1
      {
        backgroundColor: 'rgb(139, 144, 96)',
      }, 
      //2
      {
        height: '450px',
        marginTop: '130px'
      }, 
      //3
      {
        backgroundColor: 'rgb(96, 123, 172)',
      }
    ]
  
  },
  { 
    type: 'center', cards: [2],
    cardSx: { 
      border: '1px solid #000000'
    }
  },
  { 
    type: 'row3', cards: [0, 2, 3],
    cardSx: [
      //1
      {
        height: '100%',
        backgroundColor: 'rgb(209, 214, 116)',
      }, 
      //2
      {
        height: '450px', 
      }, 
      //3
      {
        height: '100%',
        backgroundColor: 'rgb(204, 124, 192)',
      }
    ] 
  },
];

const Content = () => {
  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      {layout.map((section, sectionIndex) => {
        if (section.type === 'center') {
          const index = section.cards[0];
          const item = cardData[index];
          if (!item) return null;

          return (
            <Grid container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4}}  key={sectionIndex}>
              <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                <BuildCard 
                  building={item} 
                  cardNumber={index}
                  sx={section.cardSx }
                />
              </Grid>
            </Grid>
          );
        } 
        else if (section.type === 'row3') {
          return (
            <Grid 
              container 
              spacing={{ xs: 3, md: 5 }} 
              key={sectionIndex} 
              sx={{ 
                mb: 6, ...section.sx,
              }}
            >
              {section.cards.map((index, idx) => {
                const item = cardData[index];
                if (!item) return null;

                const individualSx = Array.isArray(section.cardSx) 
                  ? section.cardSx[idx] || {} 
                  : {};

                return (
                  <Grid key={index} size={{ xs: 12, md: 4 }}>
                    <BuildCard 
                      building={item} 
                      cardNumber={index}
                      sx={individualSx}
                    />
                  </Grid>
                );
              })}
            </Grid>
          );
        }
        return null;
      })}
    </Container>
  );
};

export default Content;