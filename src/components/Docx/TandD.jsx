import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const TandD = () => {
  return (
    <Box p={8}>
      <Text fontSize="4xl" fontWeight="bold" mb={4}>
        Terms & Conditions
      </Text>

      <Text mb={4}>
        These terms and conditions outline the rules and regulations for the use of Guru’s iPhone Website, located at gurusiphone.com.
      </Text>

      <Text mb={4}>
        By accessing this website, we assume you accept these terms and conditions. Do not continue to use Guru’s iPhone if you do not agree to take all of the terms and conditions stated on this page.
      </Text>

      <Text fontWeight="bold" mt={6} mb={2}>
        Cookies
      </Text>
      <Text mb={4}>
        We employ the use of cookies. By accessing gurusiphone.com, you agreed to use cookies in agreement with Guru’s iPhone's Privacy Policy.
        Most interactive websites use cookies to retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website.
      </Text>

      <Text fontWeight="bold" mt={6} mb={2}>
        License
      </Text>
      <Text mb={4}>
        Unless otherwise stated, Guru’s iPhone and/or its licensors own the intellectual property rights for all material on gurusiphone.com.
        All intellectual property rights are reserved. You may access this from gurusiphone.com for your own personal use, subject to restrictions set in these terms and conditions.
      </Text>

      <Text mb={4}>You must not:</Text>
      <Box as="ul" pl={6} mb={4}>
        <Box as="li" mb={2}>Republish material from gurusiphone.com</Box>
        <Box as="li" mb={2}>Sell, rent or sub-license material from gurusiphone.com</Box>
        <Box as="li" mb={2}>Reproduce, duplicate or copy material from gurusiphone.com</Box>
        <Box as="li" mb={2}>Redistribute content from gurusiphone.com</Box>
      </Box>

      <Text fontWeight="bold" mt={6} mb={2}>
        Comments
      </Text>
      <Text mb={4}>
        Parts of this website offer users the opportunity to post and exchange opinions and information. Guru’s iPhone does not filter, edit, publish or review Comments prior to their presence on the website.
        Comments do not reflect the views of Guru’s iPhone. To the extent permitted by applicable laws, Guru’s iPhone shall not be liable for the Comments or for any liability caused and/or suffered as a result of any use of and/or posting of Comments on this website.
      </Text>

      <Text fontWeight="bold" mt={6} mb={2}>
        Hyperlinking to our Content
      </Text>
      <Text mb={4}>
        The following organizations may link to our Website without prior written approval:
      </Text>
      <Box as="ul" pl={6} mb={4}>
        <Box as="li" mb={2}>Government agencies</Box>
        <Box as="li" mb={2}>Search engines</Box>
        <Box as="li" mb={2}>News organizations</Box>
      </Box>
      <Text mb={4}>
        Approved organizations may hyperlink to our Website so long as the link is not deceptive, does not falsely imply sponsorship, and fits within the context of the linking party’s site.
      </Text>

      <Text fontWeight="bold" mt={6} mb={2}>
        iFrames
      </Text>
      <Text mb={4}>
        Without prior approval, you may not create frames around our Webpages that alter the visual presentation of our website.
      </Text>

      <Text fontWeight="bold" mt={6} mb={2}>
        Content Liability
      </Text>
      <Text mb={4}>
        We are not responsible for content that appears on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene, or criminal, or which infringes the rights of any third party.
      </Text>

      <Text fontWeight="bold" mt={6} mb={2}>
        Disclaimer
      </Text>
      <Text mb={4}>
        To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and its use.
        As long as the website and the information are provided free of charge, we will not be liable for any loss or damage of any nature.
      </Text>
    </Box>
  );
};

export default TandD;
