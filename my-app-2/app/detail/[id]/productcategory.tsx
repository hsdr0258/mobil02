import { fetchProductCategories } from "../../api/product";
import Categories from "../../screens/Categories";

import { IMAGE_URL } from "../../url";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";

import Slider from './../../screens/Slider';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';


interface Product {
    id: number;
    name: string;
    category_id: number;
    description: string;
    image: string;
    price: number;
  }

export default function productcategory() {
    const {id} = useLocalSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProductcategories = async () => {
            try {
                const productsData = await fetchProductCategories(id);
                if (Array.isArray(productsData)) {
                    setProducts(productsData);
                } else {
                  console.error("Products data is not an array");
                }
              } catch (error) {
                console.error(error);
              } finally {
                setLoading(false);
              }
        };
    
        loadProductcategories();
      }, []);
    
      if (loading) {
        return <ActivityIndicator size="large" color="#FF4081" />;
      }
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}> 
        <View style={styles.container}>
      <TextInput 
        style={styles.searchInput} 
        placeholder="Tìm kiếm..." 
      />
      <Link href="../cart"><Icon name="cart" size={30} color="#000" style={styles.cartIcon} />
      </Link>
    </View>
    <Slider/>
    <Categories/>
    <View style={styles.productsContainer}>
      {products.map((product) => (
        <View key={product.id} style={styles.productCard}>
          <Link
            href={{
              pathname: "/product-detail/[id]",
              params: { id: product.id },
            }}
          >
            <View>
              <Image
                source={{
                  uri: `${IMAGE_URL}/products/${product.image}`,
                }}
                style={styles.productImage}
              />
              <Text style={styles.productName}>
                <Text style={styles.productName}>{product.name}</Text>
              </Text>
              <Text style={styles.productPrice}>
                {product.price.toLocaleString()} đ
              </Text>
            </View>
          </Link>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buyButton}>
              <Link href="../cart">
                <Icon
                  name="cart-outline"
                  size={30}
                  color="#EE0000"
                  style={styles.cartIcon}
                />
              </Link>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton}>
              <Link href="../cart" style={styles.textButton}>
                Mua ngay
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
      
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8', // Màu nền thanh tìm kiếm
    borderRadius: 8, // Bo góc
    elevation: 2, // Đổ bóng (chỉ trên Android)
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginRight: 10, // Khoảng cách giữa thanh tìm kiếm và biểu tượng
    marginTop: 10,
  },
  cartIcon: {
    padding: 5,
    marginTop: 10,
  },
  wrapper: {
    height: 220,
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 50,
    marginBottom:10,
  },
  button: {
    margin: 5,
    backgroundColor:"#003366"
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  productCard: {
    width: "48%", // Điều chỉnh để có khoảng cách tốt hơn
    backgroundColor: "#ffffff",
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
  },
//   cartIcon: {
//     padding: 2,
//   },
  productImage: {
    height: 120,
    width: "100%", // Đảm bảo hình ảnh chiếm đầy chiều rộng của card
    borderRadius: 8,
  },
  productName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 5,
    textAlign: "center",
    color: "black",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 5,
    textAlign: "center",
    color: "red",
  },
  addButton: {
    marginTop: 8,
    backgroundColor: "#003366",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%", // Đảm bảo các nút nằm trên cùng một dòng
  },
  buyButton: {
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "#EE0000",
    marginRight: 10,
    paddingVertical: 5,
    alignItems: "center",
    paddingLeft: 10,
    marginTop: 8,
  },
  textButton: {
    color: "white",
  },
});
