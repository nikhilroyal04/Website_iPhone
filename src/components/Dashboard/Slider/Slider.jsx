import React from "react";
import { Box, Image, Flex, IconButton } from "@chakra-ui/react";
import Slider from "react-slick";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom previous button component
const PrevButton = ({ onClick }) => {
  return (
    <IconButton
      aria-label="Previous slide"
      icon={<ArrowBackIcon />}
      position="absolute"
      left="10px"
      top="50%"
      transform="translateY(-50%)"
      zIndex={1}
      onClick={onClick}
      size="lg"
      variant="outline"
      colorScheme="blue"
    />
  );
};

// Custom next button component
const NextButton = ({ onClick }) => {
  return (
    <IconButton
      aria-label="Next slide"
      icon={<ArrowForwardIcon />}
      position="absolute"
      right="10px"
      top="50%"
      transform="translateY(-50%)"
      zIndex={1}
      onClick={onClick}
      size="lg"
      variant="outline"
      colorScheme="blue"
    />
  );
};

// Custom dots component
const CustomDots = ({ dots }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      paddingTop: "20px", // Add padding to move dots below content
    }}
  >
    {dots.map((dot, index) => (
      <div
        key={index}
        style={{
          margin: "0 5px",
          width: dot.props.className.includes("slick-active") ? "12px" : "10px",
          height: dot.props.className.includes("slick-active")
            ? "12px"
            : "10px",
          backgroundColor: dot.props.className.includes("slick-active")
            ? "purple"
            : "gray",
          borderRadius: dot.props.className.includes("slick-active")
            ? "50%"
            : "0%",
          transition: "all 0.3s",
        }}
        onClick={dot.props.onClick}
      />
    ))}
  </div>
);

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextButton />,
    prevArrow: <PrevButton />,
    appendDots: (dots) => <CustomDots dots={dots} />,
  };

  const images = [
    "https://www.androidauthority.com/wp-content/uploads/2020/04/Motorola-Edge-landscape-in-hand.jpg",
    "https://static.toiimg.com/thumb/resizemode-4,msid-68089205,width-800,height-450,imgv-75/68089205.jpg",
    // "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fG1vdW50YWlufGVufDB8fHx8MTYyNTI4NDg3Nw&ixlib=rb-1.2.1&q=80&w=1080",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGJlYWNofGVufDB8fHx8MTYyNTI4NDg4MQ&ixlib=rb-1.2.1&q=80&w=1080",
  ];

  return (
    <Box
      maxW="80vw"
      maxH="80vh"
      h="auto"
      w="100%"
      mx="auto"
      mt={24}
      mb={10}
      position="relative"
    >
      <Slider {...settings}>
        {images.map((image, index) => (
          <Flex key={index} justify="center">
            <Image src={image} alt={`Slide ${index + 1}`} w="100%" h="auto" maxH="77vh" />
          </Flex>
        ))}
      </Slider>
    </Box>
  );
};

export default ImageSlider;
