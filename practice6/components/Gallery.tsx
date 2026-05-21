import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import structures from '../data';

const imgData = structures.slice();

const Gallery = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ height: 500, overflowY: 'scroll'}}>
        <ImageList
          variant="masonry"
          sx={{
            columnCount: {
              xs: '1 !important',
              sm: '2 !important',
              md: '3 !important',
              lg: '3 !important',
            }
          }}
        >
          {imgData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar position="bottom" title={item.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Container>
  );
};

export default Gallery;