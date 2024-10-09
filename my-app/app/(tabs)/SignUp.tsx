import { Link } from "expo-router";
import React, { useState } from "react";
import { View, Image, StyleSheet, Text, SafeAreaView, TextInput, Button, Alert } from "react-native";

const TextInputExample = () => {
  const [titleText, setTitleText] = useState("Đăng ký");
  const bodyText = "Nhập thông tin tài khoản của bạn.";

  const onPressTitle = () => {
    setTitleText("Đăng ký [đã nhấn]");
  };

  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: "https://i.pinimg.com/236x/6d/26/8d/6d268da93ce1e36e7778a263befab8f3.jpg",
        }}
      />
      <Text style={styles.baseText}>
        <Text style={styles.titleText} onPress={onPressTitle}>
          {titleText}
        </Text>
        <Text numberOfLines={5}>{bodyText}</Text>
      </Text>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên tài khoản"
          value={text}
          onChangeText={onChangeText}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập email"
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập sdt"
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu"
          keyboardType="numeric"
          secureTextEntry
        />
      </SafeAreaView>
      
      <Link href='./home'>
        <Button
          title="Đăng Ký"
          color="#FF4500"  // Màu cam đỏ
          onPress={() => Alert.alert('Đăng ký thành công')}
        />
      </Link>
      
      {/* Chỉnh khoảng cách giữa các liên kết */}
      <View style={styles.linkContainer}>
        <Link href="./SignIn/" style={styles.textlink}>Đã có tài khoản</Link>
        <Link href="./SignIn/" style={styles.textlink}>Lấy lại mật khẩu</Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#FF4500',  // Màu cam đỏ cho viền input
  },
  container: {
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFAF0",  // Màu nền sáng hơn
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
  baseText: {
    fontFamily: "Cochin",
    textAlign: "center",
  },
  titleText: {
    fontSize: 24,  // Kích thước lớn hơn
    fontWeight: "bold",
    textAlign: "center",
    color: "#FF4500",  // Màu cam đỏ cho tiêu đề
    marginBottom: 8,
  },
  linkContainer: {
    marginTop: 10,
    alignItems: 'center', // Đảm bảo liên kết được căn giữa theo chiều dọc
  },
  textlink: {
    color: "#4CAF50",  // Màu xanh lá cho liên kết
    marginVertical: 5,  // Giảm khoảng cách dọc giữa các liên kết
  },
});

export default TextInputExample;
