import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CreatorDashboard.css";

export default function CreatorDashboard({ creatorId }) {
  const [creator, setCreator] = useState(null);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        const profileRes = await axios.get(`http://localhost:5000/creators/${creatorId}/profile`);
        setCreator(profileRes.data);

        const analyticsRes = await axios.get(`http://localhost:5000/creators/${creatorId}/analytics`);
        setAnalytics(analyticsRes.data);
      } catch (err) {
        console.error("Error fetching creator data:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCreatorData();
  }, [creatorId]);

  if (loading) return <p className="loading">⚡ Loading your Creator Dashboard...</p>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>
          {creator.name}{" "}
          {creator.plan === "Premium" && (
            <span className="premium-badge">👑 Premium Creator</span>
          )}
        </h1>
        <p className="creator-email">{creator.email}</p>
      </header>

      {/* Analytics Section */}
      <section className="analytics-section">
        <h2>📊 Analytics Overview</h2>
        <p>Total Streams: {analytics.totalStreams}</p>
        <p>Revenue: ${analytics.revenue}</p>
        <p>Top Genre: {analytics.topGenre}</p>
        <p>Audience Demographics: {analytics.demographics}</p>
      </section>

      {/* Monetization Section */}
      <section className="monetization-section">
        <h2>💰 Monetization Tools</h2>
        <p>Stripe Account: {creator.payments.stripeAccountId || "Not linked"}</p>
        <p>PayPal Email: {creator.payments.paypalEmail || "Not linked"}</p>
        <p>M‑Pesa Number: {creator.payments.mpesaNumber || "Not linked"}</p>
        <button className="link-btn">Link Payment Method</button>
      </section>

      {/* Publishing Section */}
      <section className="publishing-section">
        <h2>🚀 Publishing Options</h2>
        <label>
          <input type="checkbox" checked={creator.settings.exclusiveReleases} readOnly />
          Exclusive Premium Releases
        </label>
        <label>
          <input type="checkbox" checked={creator.settings.earlyAccess} readOnly />
          Early Access for Fans
        </label>
        <button className="publish-btn">Publish New Track</button>
      </section>
    </div>
  );
}
