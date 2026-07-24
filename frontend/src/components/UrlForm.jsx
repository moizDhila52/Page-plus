import { useState, useEffect } from "react";
import api from "../services/api";

const LOADING_STEPS = [
  "Checking response...",
  "Parsing HTML...",
  "Counting links & images...",
  "Generating report...",
];

function UrlForm({ setReport }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    let interval;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 900);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const data = await api.post("/audit", { url });
      
      if (data.success && data.data) {
        setReport(data.data);
      } else {
        setError(data.message || "Failed to analyze website");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred while auditing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="glass-card form-container">
        <div className="form-group">
          <label htmlFor="url-input" className="form-label">
            Website URL
          </label>
          <input
            id="url-input"
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <button
          type="submit"
          className={`submit-button ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? (
            <div className="button-loading-content">
              <span className="spinner"></span>
              <span className="loading-step-text">{LOADING_STEPS[loadingStep]}</span>
            </div>
          ) : (
            "Analyze Website"
          )}
        </button>
      </form>

      {error && (
        <div className="glass-card error-card fade-in">
          <div className="error-card-header">
            <span className="error-card-icon">⚠</span>
            <h3>Unable to analyze this website</h3>
          </div>
          <p className="error-card-msg">{error}</p>
          <div className="error-card-reasons">
            <span className="reasons-title">Possible reasons:</span>
            <ul>
              <li>Website blocks automated requests or bots</li>
              <li>Cloudflare or anti-bot protection is active</li>
              <li>Website is temporarily down or invalid URL</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default UrlForm;
