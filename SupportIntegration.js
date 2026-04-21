import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SupportIntegration.css";

export default function SupportIntegration({ userId }) {
  const [tickets, setTickets] = useState([]);
  const [userPlan, setUserPlan] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupportData = async () => {
      try {
        const userRes = await axios.get(`http://localhost:5000/users/${userId}/profile`);
        setUserPlan(userRes.data.subscriptionPlan);

        const ticketRes = await axios.get(`http://localhost:5000/support/${userId}/tickets`);
        setTickets(ticketRes.data);
      } catch (err) {
        console.error("Error fetching support data:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSupportData();
  }, [userId]);

  if (loading) return <p className="loading">⚡ Loading your Jamnova Support Dashboard...</p>;

  return (
    <div className="support-container">
      <h2 className="support-title">Jamnova Support Center</h2>
      {userPlan === "Premium" ? (
        <p className="priority-message">👑 You are in the Premium Priority Queue — faster responses guaranteed!</p>
      ) : (
        <p className="standard-message">You are in the Standard Queue — upgrade to Premium for priority support.</p>
      )}

      <div className="support-channels">
        <h3>Available Support Channels</h3>
        <ul>
          <li>Email Support 📧</li>
          <li>Live Chat 💬</li>
          {userPlan === "Premium" && <li>Priority Call Line 📞</li>}
        </ul>
      </div>

      <h3 className="ticket-section-title">Your Support Tickets</h3>
      <ul className="ticket-list">
        {tickets.map((ticket, index) => (
          <li key={index} className={`ticket-item ${userPlan === "Premium" ? "priority" : ""}`}>
            <div className="ticket-header">
              <span className="ticket-title">{ticket.subject}</span>
              {userPlan === "Premium" && <span className="crown">👑 Priority</span>}
            </div>
            <p className="ticket-status">Status: {ticket.status}</p>
            <p className="ticket-description">{ticket.description}</p>
            {ticket.aiSuggestion && (
              <div className="ai-suggestion">
                <p>🤖 AI Suggestion: {ticket.aiSuggestion}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
