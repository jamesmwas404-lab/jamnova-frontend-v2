const BASE_URL = "http://localhost:5000";

/* ================= GET ALL VIDEOS (WORKING NOW) ================= */
export const getVideos = async () => {
  try {
    const res = await fetch(`${BASE_URL}/videos`);

    if (!res.ok) {
      throw new Error("Failed to fetch videos");
    }

    return await res.json();
  } catch (error) {
    console.error("getVideos error:", error);
    return [];
  }
};

/* =========================================================
   FUTURE FEATURES (BACKEND NOT READY YET)
   Keep these for later when we upgrade your server
========================================================= */

/* ================= UPLOAD VIDEO ================= */
export const uploadVideo = async (file, title, token, extra = {}) => {
  const formData = new FormData();

  formData.append("video", file);
  formData.append("title", title);

  if (extra.description) formData.append("description", extra.description);
  if (extra.category) formData.append("category", extra.category);

  const res = await fetch(`${BASE_URL}/videos/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
};

/* ================= GET SINGLE VIDEO ================= */
export const getVideoById = async (id) => {
  const res = await fetch(`${BASE_URL}/videos/${id}`);
  return res.json();
};

/* ================= SEARCH VIDEOS ================= */
export const searchVideos = async (keyword) => {
  const res = await fetch(`${BASE_URL}/videos/search/${keyword}`);
  return res.json();
};

/* ================= ADD VIEW ================= */
export const addView = async (id, token) => {
  const res = await fetch(`${BASE_URL}/videos/${id}/view`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

/* ================= LIKE VIDEO ================= */
export const likeVideo = async (id, token) => {
  const res = await fetch(`${BASE_URL}/videos/${id}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

/* ================= DISLIKE VIDEO ================= */
export const dislikeVideo = async (id, token) => {
  const res = await fetch(`${BASE_URL}/videos/${id}/dislike`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};