import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, TouchableOpacity, Alert, Share } from 'react-native';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);  // Số lượng sản phẩm
  const [selectedSize, setSelectedSize] = useState('M');  // Kích thước chọn

  const product = {
    name: 'Món ăn nhanh 1',
    description: 'Món ăn NHANH, LÀNH, MẠNH cho giới trẻ.',
    price: '80,000 VND',
    imageUrl: require('../../assets/images/Burritos.jpg'), // Đường dẫn hình ảnh
    sizes: ['S', 'M', 'L', 'XL'],  // Kích thước sản phẩm
  };

  // Tăng số lượng sản phẩm
  const incrementQuantity = () => setQuantity(quantity + 1);

  // Giảm số lượng sản phẩm (không cho xuống dưới 1)
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Thay đổi kích thước sản phẩm
  const selectSize = (size) => setSelectedSize(size);


  
  

  return (
    <ScrollView style={styles.container}>
      {/* Hình ảnh sản phẩm */}
      <Image source={product.imageUrl} style={styles.productImage} />
      
      {/* Tên sản phẩm */}
      <Text style={styles.productName}>{product.name}</Text>

      {/* Giá sản phẩm */}
      <Text style={styles.productPrice}>{product.price}</Text>

      {/* Kích thước sản phẩm */}
      <View style={styles.sizeContainer}>
        <Text style={styles.sectionTitle}>Chọn kích thước:</Text>
        <View style={styles.sizeOptions}>
          {product.sizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeOption,
                selectedSize === size && styles.selectedSizeOption,
              ]}
              onPress={() => selectSize(size)}
            >
              <Text style={styles.sizeText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Số lượng sản phẩm */}
      <View style={styles.quantityContainer}>
        <Text style={styles.sectionTitle}>Số lượng:</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Mô tả sản phẩm */}
      <Text style={styles.productDescription}>{product.description}</Text>

      {/* Nút mua sản phẩm */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFAF0',  // Nền sáng hơn để nổi bật sản phẩm
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FF4500',  // Màu cam đỏ giống HomeScreen
  },
  productPrice: {
    fontSize: 20,
    color: '#FF6347',  // Màu đỏ cà chua giống HomeScreen
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  buttonContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  button: {
    borderRadius: 8,
    width: '80%',
    padding: 15,
    backgroundColor: "#FF4500",  // Màu cam đỏ
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  
  sizeContainer: {
    marginBottom: 20,
  },
  sizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sizeOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
  },
  selectedSizeOption: {
    backgroundColor: '#FF4500',  // Màu cam đỏ cho size đã chọn
    borderColor: '#FF4500',
  },
  sizeText: {
    color: '#333',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  quantityContainer: {
    marginBottom: 20,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 10,
    backgroundColor: '#FF4500',  // Màu cam đỏ cho nút thay đổi số lượng
    borderRadius: 5,
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});

export default ProductDetail;
