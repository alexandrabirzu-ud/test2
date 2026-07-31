import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const defaultDrillForm = {
  codename: "spark muffin",
  mode: "disco"
};

function App() {
  const [message, setMessage] = useState();
  const [drillForm, setDrillForm] = useState(defaultDrillForm);
  const [drillResult, setDrillResult] = useState();
  const [drillLoading, setDrillLoading] = useState(false);
  useEffect(() => {
    fetch("/api/")
      .then(res => res.json())
      .then(res => setMessage(res.message))
      .catch(console.error);
  }, [setMessage]);

  const handleDrillChange = event => {
    const { name, value } = event.target;

    setDrillForm(currentForm => ({
      ...currentForm,
      [name]: value
    }));
  };

  const handleDrillSubmit = event => {
    event.preventDefault();
    setDrillLoading(true);

    const params = new URLSearchParams({
      codename: drillForm.codename,
      mode: drillForm.mode
    });

    fetch(`/api/gimmick?${params.toString()}`)
      .then(res => res.json())
      .then(res => setDrillResult(res))
      .catch(console.error)
      .finally(() => setDrillLoading(false));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="hero-row">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="hero-copy">
            <p className="eyebrow">Full-stack bot playground</p>
            <h1>Bot Drill Console</h1>
            <p className="backend-message">{message || "Loading backend status..."}</p>
            <p className="hero-description">
              Type a codename, pick a mode, and run a deterministic gimmick that a browser bot
              can verify end to end.
            </p>
          </div>
        </div>

        <section className="drill-panel">
          <form className="drill-form" onSubmit={handleDrillSubmit}>
            <label className="field-label" htmlFor="codename-input">
              Bot codename
            </label>
            <input
              id="codename-input"
              name="codename"
              className="text-input"
              value={drillForm.codename}
              onChange={handleDrillChange}
            />

            <label className="field-label" htmlFor="mode-select">
              Drill mode
            </label>
            <select
              id="mode-select"
              name="mode"
              className="select-input"
              value={drillForm.mode}
              onChange={handleDrillChange}
            >
              <option value="disco">Disco</option>
              <option value="stealth">Stealth</option>
              <option value="turbo">Turbo</option>
            </select>

            <button className="run-button" type="submit" disabled={drillLoading}>
              {drillLoading ? "Running drill..." : "Run bot drill"}
            </button>
          </form>

          <div className="result-card" aria-live="polite">
            {drillResult ? (
              <>
                <div className="result-topline">
                  <span className="result-badge">{drillResult.badge}</span>
                  <span className="result-mode">{drillResult.modeLabel} mode</span>
                </div>

                <h2>{drillResult.codename}</h2>
                <p className="result-challenge">{drillResult.challenge}</p>

                <div className="meter-block">
                  <div className="meter-label-row">
                    <span>Energy</span>
                    <span>{drillResult.energy}%</span>
                  </div>
                  <div className="meter-track">
                    <div
                      className="meter-fill"
                      style={{
                        width: `${drillResult.energy}%`,
                        backgroundColor: drillResult.accent
                      }}
                    />
                  </div>
                </div>

                <dl className="detail-grid">
                  <div>
                    <dt>Dance move</dt>
                    <dd>{drillResult.danceMove}</dd>
                  </div>
                  <div>
                    <dt>Secret phrase</dt>
                    <dd>{drillResult.secretPhrase}</dd>
                  </div>
                </dl>

                <ul className="checklist">
                  {drillResult.checklist.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h2>Ready for a bot-friendly demo</h2>
                <p className="result-challenge">
                  The result card will render a stable badge, energy meter, dance move, and secret
                  phrase after you click the button.
                </p>
              </>
            )}
          </div>
        </section>
      </header>
    </div>
  );
}

export default App;
