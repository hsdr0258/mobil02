import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { API_URL } from '../url';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (password !== confirmpassword) {
      setMessage("Mật khẩu không khớp");
      Alert.alert("Lỗi", "Mật khẩu không khớp");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: confirmpassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Đăng ký thành công");
        Alert.alert("Thành công", "Đăng ký thành công");
        router.push({ pathname: "/(tabs)/SignIn" });
      } else {
        setMessage(data.message || "Có lỗi xảy ra");
        Alert.alert("Lỗi", data.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      setMessage("Đăng ký thất bại");
      Alert.alert("Lỗi", "Đăng ký thất bại");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={require('../../assets/images/logo1.jpg')} 
        style={styles.imageLogo} 
        resizeMode="contain" 
      />
      <Text style={styles.heading}>Đăng Ký</Text>

      <TextInput
        style={styles.input}
        placeholder="Họ và Tên"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#A0A0A0"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#A0A0A0"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#A0A0A0"
      />
      <TextInput
        style={styles.input}
        placeholder="Xác nhận mật khẩu"
        secureTextEntry
        value={confirmpassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#A0A0A0"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng Ký</Text>
      </TouchableOpacity>

      <Text style={styles.textFooter}>
        Đã có tài khoản?{' '}
        <Link href="./(tabs)/SignIn" style={styles.linkText}>Đăng Nhập</Link>
      </Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFFAF0',
  },
  message: {
    fontSize: 18,
    color: "green",
    textAlign: "center",
    marginVertical: 10,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF6347',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 48,
    borderColor: '#FFD700',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingLeft: 15,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#333',
  },
  button: {
    backgroundColor: '#FF4500',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 18,
    alignItems: 'center',
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textFooter: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
    color: '#333',
  },
  linkText: {
    color: '#FF4500',
    fontWeight: 'bold',
  },
  imageLogo: {
    width: '100%',
    height: 180,
    marginBottom: 16,
  },
});

export default SignUp;
