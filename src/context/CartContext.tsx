import React, { createContext, useState, useContext } from 'react';
import { Product } from '../data/products';

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    incrementQuantity: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const incrementQuantity = (productId: string) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const removeFromCart = (productId: string) => {
        setCart((prev) =>
            prev.reduce((acc, item) => {
                if (item.id === productId) {
                    if (item.quantity > 1) {
                        acc.push({ ...item, quantity: item.quantity - 1 });
                    }
                } else {
                    acc.push(item);
                }
                return acc;
            }, [] as CartItem[])
        );
    };

    const updateQuantity = (productId: string, quantity: number) => {
        setCart((prev) =>
            prev.map((item) => {
                if (item.id === productId) {
                    return { ...item, quantity: Math.max(1, quantity) };
                }
                return item;
            })
        );
    };

    const clearCart = () => setCart([]);
    
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementQuantity, updateQuantity, clearCart, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}