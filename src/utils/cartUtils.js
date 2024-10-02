import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../app/Slices/cartSlice";
import { selectUser } from "../app/Slices/authSlice";
import { useToast } from "@chakra-ui/react";

// Helper function to get and set local storage cart data for anonymous users
const getAnonymousCart = () => {
  const storedCart = localStorage.getItem("anonymousCart");
  return storedCart ? JSON.parse(storedCart) : { items: [] };
};

const setAnonymousCart = (cartData) => {
  localStorage.setItem("anonymousCart", JSON.stringify(cartData));
};

export const useAddToCart = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const toast = useToast();

  const userId = user ? user._id : null;

  const addToCart = (cartItem) => {
    if (userId) {
      // If user is logged in, dispatch action to update cart on the server
      const cartData = {
        items: [cartItem],
      };
      dispatch(addCartItem(userId, cartData));

      // Show success toast for logged-in user
      toast({
        title: "Item added to cart.",
        description: "Item has been added to your cart.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Handle anonymous users by storing cart data in localStorage
      const anonymousCart = getAnonymousCart();
      anonymousCart.items.push(cartItem);
      setAnonymousCart(anonymousCart);

      // Show success toast for anonymous user
      toast({
        title: "Item added to cart.",
        description: "Item has been added to your local cart.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return { addToCart };
};
