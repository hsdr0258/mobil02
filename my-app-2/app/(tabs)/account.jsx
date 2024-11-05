import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";

export default function Account() {
  return (
    <ThemedView style={styles.container}>
      <Image
        source={require("@/assets/images/logo1.jpg")}
        style={styles.logo}
      />

      <ThemedText type="title" style={styles.headerText}>
        Cài đặt tài khoản
      </ThemedText>

      <TouchableOpacity style={styles.option}>
        <ThemedText type="defaultSemiBold" style={styles.optionText}>
          Thông tin cá nhân
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <ThemedText type="defaultSemiBold" style={styles.optionText}>
          Bảo mật
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Link href="/screens/Cart">
          <ThemedText type="defaultSemiBold" style={styles.optionText}>
            Giỏ hàng
          </ThemedText>
        </Link>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <ThemedText type="defaultSemiBold" style={styles.optionText}>
          Ngôn ngữ
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Link href="/SignIn">
          <ThemedText type="defaultSemiBold" style={styles.optionText}>
            Đăng xuất
          </ThemedText>
        </Link>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5", // Sáng hơn
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    color: "#FF4500", // Màu cam đỏ để đồng nhất với Home
    marginBottom: 20,
    fontWeight: "bold",
  },
  option: {
    backgroundColor: "#FFFAF0", // Nền sáng, gần trắng ngà
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  optionText: {
    color: "#333", // Sáng hơn
    fontSize: 16,
  },
});
