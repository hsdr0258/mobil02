import { Link } from "expo-router";
import React, { useState } from "react";
import { View, Image, StyleSheet, Text, SafeAreaView, TextInput, Button, Alert } from "react-native";

const TextInputExample = () => {
  const [titleText, setTitleText] = useState("Đăng nhập");
  const bodyText = "Nhập tài khoản và mật khẩu của bạn.";

  const onPressTitle = () => {
    setTitleText("Bird's Nest [pressed]");
  };

  const [text, onChangeText] = React.useState('Nhập tên tài khoản');
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
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Nhập mật khẩu"
          keyboardType="numeric"
          secureTextEntry
        />
      </SafeAreaView>

      <Link href='./home'>
        <Button
          title="Đăng Nhập"
          color="#FF4500" // Đổi thành màu cam đỏ
          onPress={() => Alert.alert('Đăng nhập thành công')}
        />
      </Link>

      <Link href="./SignUp/" style={styles.textlink}>Đăng ký</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#FF4500', // Đổi màu viền của input
  },
  container: {
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFAF0",  // Nền sáng hơn
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
  baseText: {
    fontFamily: "Cochin",
    textAlign: "center",
    marginBottom: 10,
  },
  titleText: {
    fontSize: 24,  // Tăng kích thước font
    fontWeight: "bold",
    textAlign: "center",
    color: "#FF4500",  // Màu cam đỏ cho tiêu đề
    marginBottom: 8,
  },
  textlink: {
    color: "#4CAF50",  // Màu xanh lá cho liên kết "Đăng ký"
    margin: 10,
  },
});

export default TextInputExample;
