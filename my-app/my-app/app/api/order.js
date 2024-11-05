const API_URL = "http://localhost/shop/public/api/orders";

export const fetchOrderDetails = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; // Trả về danh sách sản phẩm
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};