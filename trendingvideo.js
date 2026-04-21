// src/components/TrendingVideos.js
export default function TrendingVideos({ videos }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {videos.map(video => (
        <div key={video._id} className="bg-gray-700 rounded-lg overflow-hidden shadow-lg">
          <video 
            src={video.fileUrl} 
            controls 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">{video.title}</h3>
            <p className="text-sm text-gray-300">
              {video.views} views • {video.uploadedAt}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
import Sidebar from "./components/Sidebar";
import TrendingVideos from "./components/TrendingVideos";

const sampleVideos = [
  { _id: 1, fileUrl: "https://sample-videos.com/video123.mp4", title: "Epic Guitar Solo", views: "1.2M", uploadedAt: "2 days ago" },
  { _id: 2, fileUrl: "https://sample-videos.com/video456.mp4", title: "Top 10 Collaborations", views: "850K", uploadedAt: "1 week ago" },
  { _id: 3, fileUrl: "https://sample-videos.com/video789.mp4", title: "Studio Tour", views: "500K", uploadedAt: "3 days ago" }
];

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-800 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Trending Videos</h2>
        <TrendingVideos videos={sampleVideos} />
      </div>
    </div>
  );
}

export default App;
