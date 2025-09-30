import { InlineMath, BlockMath } from "react-katex";

type Props = {
  content: string;
};

export default function MathText({ content }: Props) {
  const parts: Array<{ type: "block" | "inline" | "text"; value: string }> = [];
  const text = content;

  const pushText = (t: string) => {
    if (t) parts.push({ type: "text", value: t });
  };

  const blockRegex = /\$\$([\s\S]*?)\$\$/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = blockRegex.exec(text))) {
    pushText(text.slice(lastIndex, m.index));
    parts.push({ type: "block", value: m[1].trim() });
    lastIndex = (m.index + m[0].length);
  }
  pushText(text.slice(lastIndex));

  const withInline: typeof parts = [];
  for (const p of parts) {
    if (p.type !== "text") {
      withInline.push(p);
      continue;
    }
    const inlineRegex = /\$(.+?)\$/g;
    let iLast = 0;
    let mi: RegExpExecArray | null;
    while ((mi = inlineRegex.exec(p.value))) {
      const before = p.value.slice(iLast, mi.index);
      if (before) withInline.push({ type: "text", value: before });
      withInline.push({ type: "inline", value: mi[1] });
      iLast = mi.index + mi[0].length;
    }
    const tail = p.value.slice(iLast);
    if (tail) withInline.push({ type: "text", value: tail });
  }

  const normalizeMath = (s: string) => {
    return s
      .replace(/\\mathrm\{кг\\cdot м\^2\}/g, "\\mathrm{kg\\cdot m^2}")
      .replace(/\\mathrm\{кг\}/g, "\\mathrm{kg}")
      .replace(/\\mathrm\{м\^2\}/g, "\\mathrm{m^2}")
      .replace(/\\mathrm\{м\/с\^2\}/g, "\\mathrm{m/s^2}")
      .replace(/\\mathrm\{м\}/g, "\\mathrm{m}")
      .replace(/\\mathrm\{нм\}/g, "\\mathrm{nm}")
      .replace(/\\mathrm\{Н\}/g, "\\mathrm{N}")
      .replace(/\\mathrm\{с\}/g, "\\mathrm{s}")
      .replace(/кг/g, "\\mathrm{kg}")
      .replace(/нм/g, "\\mathrm{nm}")
      .replace(/Н/g, "\\mathrm{N}")
      .replace(/с/g, "\\mathrm{s}")
      .replace(/м/g, "\\mathrm{m}");
  };


  return (
    <div className="prose prose-sm max-w-none">
      {withInline.map((p, i) => {
        if (p.type === "text") return <span key={i}>{p.value}</span>;
        if (p.type === "inline") return <InlineMath key={i}>{normalizeMath(p.value)}</InlineMath>;
        return (
          <div key={i} className="my-2">
            <BlockMath>{normalizeMath(p.value)}</BlockMath>
          </div>
        );
      })}
    </div>
  );
}


