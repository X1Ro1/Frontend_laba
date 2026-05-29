import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from 'react-router-dom';
import structures from '../../data';

const imgData = structures.slice();

const Gallery = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ height: 500, overflowY: 'scroll', my: 2 }}> 
        <ImageList
          variant="masonry"
          gap={0}
          sx={{
            columnCount: {
              xs: '1 !important',
              sm: '2 !important',
              md: '3 !important',
              lg: '3 !important',
            }
          }}
        >
          {imgData.map((item, index) => (
            <Link 
              key={index} 
              to={`/building/${index}`} 
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <ImageListItem sx={{ height: '250px !important', width: '100% !important' }}>
                <img
                  srcSet={`${item.img}?w=248&fit=crop&auto=format`}
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                  style={{ objectFit: 'fill', width: '100%', height: '100%' }} 
                />
                <ImageListItemBar position="bottom" title={item.title} />
              </ImageListItem>
            </Link>
          ))}
        </ImageList>
      </Box>
    </Container>
  );
};

export default Gallery;