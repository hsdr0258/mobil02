import { API_URL } from "@/app/url";

export const registerUser = async (
    name,
    email,
    password,
    password_confirmation
  ) => {
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
          password_confirmation,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      return data; // Trả về thông tin người dùng đã đăng ký
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };
  
  
  export const loginUser = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      return data; // Trả về thông tin đăng nhập thành công
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  };
  
  
  export const logoutUser = async () => {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      return data; // Trả về thông tin đăng xuất thành công
    } catch (error) {
      console.error("Error logging out user:", error);
      throw error;
    }
  };
  