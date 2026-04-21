const BASE_URL = "http://localhost:5000";

/* ================= REGISTER USER ================= */
export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type