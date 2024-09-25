import { Box, Image } from '@chakra-ui/react';
import appleLogo from "../../assets/images/apple.svg"

const Logo = () => {
  return (
    <Box>
      <Image src={appleLogo} alt="Logo" boxSize="50px" objectFit="contain" />
    </Box>
  );
};

export default Logo;
