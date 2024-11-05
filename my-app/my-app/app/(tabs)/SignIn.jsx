import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { loginUser } from '../api/Auth';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (email && password) {
      try {
        const data = await loginUser(email, password);
        setMessage(data.message);
        setError("");
        router.push({ pathname: "./" });
      } catch (error) {
        setMessage("");
        setError("Đăng nhập thất bại!");
      }
    } else {
      setError("Vui lòng điền đầy đủ thông tin!");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={require('../../assets/images/logo1.jpg')} 
        style={styles.imageLogo} 
        resizeMode="contain" 
      />
      <Text style={styles.heading}>Đăng Nhập</Text>
      
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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng Nhập</Text>
      </TouchableOpacity>

      <Text style={styles.textFooter}>
        Quên mật khẩu?{' '}
        <Link href="../" style={styles.linkText}>Khôi phục tại đây</Link>
      </Text>

      <Text style={styles.textFooter}>
        Bạn chưa có tài khoản?{' '}
        <Link href="/screens/SignUp" style={styles.linkText}>Đăng Ký</Link>
      </Text>

      {message ? <Text style={styles.message}>{message}</Text> : null}
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
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
  imageLogo: {
    width: '100%',
    height: 180,
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    color: "green",
    textAlign: "center",
    marginVertical: 10,
  },
  errorMessage: {
    fontSize: 18,
    color: "red",
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
});

export default SignIn;
