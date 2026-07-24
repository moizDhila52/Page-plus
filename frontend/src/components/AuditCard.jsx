import { useState } from "react";
import { motion } from "framer-motion";

function AuditCard({ report }) {
  const [copied, setCopied] = useState(false);

  if (!report) return null;

  const {
    url,
    status,
    responseTime,
    title,
    metaDescription,
    h1Count = 0,
    totalImages = 0,
    imagesWithoutAlt = 0,
    totalLinks = 0,
    internalLinks = 0,
    externalLinks = 0,
    hasCanonical,
    canonicalHref,
    robotsMeta,
    hasOgTags,
    wordCount = 0,
    analyzedAt,
  } = report;

  // Extract domain for Google favicon
  let domain = "";
  if (url) {
    try {
      domain = new URL(url).hostname;
    } catch {
      domain = url;
    }
  }
  const faviconUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : "";

  // Format date
  const formatDate = (isoString) => {
    if (!isoString) return "";
    try {
      const date = new Date(isoString);
      return date.toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return isoString;
    }
  };

  // Calculate SEO Score
  const hasTitle = Boolean(title && title.trim());
  const hasMeta = Boolean(metaDescription && metaDescription.trim());
  const hasH1 = h1Count > 0;
  const noMissingAlt = totalImages > 0 ? imagesWithoutAlt === 0 : true;
  const sufficientWords = wordCount >= 300;

  const seoScore =
    (hasTitle ? 15 : 0) +
    (hasMeta ? 15 : 0) +
    (hasH1 ? 15 : 0) +
    (noMissingAlt ? 15 : 0) +
    (sufficientWords ? 15 : 0) +
    (hasCanonical ? 15 : 0) +
    (hasOgTags ? 10 : 0);

  // Score Colors: 80-100 (Green), 60-79 (Yellow), <60 (Red)
  const getScoreColor = (score) => {
    if (score >= 80) return "score-high";
    if (score >= 60) return "score-medium";
    return "score-low";
  };

  // Response Time Badging
  const parseResponseTime = (rt) => {
    if (typeof rt === "number") return rt;
    const num = parseInt(rt, 10);
    return isNaN(num) ? 0 : num;
  };
  const ms = parseResponseTime(responseTime);
  const getResponseTimeBadge = (ms) => {
    if (ms <= 0) return { label: `${responseTime || "N/A"}`, class: "rt-neutral" };
    if (ms < 500) return { label: `🟢 Fast (${ms} ms)`, class: "rt-fast" };
    if (ms <= 1500) return { label: `🟡 Moderate (${ms} ms)`, class: "rt-moderate" };
    return { label: `🔴 Slow (${ms} ms)`, class: "rt-slow" };
  };
  const rtBadge = getResponseTimeBadge(ms);

  const getStatusClass = (code) => {
    if (code >= 200 && code < 300) return "status-success";
    if (code >= 300 && code < 400) return "status-warning";
    return "status-error";
  };

  // Categorized Recommendations
  const criticalFixes = [];
  const warnings = [];
  const passedChecks = [];

  // Critical Fixes
  if (!hasTitle) criticalFixes.push("Title tag missing");
  if (!hasH1) criticalFixes.push("No H1 tag found");

  // Warnings
  if (!hasMeta) warnings.push("Meta description missing");
  if (!hasCanonical) warnings.push("Canonical tag missing");
  if (!hasOgTags) warnings.push("Open Graph tags missing");
  if (!noMissingAlt) warnings.push(`${imagesWithoutAlt} images missing alt text`);
  if (!sufficientWords) warnings.push(`Low word count (${wordCount} words)`);

  // Passed Checks
  if (hasTitle) passedChecks.push("Title exists");
  if (hasH1) passedChecks.push("H1 tag found");
  if (hasMeta) passedChecks.push("Meta description exists");
  if (hasCanonical) passedChecks.push("Canonical tag present");
  if (hasOgTags) passedChecks.push("Open Graph tags present");
  if (noMissingAlt) passedChecks.push("All images have alt text");
  if (sufficientWords) passedChecks.push(`Good content length (${wordCount} words)`);

  const handleCopyReport = () => {
    const reportText = `--- Page Pulse Audit Report ---
Audited URL: ${url}
Analyzed At: ${formatDate(analyzedAt)}
SEO Score: ${seoScore} / 100
Status: ${status}
Response Time: ${responseTime}

Title: ${title || "Missing"}
Meta Description: ${metaDescription || "Missing"}
H1 Count: ${h1Count}
Word Count: ${wordCount}
Total Images: ${totalImages} (Without Alt: ${imagesWithoutAlt})
Total Links: ${totalLinks} (Internal: ${internalLinks}, External: ${externalLinks})
Canonical Tag: ${hasCanonical ? "Present" : "Missing"}
Open Graph Tags: ${hasOgTags ? "Present" : "Missing"}
Robots Meta: ${robotsMeta || "None"}

Critical Fixes:
${criticalFixes.length ? criticalFixes.map(item => `🚨 ${item}`).join("\n") : "None"}

Warnings:
${warnings.length ? warnings.map(item => `⚠ ${item}`).join("\n") : "None"}

Passed Checks:
${passedChecks.length ? passedChecks.map(item => `✓ ${item}`).join("\n") : "None"}
`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `audit-report-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <motion.div
      className="glass-card result-container"
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Audited Website Header with Favicon */}
      {url && (
        <div className="audited-site-bar">
          <div className="audited-site-info">
            {faviconUrl && <img src={faviconUrl} alt="Favicon" className="site-favicon" />}
            <div className="site-url-details">
              <span className="audited-label">Audited Website</span>
              <a href={url} target="_blank" rel="noopener noreferrer" className="audited-url-link">
                {url}
              </a>
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={handleCopyReport} className="action-button">
              {copied ? "✓ Copied!" : "📋 Copy Report"}
            </button>
            <button onClick={handleDownloadJson} className="action-button secondary-action">
              📥 Export JSON
            </button>
          </div>
        </div>
      )}

      <div className="result-header">
        <div>
          <h2 className="result-title">Audit Results</h2>
          <div className="status-and-time">
            <span className={`status-badge ${getStatusClass(status)}`}>
              Status: {status}
            </span>
            {analyzedAt && (
              <span className="timestamp-text">
                Last analyzed: <strong>{formatDate(analyzedAt)}</strong>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* SEO Score Section */}
      <motion.div
        className="seo-score-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <div className="seo-score-info">
          <span className="seo-score-label">SEO Score</span>
          <span className="seo-score-sub">Based on 7 core audit checks</span>
        </div>
        <div className={`seo-score-badge ${getScoreColor(seoScore)}`}>
          <span className="score-value">{seoScore}</span>
          <span className="score-max">/ 100</span>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">Response Time</div>
          <div className="metric-value">
            <span className={`rt-badge ${rtBadge.class}`}>{rtBadge.label}</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Word Count</div>
          <div className="metric-value">{wordCount}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">H1 Tags</div>
          <div className="metric-value">{h1Count}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Total Images</div>
          <div className="metric-value">{totalImages}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Missing Alt Text</div>
          <div className={`metric-value ${imagesWithoutAlt > 0 ? "warning-value" : ""}`}>
            {imagesWithoutAlt}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Total Links</div>
          <div className="metric-value">{totalLinks}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Internal Links</div>
          <div className="metric-value">{internalLinks}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">External Links</div>
          <div className="metric-value">{externalLinks}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Canonical Tag</div>
          <div className="metric-value metric-badge">
            {hasCanonical ? "✅ Present" : "❌ Missing"}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Open Graph</div>
          <div className="metric-value metric-badge">
            {hasOgTags ? "✅ Present" : "❌ Missing"}
          </div>
        </div>
      </div>

      {/* Grouped Recommendations Checklist */}
      <motion.div
        className="recommendations-section"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h3 className="section-subtitle">Recommendations</h3>

        {/* Critical Fixes */}
        {criticalFixes.length > 0 && (
          <div className="rec-group">
            <span className="rec-group-title critical-title">🚨 Critical Fixes</span>
            <div className="recommendations-list">
              {criticalFixes.map((text, i) => (
                <div key={i} className="recommendation-item rec-critical">
                  <span className="rec-icon">🚨</span>
                  <span className="rec-text">{text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warnings */}
        {warnings.length > 0 && (
          <div className="rec-group">
            <span className="rec-group-title warning-title">⚠ Warnings</span>
            <div className="recommendations-list">
              {warnings.map((text, i) => (
                <div key={i} className="recommendation-item rec-warn">
                  <span className="rec-icon">⚠</span>
                  <span className="rec-text">{text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Passed Checks */}
        {passedChecks.length > 0 && (
          <div className="rec-group">
            <span className="rec-group-title passed-title">✓ Passed Checks</span>
            <div className="recommendations-list">
              {passedChecks.map((text, i) => (
                <div key={i} className="recommendation-item rec-pass">
                  <span className="rec-icon">✓</span>
                  <span className="rec-text">{text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* SEO Details */}
      <div className="seo-details">
        <div className="seo-item">
          <div className="seo-label">Page Title</div>
          <div className="seo-value">
            {title || <span className="empty-value">Missing</span>}
          </div>
        </div>
        <div className="seo-item">
          <div className="seo-label">Meta Description</div>
          <div className="seo-value">
            {metaDescription || <span className="empty-value">Missing</span>}
          </div>
        </div>
        {canonicalHref && (
          <div className="seo-item">
            <div className="seo-label">Canonical URL</div>
            <div className="seo-value mono-text">{canonicalHref}</div>
          </div>
        )}
        {robotsMeta && (
          <div className="seo-item">
            <div className="seo-label">Robots Meta Tag</div>
            <div className="seo-value mono-text">{robotsMeta}</div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default AuditCard;
