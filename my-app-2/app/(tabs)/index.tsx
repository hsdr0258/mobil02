import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
} from "react-native";
import Slider from "../screens/Slider";
import ProductList from '../screens/Product';
import CategoryList from '../screens/Categories';
import { Link } from 'expo-router';

const { width: windowWidth } = Dimensions.get("window");

type SliderImage = {
  id: number;
  source: any;
};





const HomeScreen: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleCategoryPress = (categoryName: string) => {
    console.log(`Selected category: ${categoryName}`);
    // Add logic to handle category selection here
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <Image
          source={require("@/assets/images/logo1.jpg")}
          style={styles.logo}
        />
        <Link href="./search"><TextInput style={styles.searchInput} placeholder="Tìm kiếm . . . " /></Link>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.search}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Slider />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
          <TouchableOpacity > 
             <CategoryList/> 
          </TouchableOpacity>
        
      </ScrollView>

      
      <View>
        <ProductList/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5", // Sáng hơn
  },
  search: {
    color: "#FFF",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  proname: {
    color: "#FF4500", // Màu cam đỏ để tên sản phẩm nổi bật
    marginTop: 5,
    marginBottom: 3,
    fontSize: 16,
    fontWeight: "bold", // Làm đậm tên sản phẩm để nổi bật hơn
  },
  searchInput: {
    flex: 1,
    borderColor: "#CFCFCF",
    borderWidth: 1,
    borderRadius: 14,
    padding: 8,
  },
  searchButton: {
    marginLeft: 8,
    color: "white",
    backgroundColor: "#FFA500", // Sáng hơn
    padding: 10,
    borderRadius: 15,
  },
  sliderContainer: {
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
  },
  sliderImage: {
    height: "100%",
    width: "100%",
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    borderBottomColor: "black",
    color: "#FF6347", // Sáng hơn, màu đỏ cà chua để thu hút sự chú ý
    fontSize: 20,
    marginBottom: 12,
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  categoryCard: {
    fontSize: 12,
    marginHorizontal: 6,
    width: 90,
    color: "#333", // Sáng hơn
    backgroundColor: "#FFD700", // Sáng hơn
    borderRadius: 30,
    padding: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  addcart: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    fontSize: 18,
    width: "48%",
    backgroundColor: "#FFFAF0", // Màu nền sáng hơn, gần như trắng ngà để sản phẩm nổi bật
    borderRadius: 6,
    padding: 8,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000", // Thêm bóng để sản phẩm có chiều sâu
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Cho hiệu ứng bóng trên Android
  },
  productImage: {
    objectFit: "fill",
    backgroundColor: "white",
    height: 100,
    width: "100%",
    borderRadius: 6,
  },
  addButton: {
    paddingLeft: 10,
    justifyContent: "flex-end",
    marginTop: 8,
    backgroundColor: "#FF4500", // Nút thêm vào giỏ hàng với màu đỏ cam để nổi bật
    padding: 6,
    borderRadius: 6,
    alignItems: "center",
  },
  categoryText: {
    fontWeight: "bold",
    color: "#333", // Sáng hơn
    fontSize: 12,
    textAlign: "center",
  },
});

export default HomeScreen;
