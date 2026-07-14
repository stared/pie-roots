import { useEffect, useState, type ReactNode } from "react";
import See from "./See";
import Speak from "./Speak";
import Sit from "./Sit";
import Turn from "./Turn";
import "./roots.css";

interface View {
  hash: string;
  title: ReactNode;
  dek: ReactNode;
  chart: ReactNode;
}

const VIEWS: View[] = [
  {
    hash: "see",
    title: <><i>*weyd-</i> ‘to see’</>,
    dek: <>Its perfect <i>*wóyde</i> ‘has seen’ meant <b>knows</b>, so the root split: seeing through Latin (<b>vision</b>, <b>view</b>, <b>evidence</b>), knowing through Germanic (<b>wit</b>, <b>wise</b>) and Greek (<b>history</b>, <b>idea</b>). Greek dropped its <i>w-</i>, so <i>ϝιδ-</i> ‘seen’ hides in <b>idea</b> — and, read as ἀ-ϝιδ- ‘the Unseen’, in <b>Hades</b>.</>,
    chart: <See />,
  },
  {
    hash: "speak",
    title: <><i>*bʰeh₂-</i> ‘to speak’</>,
    dek: <>One verb of speaking: Greek made it sound (<b>prophet</b>, <b>symphony</b>), Latin made it destiny (<b>fate</b>, <b>fairy</b>), Germanic made it command (<b>ban</b>, <b>banish</b>). PIE <i>bʰ-</i> became Latin <i>f-</i> and Greek <i>φ-</i>, so <i>*bʰeh₂-</i> is <i>fārī</i> and <i>φημί</i>. Its homophone <i>*bʰeh₂-</i> ‘to shine’ — phase, photo-, phantom, beacon — is a different root.</>,
    chart: <Speak />,
  },
  {
    hash: "sit",
    title: <><i>*sed-</i> ‘to sit’</>,
    dek: <>Nine separate routes into English: <b>sit</b> and <b>soot</b> straight from Old English, <b>siege</b> and <b>size</b> through French, <b>chair</b> from Greek by way of Latin, <b>banshee</b> from a fairy mound. English <b>nest</b> and Latin <i>nīdus</i> compress the same compound, <i>*ni-sd-ós</i> ‘where the bird sits down’; Greek wore the <i>s-</i> down to a breath, so <i>*sed-</i> is ἕδρα ‘seat’.</>,
    chart: <Sit />,
  },
  {
    hash: "turn",
    title: <><i>*kʷel-</i> ‘to turn’</>,
    dek: <>The root named the wheel by turning twice: reduplicated <i>*kʷe-kʷl-óm</i> became <b>wheel</b>, <b>cycle</b>, and <b>chakra</b>; the single turn <i>*kʷólo-</i> gave Polish <b>koło</b> and, through Greek, <b>pole</b>. Greek split <i>kʷ</i> by the following vowel — π before o (<i>πόλος</i>), τ before e (<i>τέλος</i>) — while Germanic made it <i>hw-</i> (<b>wheel</b>). The two <i>tele-</i>s are different Greek words, each only a disputed member: <b>teleology</b> ends on <i>τέλος</i> ‘completion’, <b>telephone</b> reaches through <i>τῆλε</i> ‘far’.</>,
    chart: <Turn />,
  },
];

const fromHash = () => VIEWS.find(v => v.hash === location.hash.slice(1)) ?? VIEWS[0];

export default function RootsApp() {
  const [view, setView] = useState(fromHash);

  useEffect(() => {
    const onHash = () => setView(fromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="roots">
      <nav>
        {VIEWS.map(v => (
          <a key={v.hash} href={`#${v.hash}`} className={v === view ? "active" : ""}>{v.hash}</a>
        ))}
      </nav>
      <header>
        <h1>{view.title}</h1>
        <p>{view.dek}</p>
      </header>
      <figure>{view.chart}</figure>
      <footer>exploration tier · chains follow Wiktionary · grades and sources in root_trees.md</footer>
    </div>
  );
}
