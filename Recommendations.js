import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Recommendations.css";

export default function Recommendations({ userId }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPlan, setUserPlan] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const userRes = await axios.get(`http://localhost:5000/users/${userId}/profile`);
        setUserPlan(userRes.data.subscriptionPlan);

        const recRes = await axios.get(`http://localhost:5000/recommendations/${userId}`);
        setRecommendations(recRes.data);
      } catch (err) {
        console.error("Error fetching recommendations:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [userId]);

  if (loading) return <p className="loading">⚡ Loading your Jamnova Premium feed...</p>;

  return (
    <div className="recommendations-container">
      <h2 className="recommendations-title">Your Jamnova Feed</h2>
      <ul className="recommendations-list">
        {recommendations.map((item, index) => (
          <li
            key={index}
            className={`recommendation-item ${item.isPremium ? "premium" : ""}`}
          >
            <div className="item-content">
              <span className="item-title">{item.title}</span>
              {item.isPremium && <span className="crown">👑 Premium</span>}
              {item.isExclusive && <span className="exclusive-tag">🚀 Early Access</span>}
            </div>
            <p className="item-description">{item.description}</p>
            {userPlan === "Premium" && item.analytics && (
              <div className="analytics">
                <p>🔥 Trending in your genre: {item.analytics.topGenre}</p>
                <p>⏱ Based on {item.analytics.listenHours} hrs of listening</p>
              </div>
            )}
            {item.creatorMonetized && (
              <div className="monetization">
                <p>💰 Support this creator — monetized content</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
