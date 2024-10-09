import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  FlatList,
} from "react-native";

type CartItem = {
  id: number;
  name: string;
  image: any;
  price: number;
  quantity: number;
};

type Product = {
  id: number;
  name: string;
  image: any;
  price: number;
};

const products: Product[] = [
  { id: 1, name: "Hambebuger", image: require("@/assets/images/hambebuger.jpg"), price: 12.99 },
  { id: 2, name: "Spagetty", image: require("@/assets/images/spagetty.jpg"), price: 15.49 },
  { id: 3, name: "Burritos", image: require("@/assets/images/Burritos.jpg"), price: 8.99 },
  { id: 4, name: "Mochi", image: require("@/assets/images/Mochi.jpg"), price: 6.49 },
];

const CartScreen: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingItemIndex > -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => (item.id === id ? { ...item, quantity } : item)));
    }
  };

  const calculateTotal = (): string => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.cartItemQuantity}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.cartItemQuantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCartItem}
        ListEmptyComponent={<Text style={styles.emptyCartText}>Your cart is empty.</Text>}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
      </View>

      <Text style={styles.sectionHeader}>Available Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {cartItems.length > 0 && (
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#eaeaea", // Adjusted to a light gray background similar to homeScreen
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 16,
    color: "#333333", // Darker text to match homeScreen
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 16,
    color: "#555555", // Slightly muted color for headings
  },
  cartItem: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#ffffff", // Keep a white background for contrast
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 4,
    color: "#111111", // Darker text for product name
  },
  cartItemPrice: {
    fontSize: 16,
    color: "#777777", // Muted gray for price text
  },
  cartItemQuantity: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityButton: {
    fontSize: 18,
    color: "#28A745", // Green accent for quantity buttons
    paddingHorizontal: 10,
  },
  cartItemQuantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  totalContainer: {
    marginVertical: 16,
    alignItems: "flex-end",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222222", // Darker text for total price
  },
  productCard: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#ffffff", // White background for products
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 4,
    color: "#222222", // Darker text for product names
  },
  productPrice: {
    fontSize: 16,
    color: "#666666", // Muted gray for price text
  },
  addToCartButton: {
    marginTop: 8,
    backgroundColor: "#FF6347", // Red accent for add to cart button, similar to homeScreen
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  addToCartText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  checkoutButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#FF6347", // Red accent for checkout button
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  checkoutText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#888888", // Light gray for empty cart message
  },
});


export default CartScreen;
