import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { fetchProducts } from "./../api/product";

interface Product {
  id: number;
  name: string;
  category_id: string;
  description: string;
  image: string;
  price: number;
}

const Product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        console.log(products); // Kiểm tra phản hồi API
        if (products) {
          setProducts(products);
        } else {
          console.error("Products data is not an array");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF4500" />; // Sử dụng màu từ HomeScreen
  }

  return (
    <>
      <Text style={styles.title}>Sản phẩm nổi bật</Text>

      <View style={styles.productsContainer}>
        {products.map((product) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "../product-detail/[id]",
                params: { id: product.id },
              })
            }
            key={product.id}
            style={styles.productCard}
          >
            <Image
              source={{
                uri: `http://localhost/shop/public/images/products/${product.image}`,
              }}
              style={styles.productImage}
            />
            <Text style={styles.proname}>{product.name}</Text>
            <Text>{product.price.toLocaleString()}</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addcart}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default Product;

const styles = StyleSheet.create({
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    backgroundColor: "#FFFAF0", // Màu nền gần trắng ngà từ HomeScreen
    borderRadius: 6,
    padding: 8,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  productImage: {
    height: 100,
    width: "100%",
    borderRadius: 6,
    backgroundColor: "white",
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 12,
    color: "#FF6347", // Màu đỏ cà chua sáng từ HomeScreen
    textAlign: "center",
  },
  proname: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF4500", // Màu cam đỏ nổi bật cho tên sản phẩm
    marginVertical: 8,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#FF4500", // Nút thêm vào giỏ hàng màu đỏ cam
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
  },
  addcart: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
});
