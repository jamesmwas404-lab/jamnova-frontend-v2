console.log("JamNova frontend initialized 🚀");

// =======================
// CONFIG
// =======================
const API_BASE = "https://your-backend-url.com"; // change later

let videos = [];
let currentUser = null;

// =======================
// INIT APP
// =======================
window.addEventListener("load", () => {
  loadUser();
  fetchVideos();
  setupSearch();
  setupUploadButton();
});

// =======================
// LOAD USER (TOKEN)
// =======================
function loadUser() {
  const user = localStorage.getItem("user");
  if (user) {
    currentUser = JSON.parse(user);
    console.log("Logged in as:", currentUser.username);
  }
}

// =======================
// FETCH VIDEOS FROM BACKEND
// =======================
async function fetchVideos() {
  try {
    const res = await fetch(`${API_BASE}/api/videos`);
    const data = await res.json();

    if (!res.ok) throw new Error("Failed to fetch videos");

    videos = data;
    renderVideos();
  } catch (error) {
    console.log("Backend not available, using fallback videos");

    videos = [
      { title: "Jam Session Highlights", creator: "Nova Beats", views: "1.2M", thumbnail: "thumbnail1.jpg" },
      { title: "Top Creator Collabs", creator: "JamNova", views: "850K", thumbnail: "thumbnail2.jpg" },
      { title: "Behind the Scenes", creator: "Nova Crew", views: "420K", thumbnail: "thumbnail3.jpg" }
    ];

    renderVideos();
  }
}

// =======================
// RENDER VIDEOS
// =======================
function renderVideos() {
  const container = document.querySelector(".video-grid");
  if (!container) return;

  container.innerHTML = "";

  videos.forEach(video => {
    container.innerHTML += `
      <article class="video-card">
        <img src="${video.thumbnail}" alt="${video.title}" />
        <h3>${video.title}</h3>
        <p>${video.creator} • ${video.views} views</p>
      </article>
    `;
  });
}

// =======================
// SEARCH SYSTEM
// =======================
function setupSearch() {
  const searchInput = document.getElementById("searchInput");

  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".video-card");

    cards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const creator = card.querySelector("p").textContent.toLowerCase();

      card.style.display =
        title.includes(query) || creator.includes(query)
          ? "block"
          : "none";
    });
  });
}

// =======================
// UPLOAD SYSTEM (API READY)
// =======================
function setupUploadButton() {
  const uploadBtn = document.getElementById("uploadBtn");
  if (!uploadBtn) return;

  uploadBtn.addEventListener("click", () => {
    openUploadModal();
  });
}

// =======================
// UPLOAD MODAL
// =======================
function openUploadModal() {
  const modal = document.createElement("div");

  modal.innerHTML = `
    <div class="modal" id="uploadModal">
      <div class="modal-content">
        <h2>Upload Video</h2>

        <input id="videoTitle" placeholder="Video title" />
        <input id="videoCreator" placeholder="Creator name" />
        <input id="videoFile" type="file" />

        <button id="submitUpload">Upload</button>
        <button id="closeUpload">Close</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const uploadModal = document.getElementById("uploadModal");

  // CLOSE
  document.getElementById("closeUpload").onclick = () => {
    uploadModal.remove();
  };

  // UPLOAD
  document.getElementById("submitUpload").onclick = async () => {
    const title = document.getElementById("videoTitle").value;
    const creator = document.getElementById("videoCreator").value;
    const file = document.getElementById("videoFile").files[0];

    if (!title) {
      alert("Enter video title");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("creator", creator);
      formData.append("video", file);

      const res = await fetch(`${API_BASE}/api/videos/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`
        },
        body: formData
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Upload successful 🚀");
      uploadModal.remove();
      fetchVideos();
    } catch (err) {
      alert("Upload failed (backend not ready)");
      console.log(err);
    }
  };
}

// =======================
// LOGIN HELPERS
// =======================
async function login(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Login failed");
    return;
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  currentUser = data.user;

  alert("Login successful 🚀");
}

// =======================
// SIGNUP
// =======================
async function signup(username, email, password) {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Signup failed");
    return;
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  currentUser = data.user;

  alert("Account created 🚀");
}