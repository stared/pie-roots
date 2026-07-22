import type { ReactNode } from "react";
import { downloadPoster } from "./export";
import See from "./See";
import Know from "./Know";
import Speak from "./Speak";
import Sit from "./Sit";
import Turn from "./Turn";
import "./roots.css";

interface View {
  /** URL path segment: the ASCII-flattened root (weyd/, weyd-magic/, …) */
  slug: string;
  /** this root's notes file (path within the repo, optional #anchor) */
  trees: string;
  title: ReactNode;
  dek: ReactNode;
  chart: ReactNode;
  /** night ground — light-on-dark palette (the occult chart) */
  dark?: boolean;
}

const VIEWS: View[] = [
  {
    slug: "weyd",
    trees: "notes/weyd.md",
    title: <><i>*weyd-</i> <span className="means">means</span> to see, to know</>,
    dek: <>Its perfect <i>*wóyde</i> ‘has seen’ meant <b>knows</b>, so the root split: seeing through Latin (<b>vision</b>, <b>view</b>, <b>evidence</b>), knowing through Germanic (<b>wit</b>, <b>wise</b>) and Greek (<b>history</b>, <b>idea</b>). Greek dropped its <i>w-</i>, so <i>ϝιδ-</i> ‘seen’ hides in <b>idea</b> — and, read as ἀ-ϝιδ- ‘the Unseen’, in <b>Hades</b>.</>,
    chart: <See />,
  },
  {
    slug: "weyd-magic",
    trees: "notes/weyd.md#the-knowing-side-secret-knowledge-subset-audited-2026-07-15",
    title: <><i>*weyd-</i> <span className="means">means</span> to see, to know</>,
    dek: <>To see meant to know — and where knowing turned occult, the root followed: <b>wizard</b>, <b>clairvoyant</b> ‘clear-seeing’, <b>Hades</b> ‘the Unseen’, the <b>Veda</b>. English’s own words for the hidden — <i>witch</i>, <i>weird</i>, <i>seer</i>, <i>occult</i> itself — all come from other roots; Polish kept what English lost: <b>widzieć</b> ‘to see’ sits one letter from <i>wiedzieć</i> ‘to know’, and <b>wiedźma</b> ‘witch’ and <b>wieszcz</b> ‘poet-prophet’ are still ones-who-know.</>,
    chart: <Know />,
    dark: true,
  },
  {
    slug: "bheh2",
    trees: "notes/bheh2.md",
    title: <><i>*bʰeh₂-</i> <span className="means">means</span> to speak</>,
    dek: <>A spoken thing could become a <b>fate</b>; one who spoke forth, a <b>prophet</b>; a public utterance, a <b>ban</b>. The root travelled as Latin <i>f-</i>, Greek <i>φ-</i>, and Germanic <i>b-</i>, carrying voice into <b>fable</b>, <b>symphony</b>, <b>blame</b>, and <b>banish</b>. A separate, look-alike root meant <i>to shine</i>: the source of <b>phase</b>, <b>photo-</b>, and <b>phantom</b>, not this family.</>,
    chart: <Speak />,
  },
  {
    slug: "sed",
    trees: "notes/sed.md",
    title: <><i>*sed-</i> <span className="means">means</span> to sit</>,
    dek: <>A body can <b>sit</b>; dust settles as <b>soot</b>; a bird’s “sitting down” became <b>nest</b>. Latin compounds turned sitting beside into <b>assess</b>, sitting in ambush into <b>insidious</b>, sitting against into <b>obsess</b>, sitting in reserve into <b>subsidy</b>, sitting apart into <b>dissident</b>, and sitting above into <b>supersede</b>. Greek ‘seat’ survives in <b>chair</b>, <b>cathedral</b>, <b>ephedrine</b>, and <b>Sanhedrin</b>.</>,
    chart: <Sit />,
  },
  {
    slug: "kwel",
    trees: "notes/kwel.md",
    title: <><i>*kʷel-</i> <span className="means">means</span> to turn</>,
    dek: <><b>wheel</b>, <b>cycle</b>, and <b>chakra</b> arrive from one word: <b>*kʷe-kʷl-óm</b> — <i>turn</i> said twice. Everything on this wheel turns with the root: a <b>palindrome</b> runs back again, <b>culture</b> and <b>colony</b> grew from Latin <b>colere</b>, <i>to till and dwell</i>, and <b>pole</b> was the axis the heavens turn on. Maybe also: <b>pulley</b>, through a little <b>πόλος</b>; <b>collar</b>, if the neck was named for turning; and <b>telephone</b> with <b>teleology</b>, whose <b>tele-</b> and <b>teleo-</b> are two different Greek words — <b>τῆλε</b> <i>far</i>, <b>τέλος</b> <i>completion</i>.</>,
    chart: <Turn />,
  },
];

/** each chart lives at its own path — the directory name picks the view */
const slugFromPath = (): string | undefined =>
  location.pathname.split("/").filter(s => s && s !== "index.html").pop();

export default function RootsApp() {
  const view = VIEWS.find(v => v.slug === slugFromPath()) ?? VIEWS[0];
  // ?share — poster-style page for social media: just the title, the chart,
  // a compact legend, and credits. e.g. /weyd-magic/?share
  const share = new URLSearchParams(location.search).has("share");

  const cls = ["roots", share && "share", view.dark && "dark"].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {!share && (
        <nav>
          <a href="../">✳ PIE roots</a>
          <a href="https://github.com/stared/pie-roots">GitHub</a>
        </nav>
      )}
      <header>
        <h1>{view.title}</h1>
        {!share && <p>{view.dek}</p>}
      </header>
      <figure>{view.chart}</figure>
      {share ? (
        <footer className="credit">
          <span><svg width="12" height="13"><circle cx="6" cy="7" r="4.4" className="t-dot" /></svg> modern word</span>
          <span><svg width="12" height="13"><circle cx="6" cy="7" r="4" fill="none" className="t-ring" /></svg> attested ancestor</span>
          <span><svg width="12" height="13"><circle cx="6" cy="7" r="4" fill="none" className="t-ring" strokeDasharray="2 2" /></svg> reconstructed</span>
          <span><svg width="20" height="13"><line x1="1" y1="7" x2="19" y2="7" className="t-link" strokeDasharray="5 4" /></svg> disputed step</span>
          <span className="by">by <a href="https://p.migdal.pl">Piotr Migdał</a> · 2026 · <a href="https://p.migdal.pl/pie-roots/">p.migdal.pl/pie-roots</a> · sources: Wiktionary, Etymonline</span>
        </footer>
      ) : (
        <footer className="credit">
          <span><svg width="12" height="13"><circle cx="6" cy="7" r="4.4" className="t-dot" /></svg> modern word</span>
          <span><svg width="12" height="13"><circle cx="6" cy="7" r="4" fill="none" className="t-ring" /></svg> attested ancestor</span>
          <span><svg width="12" height="13"><circle cx="6" cy="7" r="4" fill="none" className="t-ring" strokeDasharray="2 2" /></svg> reconstructed</span>
          <span><svg width="20" height="13"><line x1="1" y1="7" x2="19" y2="7" className="t-link" strokeDasharray="5 4" /></svg> disputed step</span>
          <span className="by">sources: Wiktionary, Etymonline · <a href={`https://github.com/stared/pie-roots/blob/main/${view.trees}`}>full descent tree</a> · <a href="?share">poster version</a> · download <button className="dl" onClick={() => downloadPoster(view.slug, "png")}>PNG</button> / <button className="dl" onClick={() => downloadPoster(view.slug, "svg")}>SVG</button></span>
        </footer>
      )}
    </div>
  );
}
