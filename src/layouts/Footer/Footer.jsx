import {
  Box,
  Grid,
  Text,
  Link,
  Icon,
  Stack,
  VStack,
  Divider,
  Flex,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";
import Logo from "../Logo/Logo";
import visa from "../../assets/images/visa.svg";
import master from "../../assets/images/mastercard.webp";
import rupay from "../../assets/images/rupaycard.png";
import upi from "../../assets/images/upi.svg";

const Footer = () => {
  // Define the grid template columns based on the screen size
  const gridTemplateColumns = useBreakpointValue({
    base: "repeat(1, 1fr)",  // Single column on small screens
    md: "repeat(3, 1fr)",    // Three columns on medium and larger screens
  });

  return (
    <Box bg="#fafafa" py={6} px={10} borderTop="1px solid whitesmoke">
      {/* Top Section */}
      <Flex align="center" mb={4}>
        <Text fontSize="2xl" my={2} fontWeight="600">
          Guru's
        </Text>{" "}
        <Logo />
      </Flex>

      {/* Main Content Grid */}
      <Grid
        templateColumns={gridTemplateColumns}
        gap={6}
        mb={5}
      >
        {/* Contact Details */}
        <VStack
          align="flex-start"
          spacing={1}
          lineHeight="1.1"
        >
          <Text fontWeight="800" fontSize="xl">
            Contact Details
          </Text>
          <Text>Address: New Jersey</Text>
          <Text>Meerut CITY 250001</Text>
          <Text>Phone: +91 1234567890</Text>
          <Text>Contact us: help.guruiphone@gmail.com</Text>
        </VStack>

        {/* Collection */}
        <VStack
          align="flex-start"
          spacing={0}
        >
          <Text fontWeight="800" fontSize="xl">
            Collection
          </Text>
          <Text>iPhones</Text>
          <Text>Android</Text>
          <Text>Accessories</Text>
        </VStack>

        {/* Connect with us */}
        <VStack
          align="flex-start"
          spacing={2}
        >
          <Text fontWeight="600" fontSize="xl">
            Connect with us
          </Text>
          <Flex align="center">
            <Link
              href="https://instagram.com"
              isExternal
              display="flex"
              alignItems="center"
            >
              <Icon as={FaInstagram} w={6} h={6} mr={2} />
              <Text fontWeight="400">Instagram</Text>
            </Link>
          </Flex>
        </VStack>
      </Grid>

      <Divider bg="black" mb={5} />

      {/* Payment Protection */}
      <Flex direction="column" align="center" mt={2}>
        <Text fontWeight="bold" fontSize="xs" mb={2}>
          100% PAYMENT PROTECTION
        </Text>
        <Stack direction="row" spacing={6} justify="center">
          <Image src={visa} alt="Visa" maxWidth="60px" maxHeight="50px" />
          <Image src={master} alt="MasterCard" maxWidth="60px" maxHeight="50px" />
          <Image src={rupay} alt="Rupay" maxWidth="60px" maxHeight="50px" />
          <Image src={upi} alt="UPI" maxWidth="60px" maxHeight="50px" />
        </Stack>
      </Flex>
    </Box>
  );
};

export default Footer;
