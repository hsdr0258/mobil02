import { fetchProductById } from '../../api/product';
import { IMAGE_URL } from '../../url';
import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';

interface Product {
  id: number;
  name: string;
  category_id: number;
  description: string;
  image: string;
  price: number;
}

const productdetail = () => {
  const {id} = useLocalSearchParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProductdetail = async () => {
      try {
        const productsData = await fetchProductById(id);
        setProduct(productsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProductdetail();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF4081" />;
  }

  const addToCart = () => {
    alert(`Đã thêm ${quantity} ${product?.name} vào giỏ hàng!`);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
 
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image source={{ uri: `${IMAGE_URL}/products/${product?.image}` }} style={styles.image} />
          <Text style={styles.productName}>{product?.name}</Text>
          <Text style={styles.productPrice}>{product?.price.toLocaleString()} đ</Text> {/* Thêm thẻ hiển thị giá sản phẩm */}
          <Text style={styles.productDetails}>{product?.description}</Text>

          <Text style={styles.label}>Số lượng:</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={decreaseQuantity}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={quantity.toString()}
              keyboardType="numeric"
              editable={false}
            />
            <TouchableOpacity
              onPress={increaseQuantity}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <Link href="./">
            <TouchableOpacity style={styles.button} onPress={addToCart}>
              <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </>
  );
};

export default productdetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
  },
  productName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  productPrice: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
    color: "#DD0000", // Màu giá sản phẩm
  },
  productDetails: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  quantityButton: {
    backgroundColor: "#DD0000",
    borderRadius: 5,
    padding: 10,
    width: 40,
    alignItems: "center",
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12,
    width: 60,
    textAlign: "center",
    marginHorizontal: 5,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#DD0000",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});