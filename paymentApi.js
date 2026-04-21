const BASE_URL = "http://localhost:5000";

/* ================= STRIPE ================= */
export const createStripeCheckout = async (amount, creatorId, token) => {
  const res = await fetch(`${BASE_URL}/payments/stripe/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      amount,
      creatorId,
    }),
  });

  return res.json();
};

/* ================= PAYPAL ================= */
export const createPayPalCheckout = async (amount, creatorId, token) => {
  const res = await fetch(`${BASE_URL}/payments/paypal/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      amount,
      creatorId,
    }),
  });

  return res.json();
};

/* ================= M-PESA ================= */
export const mpesaStkPush = async (phone, amount, creatorId, token) => {
  const res = await fetch(`${BASE_URL}/payments/mpesa/stkpush`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      phone,
      amount,
      creatorId,
    }),
  });

  return res.json();
};