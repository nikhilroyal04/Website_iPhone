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
  fetchAndroidById,
  selectAndroidById,
  selectAndroidError,
  selectAndroidLoading,
} from "../../../app/Slices/androidSlice"; 
import Loader from "../../NotFound/Loader";
import Error502 from "../../NotFound/Error502";

export default function adView() {
  // Use useParams to get the id from the URL
  const { id } = useParams();
  const dispatch = useDispatch();

  // Selectors to get the Android data, loading status, and error message
  const androidData = useSelector(selectAndroidById);
  const loading = useSelector(selectAndroidLoading);
  const error = useSelector(selectAndroidError);

  useEffect(() => {
    // Fetch Android data based on the id when the component mounts
    dispatch(fetchAndroidById(id));
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
          <BreadcrumbLink href={`/categories/android`}>Android</BreadcrumbLink>
        </BreadcrumbItem>
        {/* Conditionally render the model name in the breadcrumb */}
        {androidData && (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href={`/categories/android`}>
              {androidData.model}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>

      {/* Loading State */}
      {loading && <Loader />}

      {/* Error Handling */}
      {error && <Error502 />}

      {/* Data Display */}
      {!loading && !error && androidData && (
        <>
          <Heading as="h2" size="lg" mb={4}>
            {androidData.model} Details
          </Heading>
          <Text fontSize="xl">
            ID: <strong>{id}</strong>
          </Text>
          <Text mt={2}>
            Release Year: <strong>{androidData.releaseYear}</strong>
          </Text>
          <Text mt={2}>
            Condition: <strong>{androidData.condition}</strong>
          </Text>
          <Text mt={2}>
            Warranty: <strong>{androidData.warranty}</strong>
          </Text>
          <Text mt={2}>
            Purchase Date: <strong>{androidData.purchaseDate}</strong>
          </Text>
          <Text mt={2}>Features: </Text>
          {/* Add additional data display as needed */}
        </>
      )}
    </Box>
  );
}
