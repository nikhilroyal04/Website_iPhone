import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Refund = () => {
  return (
    <Box p={8}>
      <Text fontSize="4xl" fontWeight="bold" mb={4}>
        Refund Policy
      </Text>

      <Text mb={4}>
        Our Return and Replacement Policy was last updated 06 April 2024.
      </Text>

      <Text mb={4}>
        Thank you for shopping at gurusiphone.com.
      </Text>

      <Text mb={4}>
        If for any reason, you are not completely satisfied with a purchase, we invite you to review our policy on refunds and returns. The following terms are applicable for any products that you’ve purchased from us.
      </Text>

      <Text fontWeight="bold" mt={6} mb={2}>
        Interpretation and Definitions
      </Text>
      <Text fontWeight="bold" mb={2}>
        Interpretation
      </Text>
      <Text mb={4}>
        The words in which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or plural.
      </Text>

      <Text fontWeight="bold" mt={6} mb={2}>
        Definitions
      </Text>
      <Text mb={4}>
        For the purposes of this Return and Refund Policy:
      </Text>
      <Box as="ul" pl={6} mb={4}>
        <Box as="li" mb={2}><Text fontWeight="bold">“Company”</Text> refers to Guru’s iPhone.</Box>
        <Box as="li" mb={2}><Text fontWeight="bold">“Goods”</Text> refers to the items offered for sale.</Box>
        <Box as="li" mb={2}><Text fontWeight="bold">“Orders”</Text> means a request by you to purchase goods from us.</Box>
        <Box as="li" mb={2}><Text fontWeight="bold">“Website”</Text> refers to gurusiphone.com, accessible from https://gurusiphone.com.</Box>
        <Box as="li" mb={2}><Text fontWeight="bold">“You”</Text> means the individual accessing or using the service, or the company or other legal entity on behalf of which such individual is accessing or using the service, as applicable.</Box>
      </Box>

      <Text fontWeight="bold" mt={6} mb={2}>
        Your Order Cancellation Rights
      </Text>
      <Text mb={4}>
        You are entitled to cancel your order within 24 hours without giving any reason for doing so.
      </Text>
      <Text mb={4}>
        In order to exercise your right of cancellation, you must inform us of your decision by means of a clear statement. You can inform us of your decision by:
      </Text>
      <Box as="ul" pl={6} mb={4}>
        <Box as="li" mb={2}>By sending us an email: <Text as="span" fontWeight="bold">guruIphone@gmail.com</Text></Box>
      </Box>
      <Text mb={4}>
        We will reimburse you no later than 14 days from the day on which we receive the returned Goods. We will use the same means of payment as you used for the Order, and you will not incur any fees for such reimbursement.
      </Text>

      <Text fontWeight="bold" mt={6} mb={2}>
        Conditions for Replacement
      </Text>
      <Text mb={4}>
        In order for the Goods to be eligible for a replacement, please make sure that:
      </Text>
      <Box as="ul" pl={6} mb={4}>
        <Box as="li" mb={2}>The goods were purchased in the last 14 days.</Box>
        <Box as="li" mb={2}>The goods are in the original packaging.</Box>
      </Box>
      <Text mb={4}>
        The following goods cannot be returned:
      </Text>
      <Box as="ul" pl={6} mb={4}>
        <Box as="li" mb={2}>Goods made to your specifications or clearly personalized.</Box>
        <Box as="li" mb={2}>Goods which according to their nature are not suitable to be returned, deteriorate rapidly or where the date of expiry is over.</Box>
        <Box as="li" mb={2}>Goods not suitable for return due to health protection or hygiene reasons and were unsealed after delivery.</Box>
        <Box as="li" mb={2}>Goods which, after delivery, are inseparably mixed with other items.</Box>
      </Box>
      <Text mb={4}>
        We reserve the right to refuse returns of any merchandise that does not meet the above return conditions at our sole discretion.
      </Text>

      <Text fontWeight="bold" mt={6} mb={2}>
        Returning Goods
      </Text>
      <Text mb={4}>
        You are responsible for the cost and risk of returning the goods to Us. You should send the goods to the following address:
      </Text>
      <Text mb={4}>
        Shop no 11<br />
        Shurdha Communication<br />
        Opp Post Office<br />
        Baldev Nagar<br />
        Ambala City, 134007<br />
      </Text>
      <Text mb={4}>
        We cannot be held responsible for goods damaged or lost in return shipment. Therefore, we recommend an insured and trackable mail service. We are unable to issue a refund without actual receipt of the goods or proof of received return delivery.
      </Text>

      <Text fontWeight="bold" mt={6} mb={2}>
        Contact Us
      </Text>
      <Text mb={4}>
        If you have any questions about our Returns and Refunds Policy, please contact us:
      </Text>
      <Text>
        Email: <Text as="span" fontWeight="bold">guruIphone@gmail.com</Text>
      </Text>
    </Box>
  );
};

export default Refund;
