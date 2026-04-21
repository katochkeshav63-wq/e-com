import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState([]);

    const { isSignedIn } = useUser();

    const addToCart = (product) => {
        if (!isSignedIn) {
            toast.error("Please login first!");
            return false;   // ✅ signal to component
        }

        const itemInCart = cartItem.find((item) => item.id === product.id);

        if (itemInCart) {
            const updatedCart = cartItem.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setCartItem(updatedCart);
            toast.success("Product quantity increased!");
        } else {
            setCartItem([...cartItem, { ...product, quantity: 1 }]);
            toast.success("Product added to cart!");
        }

        return true;
    };

    const updateQuantity = (productId, action) => {
        if (!isSignedIn) {
            toast.error("Please login first!");
            return false;
        }

        setCartItem((prevCart) =>
            prevCart
                .map((item) => {
                    if (item.id === productId) {
                        let newQty = item.quantity;

                        if (action === "increase") {
                            newQty += 1;
                        } else if (action === "decrease") {
                            newQty -= 1;
                        }

                        return newQty > 0
                            ? { ...item, quantity: newQty }
                            : null;
                    }
                    return item;
                })
                .filter((item) => item !== null)
        );

        return true;
    };

    const deleteItem = (productId) => {
        if (!isSignedIn) {
            toast.error("Please login first!");
            return false;
        }

        setCartItem((prevCart) =>
            prevCart.filter((item) => item.id !== productId)
        );

        toast.success("Product removed from cart!");
        return true;
    };

    return (
        <CartContext.Provider
            value={{
                cartItem,
                setCartItem,
                addToCart,
                updateQuantity,
                deleteItem,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);