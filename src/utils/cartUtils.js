import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../app/Slices/cartSlice";
import { selectUser } from "../app/Slices/authSlice";
import { useToast } from "@chakra-ui/react";

export const useAddToCart = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const toast = useToast();

  // Check if user is logged in before adding an item to the cart
  // if (!user) {
  //   // Show a notification if the user is not logged in
  //   toast({
  //     title: "Login Required",
  //     description: "You need to be logged in to add items to your cart.",
  //     status: "error",
  //     duration: 3000,
  //     isClosable: true,
  //   });
  // }

  const userId = user ? user._id : null;

  const addToCart = (cartItem) => {
    const cartData = {
      items: [cartItem],
    };
    // Dispatch the action to add the item to the cart
    dispatch(addCartItem(userId, cartData));

    // Show a success notification
    toast({
      title: "Item added to cart.",
      description: "Item has been added to your cart.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return { addToCart };
};
