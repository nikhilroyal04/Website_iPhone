import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Grid,
} from "@chakra-ui/react";

const paymentOptions = [
  { value: "credit-card", label: "Credit Card" },
  { value: "debit-card", label: "Debit Card" },
  { value: "upi", label: "UPI" },
  { value: "net-banking", label: "Net Banking" },
];

export default function PaymentPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <Box p={5} mt={5} height="100vh" width="80vw">
      <Box
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        p={6}
      >
        <Heading as="h2" size="lg" textAlign="center" color="blue.600" mb={4}>
          Payment Options & Details
        </Heading>
        <Divider mb={4} />

        <Grid templateColumns={{ base: "1fr", md: "1fr auto 1fr" }} gap={6}>
          {/* Payment Options Section */}
          <Box>
            <Heading as="h3" size="md" textAlign="center" color="blue.500" mb={4}>
              Select a Payment Method
            </Heading>
            {paymentOptions.map((option) => (
              <Button
                key={option.value}
                onClick={() => handlePaymentMethodChange(option.value)}
                variant="outline"
                colorScheme="blue"
                size="md"
                width="full"
                mb={3}
              >
                {option.label}
              </Button>
            ))}
          </Box>

          {/* Vertical Divider */}
          <Divider orientation="vertical" borderColor="gray.300" mx={10} />

          {/* Payment Details Section */}
          <Box>
            <Heading as="h3" size="md" textAlign="center" color="blue.500" mb={4}>
              {selectedPaymentMethod
                ? `Payment Details for ${selectedPaymentMethod.replace('-', ' ')}`
                : "Select a Payment Method"}
            </Heading>
            <Divider mb={4} />

            {selectedPaymentMethod && (
              <VStack spacing={4} align="stretch">
                {selectedPaymentMethod === "credit-card" || selectedPaymentMethod === "debit-card" ? (
                  <>
                    <FormControl>
                      <FormLabel htmlFor="cardName">Cardholder Name</FormLabel>
                      <Input id="cardName" placeholder="John Doe" />
                    </FormControl>

                    <FormControl>
                      <FormLabel htmlFor="cardNumber">Card Number</FormLabel>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </FormControl>

                    <HStack spacing={4}>
                      <FormControl>
                        <FormLabel htmlFor="expiry">Expiry Date</FormLabel>
                        <Input id="expiry" placeholder="MM/YY" />
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="cvv">CVV</FormLabel>
                        <Input id="cvv" placeholder="123" />
                      </FormControl>
                    </HStack>
                  </>
                ) : selectedPaymentMethod === "upi" ? (
                  <FormControl>
                    <FormLabel htmlFor="upiId">UPI ID</FormLabel>
                    <Input id="upiId" placeholder="example@upi" />
                  </FormControl>
                ) : selectedPaymentMethod === "net-banking" ? (
                  <FormControl>
                    <FormLabel htmlFor="bankAccount">Bank Account Number</FormLabel>
                    <Input id="bankAccount" placeholder="1234567890" />
                  </FormControl>
                ) : null}

                <Stack spacing={4} align="center">
                  <Button colorScheme="blue" size="lg" width="full">
                    Confirm Payment
                  </Button>
                  <Text color="gray.600" fontSize="sm">
                    By proceeding, you agree to our Terms and Conditions.
                  </Text>
                </Stack>
              </VStack>
            )}
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
