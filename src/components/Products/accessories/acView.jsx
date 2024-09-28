import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccessoryById,
  selectAccessoryById,
  selectAccessoryError,
  selectAccessoryLoading,
} from "../../../app/Slices/accessorySlice"; 
import Loader from "../../NotFound/Loader";
import Error502 from "../../NotFound/Error502";

export default function acView() {
  // Use useParams to get the id from the URL
  const { id } = useParams();
  const dispatch = useDispatch();

  // Selectors to get the accessory data, loading status, and error message
  const accessoryData = useSelector(selectAccessoryById);
  const loading = useSelector(selectAccessoryLoading);
  const error = useSelector(selectAccessoryError);

  useEffect(() => {
    // Fetch accessory data based on the id when the component mounts
    dispatch(fetchAccessoryById(id));
  }, [dispatch, id]);

  return (
    <Box p={8} mt={16}>
      {/* Breadcrumb Navigation */}
      <Breadcrumb separator=">">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/categories">Shop</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/categories/accessories`}>Accessories</BreadcrumbLink>
        </BreadcrumbItem>
        {/* Conditionally render the accessory name in the breadcrumb */}
        {accessoryData && (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href={`/categories/accessories`}>
              {accessoryData.name} {/* Use appropriate property for accessory name */}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>

      {/* Loading State */}
      {loading && <Loader />}

      {/* Error Handling */}
      {error && <Error502 />}

      {/* Data Display */}
      {!loading && !error && accessoryData && (
        <>
          <Heading as="h2" size="lg" mb={4}>
            {accessoryData.name} Details {/* Use appropriate property for accessory name */}
          </Heading>
          <Text fontSize="xl">
            ID: <strong>{id}</strong>
          </Text>
          <Text mt={2}>
            Condition: <strong>{accessoryData.condition}</strong>
          </Text>
          <Text mt={2}>
            Warranty: <strong>{accessoryData.warranty}</strong>
          </Text>
          <Text mt={2}>
            Purchase Date: <strong>{accessoryData.purchaseDate}</strong>
          </Text>
          <Text mt={2}>Features: </Text>
          {/* Add more fields as needed */}
        </>
      )}
    </Box>
  );
}
