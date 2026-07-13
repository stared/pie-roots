import { useEffect, useRef, useState } from "react";
import StarChart from "./components/StarChart";
import DetailPanel from "./components/DetailPanel";
import { STEPS } from "./content/load";
import { SENSES, type EtymNode } from "./data/etymology";

export default function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [explore, setExplore] = useState(false);
  const [selected, setSelected] = useState<EtymNode | null>(null);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  // The step nearest the viewport center drives the chart.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = stepRefs.current.indexOf(e.target as HTMLElement);
            if (idx !== -1) setActiveStep(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = explore ? "hidden" : "";
  }, [explore]);

  const focusIds = STEPS[activeStep]?.focus ?? [];

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-text">
          <p className="hero-kicker">an explorable etymology</p>
          <h1>
            The star of <em>star</em>
          </h1>
          <p className="hero-sub">
            One word, six thousand years: how <span className="root-word">*h₂stḗr</span> became{" "}
            <b>star</b>, <b>disaster</b>, and (maybe) <b>Esther</b>.
          </p>
          <p className="hero-scroll">Scroll to follow the rays ↓</p>
        </div>
      </header>

      <main className="story">
        <div className="steps">
          {STEPS.map((s, i) => (
            <section
              key={s.key}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className={`step ${i === activeStep ? "step-active" : ""}`}
            >
              <p className="step-num">
                {i + 1} · {STEPS.length}
              </p>
              <h2>{s.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: s.html }} />
              {i === STEPS.length - 1 && (
                <button className="explore-button" onClick={() => setExplore(true)}>
                  Explore the whole star →
                </button>
              )}
            </section>
          ))}
        </div>
        <div className="chart-pane">
          <StarChart
            focusIds={focusIds}
            interactive={false}
            onSelect={setSelected}
            selectedId={selected?.id ?? null}
          />
        </div>
      </main>

      {explore && (
        <div className="explore-overlay">
          <StarChart
            focusIds={[]}
            interactive={true}
            onSelect={setSelected}
            selectedId={selected?.id ?? null}
          />
          <div className="legend">
            {Object.entries(SENSES).map(([k, s]) => (
              <span key={k} className="legend-item">
                <span className="legend-dot" style={{ background: s.color }} /> {s.label}
              </span>
            ))}
            <span className="legend-item legend-dashed">╌╌ disputed</span>
          </div>
          <button className="explore-close" onClick={() => setExplore(false)}>
            ← back to the story
          </button>
        </div>
      )}

      {selected && <DetailPanel node={selected} onClose={() => setSelected(null)} />}

      <footer className="footer">
        <span>
          Piotr Migdał · sources on every word · companion to{" "}
          <a href="https://p.migdal.pl/tree-of-tree/">the tree of ‘tree’</a>
        </span>
      </footer>
    </div>
  );
}
