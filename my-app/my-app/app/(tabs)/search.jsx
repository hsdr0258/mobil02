import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { fetchSearchProducts } from "../api/product";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

export default function Search() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term) {
      setIsLoading(true);
      const results = await fetchSearchProducts(term);
      setFilteredData(results);
      setIsLoading(false);
    } else {
      setFilteredData([]);
    }
  };

  const resetSearch = () => {
    setSearchTerm("");
    setFilteredData([]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/product-details/[id]",
          params: { id: item.id },
        })
      }
      key={item.id}
      style={styles.productCard}
    >
      <Image
        source={{
          uri: `http://localhost/shop/public/images/products/${item.image}`,
        }}
        style={styles.productImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.proname}>{item.name}</Text>
        <Text style={styles.itemPrice}>$ {item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  useFocusEffect(
    React.useCallback(() => {
      resetSearch();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Logo và tiêu đề */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo1.jpg")} // Đảm bảo rằng logo có trong thư mục assets
          style={styles.logo}
        />
        <Text style={styles.title}>Tìm Kiếm!</Text>
      </View>

      {/* Ô tìm kiếm */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm thứ bạn muốn..."
          placeholderTextColor="#ccc"
          value={searchTerm}
          onChangeText={handleSearch}
        />
      </View>

      {/* Kết quả tìm kiếm */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#FF4500" />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6347",
    textAlign: "center",
  },
  searchContainer: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    padding: 15,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CFCFCF",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  list: {
    paddingBottom: 20,
  },
  productCard: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 6,
    backgroundColor: "#FFFAF0",
    marginBottom: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: "white",
  },
  textContainer: {
    flex: 1,
  },
  proname: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF4500",
  },
  itemPrice: {
    fontSize: 18,
    color: "#D5006D",
  },
});
