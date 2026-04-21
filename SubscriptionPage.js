import React, { useState } from "react";
import axios from "axios";
import "./SubscriptionPage.css";

function SubscriptionPage({ currentPlan }) {
  const [plan, setPlan] = useState(currentPlan);

  const upgradeToPremium = async () => {
    try {
      const res = await axios.post("/api/subscription/activatePremium");
      setPlan(res.data.subscription.plan);
      alert("⚡ Jamnova Premium Activated! Welcome to the future of streaming.");
    } catch (err) {
      alert("Error upgrading: " + err.message);
    }
  };

  return (
    <div className="subscription-container">
      <h1 className="subscription-title">Choose Your Jamnova Experience</h1>

      <div className="plans-grid">
        {/* Free Plan */}
        <div className={`plan-card ${plan === "Free" ? "active" : ""}`}>
          <h2>Free</h2>
          <ul>
            <li>Basic streaming</li>
            <li>Standard recommendations</li>
            <li>Community access</li>
          </ul>
          <p className="price">Price: $0 / month</p>
          <button disabled={plan === "Free"}>Current Plan</button>
        </div>

        {/* Standard Plan */}
        <div className={`plan-card ${plan === "Standard" ? "active" : ""}`}>
          <h2>Standard</h2>
          <ul>
            <li>Ad-free streaming</li>
            <li>Improved recommendations</li>
            <li>Playlist creation</li>
          </ul>
          <p className="price">Price: $5.99 / month</p>
          <button disabled={plan === "Standard"}>Current Plan</button>
        </div>

        {/* Premium Plan */}
        <div className={`plan-card premium ${plan === "Premium" ? "active" : ""}`}>
          <h2>Jamnova Premium 👑</h2>
          <ul>
            <li>Unlimited streaming</li>
            <li>Priority recommendations</li>
            <li>Advanced analytics</li>
            <li>Priority support</li>
            <li>Early access features</li>
          </ul>
          <p className="price">Price: $9.99 / month</p>
          <button onClick={upgradeToPremium}>
            {plan === "Premium" ? "Premium Active" : "Upgrade to Premium"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPage;
