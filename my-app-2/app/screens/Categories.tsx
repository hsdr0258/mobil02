import React, { useEffect, useState } from "react";
import { fetchCategories } from "../api/categories";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native";
import { Link } from "expo-router";

interface Category {
  id: number;
  name: string;
  description: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchCategories();
        if (categories) {
          setCategories(categories);
        } else {
          console.error("Categories data is not an array");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF4081" />;
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      <View style={styles.categoryCard}>
        <Link href={"/"} style={styles.categoryButton}>
          <Text style={styles.categoryText}>Tất cả</Text>
        </Link>
      </View>
      {categories.map((category) => (
        <View key={category.id} style={styles.categoryCard}>
          <Link
            href={{
              pathname: "/detail/[id]/productcategory",
              params: { id: category.id },
            }}
            style={styles.categoryButton}
          >
            <Text style={styles.categoryText}>{category.name}</Text>
          </Link>
        </View>
      ))}
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#F5F5F5", // Màu nền sáng hơn
  },
  categoryCard: {
    marginHorizontal: 6,
    backgroundColor: "#FFD700", // Màu nền sáng hơn
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    fontWeight: "bold",
    color: "#333", // Màu chữ đậm hơn
    fontSize: 12,
  },
});
