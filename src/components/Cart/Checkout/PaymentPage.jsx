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
  Stack,
  Grid,
  Image,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

// Dummy Card Icons (Replace with actual icon paths)
const cardIcons = {
  Visa: "path/to/visa-icon.png", // Replace with the actual path to your Visa icon
  MasterCard: "path/to/mastercard-icon.png", // Replace with the actual path to your MasterCard icon
  RuPay: "path/to/rupay-icon.png", // Replace with the actual path to your RuPay icon
  "American Express": "path/to/amex-icon.png", // Replace with the actual path to your American Express icon
};

const cardTypes = [
  { name: "Visa", ranges: [/^4/], lengths: [13, 16] },
  { name: "MasterCard", ranges: [/^5[1-5]/], lengths: [16] },
  { name: "RuPay", ranges: [/^60/, /^65/, /^81/], lengths: [16] },
  { name: "American Express", ranges: [/^34/, /^37/], lengths: [15] },
];

const paymentOptions = [
  { value: "credit-card", label: "Debit/Credit Card" },
  { value: "upi", label: "UPI" },
  { value: "qr-code", label: "QR Code" },
];

export default function PaymentPage({ orderDetails, setOrderDetails }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardType, setCardType] = useState("");
  const [error, setError] = useState("");

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  // Luhn algorithm for card number validation
  const isValidCardNumber = (number) => {
    let sum = 0;
    let alternate = false;
    for (let i = number.length - 1; i >= 0; i--) {
      let n = parseInt(number.charAt(i), 10);
      if (alternate) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      sum += n;
      alternate = !alternate;
    }
    return sum % 10 === 0;
  };

  // Function to identify card type
  const identifyCardType = (number) => {
    const cleanedNumber = number.replace(/\D/g, "");
    for (const card of cardTypes) {
      for (const range of card.ranges) {
        if (
          range.test(cleanedNumber) &&
          card.lengths.includes(cleanedNumber.length)
        ) {
          return card.name;
        }
      }
    }
    return null;
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formattedValue = value.replace(/(.{4})/g, "$1 ").trim();

    setCardNumber(formattedValue);

    if (value.length > 0) {
      const type = identifyCardType(formattedValue);
      setCardType(type ? `Card Type: ${type}` : "Invalid Card Type");
    } else {
      setCardType("");
    }
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    const formattedValue =
      value.length > 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value;
    setExpiry(formattedValue);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvv(value);
  };

  const handleConfirmPayment = () => {
    if (selectedPaymentMethod === "credit-card") {
      if (!cardName || !cardNumber || !expiry || !cvv) {
        alert("Please fill all credit card fields.");
        return;
      }

      const cleanedCardNumber = cardNumber.replace(/\D/g, "");
      if (!isValidCardNumber(cleanedCardNumber)) {
        alert("Invalid card number. Please check your card details.");
        return;
      }

      const type = identifyCardType(cleanedCardNumber);
      if (!type) {
        alert("Invalid card number. Please check your card details.");
        return;
      }

      setOrderDetails((prev) => ({
        ...prev,
        paymentInfo: {
          method: "Credit Card",
          details: {
            cardName,
            cardNumber: cleanedCardNumber,
            expiry,
            cvv,
          },
        },
      }));
    } else if (selectedPaymentMethod === "upi") {
      if (!upiId) {
        alert("Please enter your UPI ID.");
        return;
      }
      setOrderDetails((prev) => ({
        ...prev,
        paymentInfo: {
          method: "UPI",
          details: {
            upiId,
          },
        },
      }));
    } else if (selectedPaymentMethod === "qr-code") {
      setOrderDetails((prev) => ({
        ...prev,
        paymentInfo: {
          method: "QR Code",
          details: {
            message: "QR Code payment initiated.",
          },
        },
      }));
    }
  };

  return (
    <Box p={5} mt={5} height="100vh" width="90vw">
      <Box
        bg="white"
        p={6}
        borderRadius="md"
        boxShadow="lg"
        height="90vh"
        overflow="auto"
      >
        <Grid
          templateColumns={{ base: "1fr", md: "30% 1px 50%" }}
          gap={4}
          height="100%"
          justifyContent="space-around"
        >
          {/* Top Side - Payment Options */}
          <VStack align="stretch" spacing={6}>
            <Heading as="h3" size="md" textAlign="center" color="blue.500">
              Select Payment Method
            </Heading>
            {paymentOptions.map((option) => (
              <Button
                key={option.value}
                onClick={() => handlePaymentMethodChange(option.value)}
                variant={
                  selectedPaymentMethod === option.value ? "solid" : "outline"
                }
                colorScheme="blue"
                size="md"
                width="full"
              >
                {option.label}
              </Button>
            ))}
          </VStack>

          {/* Vertical Divider */}
          <Divider orientation="vertical" height="100%" />

          {/* Bottom Side - Payment Details */}
          <Box>
            <Heading
              as="h3"
              size="md"
              textAlign="center"
              color="blue.500"
              mb={4}
            >
              {selectedPaymentMethod
                ? `Payment Details for ${selectedPaymentMethod.replace(
                    "-",
                    " "
                  )}`
                : "Select a Payment Method"}
            </Heading>
            <Divider mb={4} />

            {selectedPaymentMethod && (
              <VStack spacing={4} align="stretch">
                {selectedPaymentMethod === "credit-card" ? (
                  <>
                    <FormControl>
                      <FormLabel htmlFor="cardName">Cardholder Name</FormLabel>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel htmlFor="cardNumber">Card Number</FormLabel>
                      <InputGroup>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                        />
                        {cardType && (
                          <InputRightElement width="4.5rem">
                            <Image
                              src={
                                cardIcons[
                                  cardType.replace("Card Type: ", "")
                                ] || ""
                              }
                              alt={cardType}
                              boxSize="30px" // Adjust the size as needed
                            />
                          </InputRightElement>
                        )}
                      </InputGroup>
                      {error && <Text color="red.500">{error}</Text>}
                    </FormControl>

                    <HStack spacing={4}>
                      <FormControl>
                        <FormLabel htmlFor="expiry">Expiry Date</FormLabel>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={handleExpiryChange}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="cvv">CVV</FormLabel>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cvv}
                          onChange={handleCvvChange}
                        />
                      </FormControl>
                    </HStack>
                  </>
                ) : selectedPaymentMethod === "upi" ? (
                  <FormControl>
                    <FormLabel htmlFor="upiId">UPI ID</FormLabel>
                    <Input
                      id="upiId"
                      placeholder="example@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </FormControl>
                ) : selectedPaymentMethod === "qr-code" ? (
                  <Text fontSize="lg" color="gray.600" textAlign="center">
                    QR Code payment initiated.
                  </Text>
                ) : null}

                <Stack spacing={4} align="center">
                  <Button
                    colorScheme="blue"
                    size="lg"
                    width="full"
                    onClick={handleConfirmPayment}
                  >
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
