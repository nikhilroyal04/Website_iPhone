import React, { useState } from "react";
import { Box, Button, VStack, Text } from "@chakra-ui/react";
import AddressSelection from "./AddressSelection";
import { useNavigate } from "react-router-dom";
import Payment from "./PaymentPage";
import ThankYou from "./ThankYou";
import { selectUser } from "../../../app/Slices/authSlice";
import { useSelector } from "react-redux";

const Stepper = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null); // Added selectedAddress state

  const [orderDetails, setOrderDetails] = useState({
    shippingAddress: {},
    billingAddress: {},
    paymentInfo: {},
    productId: "66f4cdd5eec02d69bb763651",
    productName: "Sample Product",
    quantity: 2,
    amount: 2,
    orderStatus: "Pending",
  });

  const steps = [
    {
      title: "Address Selection",
      component: (
        <AddressSelection
          setOrderDetails={(data) =>
            setOrderDetails((prev) => ({ ...prev, ...data }))
          }
          selectedAddress={selectedAddress} // Pass selected address
          setSelectedAddress={setSelectedAddress} // Pass setter for selected address
        />
      ),
    },
    {
      title: "Payment",
      component: (
        <Payment
          orderDetails={orderDetails}
          setOrderDetails={(data) =>
            setOrderDetails((prev) => ({ ...prev, paymentInfo: data }))
          }
        />
      ),
    },
    {
      title: "Thank You",
      component: <ThankYou orderDetails={orderDetails} />,
    },
  ];

  const handleNext = () => {
    if (currentStep === 0) {
      if (
        !orderDetails.shippingAddress ||
        !orderDetails.shippingAddress.addressLine1
      ) {
        setError("Please select a address.");
        return;
      }
    } else if (currentStep === 1) {
      if (!orderDetails.paymentInfo || !orderDetails.paymentInfo.method) {
        setError("Please enter payment information.");
        return;
      }
    }

    setError("");
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Final Order Data:", orderDetails);
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      navigate("/bag");
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={6}>
        <Box>{steps[currentStep].component}</Box>

        {error && (
          <Text color="red.500" fontSize="md" mt={2}>
            {error}
          </Text>
        )}

        {currentStep < steps.length - 1 &&
          user && ( // Show buttons only if not on the last step and user is logged in
            <Box mb={10} display="flex" justifyContent="center" width="full">
              <Button
                onClick={handleBack}
                colorScheme="blue"
                variant="solid"
                size="lg"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                ml={4}
                colorScheme="green"
                variant="solid"
                size="lg"
                _hover={{ transform: "scale(1.1)" }}
              >
                {currentStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          )}
      </VStack>
    </Box>
  );
};

export default Stepper;
