import { BlockMath, InlineMath } from "react-katex";

function LatexText({ text }) {
  if (!text) return null;

  const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[\s\S]+?\$)/g);

  return parts.map((part, i) => {
    if (part.startsWith("$$")) {
      return <BlockMath key={i} math={part.slice(2, -2)} />;
    }
    if (part.startsWith("$")) {
      return <InlineMath key={i} math={part.slice(1, -1)} />;
    }
    return <span key={i}>{part}</span>;
  });
}
