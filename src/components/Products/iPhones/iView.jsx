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
  fetchiPhoneById,
  selectiPhoneById,
  selectiPhoneError,
  selectiPhoneLoading,
} from "../../../app/Slices/iPhoneSlice";
import Loader from "../../NotFound/Loader";
import Error502 from "../../NotFound/Error502";

export default function IView() {
  // Use useParams to get the id from the URL
  const { id } = useParams();
  const dispatch = useDispatch();

  // Selectors to get the iPhone data, loading status, and error message
  const iPhoneData = useSelector(selectiPhoneById);
  const loading = useSelector(selectiPhoneLoading);
  const error = useSelector(selectiPhoneError);

  useEffect(() => {
    // Fetch iPhone data based on the id when the component mounts
    dispatch(fetchiPhoneById(id));
  }, [dispatch, id]);

  console.log("data", iPhoneData);

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
          <BreadcrumbLink href={`/categories/iPhone`}>iPhone</BreadcrumbLink>
        </BreadcrumbItem>
        {/* Conditionally render the model name in the breadcrumb */}
        {iPhoneData && (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href={`/categories/iPhone`}>
              {iPhoneData.model}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>

      {/* Loading State */}
      {loading && <Loader />}

      {/* Error Handling */}
      {error && <Error502 />}

      {/* Data Display */}
      {!loading && !error && iPhoneData && (
        <>
          <Heading as="h2" size="lg" mb={4}>
            {iPhoneData.model} Details
          </Heading>
          <Text fontSize="xl">
            ID: <strong>{id}</strong>
          </Text>
          <Text mt={2}>
            Release Year: <strong>{iPhoneData.releaseYear}</strong>
          </Text>
          <Text mt={2}>
            Condition: <strong>{iPhoneData.condition}</strong>
          </Text>
          <Text mt={2}>
            Warranty: <strong>{iPhoneData.warranty}</strong>
          </Text>
          <Text mt={2}>
            Purchase Date: <strong>{iPhoneData.purchaseDate}</strong>
          </Text>
          <Text mt={2}>Features: </Text>
        </>
      )}
    </Box>
  );
}
