import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = () => {
  return (
    <Box>
      <Container maxWidth="xl">
        <Typography variant="body2" color="text.secondary" align="center" sx={{fontSize: "20px", fontWeight: "600"}}>
          {'© '}
          <Link color="#000000" href="#" >
            Егоров Артем Б9123-09.03.04
          </Link>{' '}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;