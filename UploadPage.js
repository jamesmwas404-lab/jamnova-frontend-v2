// src/pages/UploadPage.js
import { playVideo, enableAudioMode, disableAudioMode } from "../components/VideoPlayer";
import { uploadVideo } from "../services/videoApi";

export default function UploadPage() {
  let currentVideo = null;

  async function handleUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Call backend upload API
    const response = await uploadVideo(file, file.name);

    if (response.success) {
      const videoUrl = response.video.videoUrl; // backend returns /uploads/filename
      currentVideo = playVideo(videoUrl); // instantly play video
      addAudioModeButton(currentVideo);
    }
  }

  function addAudioModeButton(video) {
    const button = document.createElement("button");
    button.innerText = "Enable Audio Mode";
    button.onclick = () => {
      if (video.style.visibility === "hidden") {
        disableAudioMode(video);
        button.innerText = "Enable Audio Mode";
      } else {
        enableAudioMode(video);
        button.innerText = "Disable Audio Mode";
      }
    };
    document.body.appendChild(button);
  }

  // Simple file input
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "video/*";
  input.onchange = handleUpload;

  document.body.appendChild(input);
}
