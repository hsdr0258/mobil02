import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Link } from 'expo-router';

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([
        { id: '1', name: 'mochi', imageUrl: '../../assets/images/Mochi.jpg', price: 2.0, quantity: 1 },
        { id: '2', name: 'burrito', imageUrl: '../../assets/images/Burritos.jpg', price: 5.0, quantity: 1 },
        { id: '3', name: 'spagetty', imageUrl: '../../assets/images/spagetty.jpg', price: 2.0, quantity: 1 },
    ]);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0));
    }, [cartItems]);

    const increaseQuantity = (id) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price.toLocaleString()} $</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Xóa</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                renderItem={renderCartItem}
                keyExtractor={item => item.id}
            />
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Tổng tiền: {total.toLocaleString()} $</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton}>
                <Link href="./Succes">
                <Text style={styles.checkoutButtonText}>Thanh toán</Text>
                </Link>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5F5F5',
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#FFFAF0',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'center',
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 10,
        marginRight: 12,
        backgroundColor: 'white',
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF4500',
    },
    itemPrice: {
        fontSize: 14,
        color: '#D5006D',
        marginVertical: 5,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: '#28a745',
        borderRadius: 6,
        padding: 5,
        width: 30,
        alignItems: 'center',
    },
    quantityButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    quantityText: {
        marginHorizontal: 10,
        fontSize: 14,
    },
    removeButton: {
        marginLeft: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#f8d7da',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#dc3545',
        borderWidth: 1,
    },
    removeButtonText: {
        color: '#dc3545',
        fontWeight: 'bold',
        fontSize: 14,
    },
    totalContainer: {
        marginTop: 20,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    checkoutButton: {
        backgroundColor: '#FF4500',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CartScreen;
