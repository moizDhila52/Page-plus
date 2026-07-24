import { useState } from "react";
import UrlForm from "./components/UrlForm";
import AuditCard from "./components/AuditCard";

function App() {
  const [report, setReport] = useState(null);

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <header className="app-header fade-in-up">
          <h1 className="app-title">Page Pulse</h1>
          <p className="app-subtitle">
            Analyze any website for SEO, accessibility, and content metrics.
          </p>
        </header>

        <main className="app-main fade-in-up" style={{ animationDelay: "0.1s" }}>
          <UrlForm setReport={setReport} />
          <AuditCard report={report} />
        </main>
      </div>

      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </div>
  );
}

export default App;