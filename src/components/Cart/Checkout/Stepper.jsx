import React, { useState } from "react";
import { Box, Button, VStack, Text } from "@chakra-ui/react";
import AddressSelection from "./AddressSelection";
import Payment from "./PaymentPage";
import ThankYou from "./ThankYou";
import { selectUser } from "../../../app/Slices/authSlice";
import { useSelector } from "react-redux";

const Stepper = () => {
  const user = useSelector(selectUser);
  const [currentStep, setCurrentStep] = useState(0);

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
        />
      ),
    },
    {
      title: "Payment",
      component: (
        <Payment
          orderDetails={orderDetails}
          setOrderDetails={(data) =>
            setOrderDetails((prev) => ({ ...prev, ...data }))
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
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Here you can dispatch or send the orderDetails to your API
      console.log("Final Order Data:", orderDetails);
      // Dispatch or send the data to the API
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={6}>
        <Box>{steps[currentStep].component}</Box>
        {currentStep < steps.length - 1 &&
          user && ( // Show buttons only if not on the last step and user is logged in
            <Box mb={10} display="flex" justifyContent="center" width="full">
              <Button
                onClick={handleBack}
                isDisabled={currentStep === 0}
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
