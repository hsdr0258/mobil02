import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { fetchProductById, fetchRelatedProducts } from "../api/product";
import { useRoute } from "@react-navigation/native";

export default function ProductDetails() {
  const route = useRoute();
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data.product);

        const relatedData = await fetchRelatedProducts(id);
        setRelatedProducts(relatedData.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    // Logic thêm vào giỏ hàng (có thể lưu vào state toàn cục hoặc database)
    console.log(`Thêm ${quantity} sản phẩm vào giỏ hàng`);
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FF4500" />;
  }

  if (!product) {
    return <Text style={styles.errorText}>Không tìm thấy sản phẩm</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `http://localhost/shop/public/images/products/${product.image}` }}
        style={styles.mainImage}
        resizeMode="cover"
      />
      <View style={styles.header}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>Giá: $ {product.price}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.productDescription}>{product.description}</Text>

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Số lượng:</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={handleAddToCart} style={styles.addButton}>
          <Text style={styles.addButtonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>


        <Text style={styles.relatedTitle}>Sản phẩm liên quan</Text>
        <View style={styles.relatedProductsContainer}>
          {relatedProducts.map((relatedProduct) => (
            <TouchableOpacity
              key={relatedProduct.id}
              style={styles.relatedProductCard}
            >
              <Image
                source={{ uri: `http://localhost/shop/public/images/products/${relatedProduct.image}` }}
                style={styles.relatedProductImage}
                resizeMode="cover"
              />
              <Text style={styles.relatedProductName}>{relatedProduct.name}</Text>
              <Text style={styles.relatedProductPrice}>$ {relatedProduct.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFAF0",
  },
  mainImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF4500",
    textAlign: "center",
  },
  productPrice: {
    fontSize: 20,
    color: "#FF6347",
    fontWeight: "bold",
    marginTop: 10,
  },
  productDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "justify",
  },
  scrollContainer: {
    paddingTop: 10,
    paddingBottom: 80,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 16,
    color: "#333", // Màu xám đậm cho nhãn "Số lượng"
    marginRight: 10,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#FFD700", // Màu vàng đậm hơn cho nút tăng/giảm
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 16,
    color: "#FF4500", // Sử dụng màu cam đậm để dễ nhìn hơn
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#FF4500",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  additionalDetails: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#FFE4B5",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  detailsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF4500",
    marginBottom: 8,
  },
  detailsText: {
    fontSize: 14,
    color: "#333",
    textAlign: "justify",
  },
  relatedTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF4500",
    marginTop: 30,
    marginBottom: 10,
  },
  relatedProductsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  relatedProductCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  relatedProductImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  relatedProductName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  relatedProductPrice: {
    fontSize: 16,
    color: "#FF4500",
    fontWeight: "bold",
  },
});
