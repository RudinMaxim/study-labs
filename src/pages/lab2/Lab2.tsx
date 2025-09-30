import { useMemo } from "react";
import { useLab2 } from "./useLab2";
import MathText from "../../components/MathText";
import LabOverbeck from "./LabOverbeck";

function getQueryParam(param: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function ProblemBlock({
  title,
  steps,
  answer,
}: {
  title: string;
  steps: { text: string }[];
  answer: string;
}) {
  const stepItems = useMemo(() => steps, [steps]);
  return (
    <div className="rounded-lg border p-3 shadow-sm animate-in fade-in-50 slide-in-from-bottom-2">
      <h3 className="text-base font-semibold mb-2">{title}</h3>
      <ol className="list-decimal ml-5 text-sm space-y-1">
        {stepItems.map((s, i) => (
          <li key={i}>
            <MathText content={s.text} />
          </li>
        ))}
      </ol>
      <div className="mt-2 text-sm">
        <span className="font-medium">Ответ: </span>
        <MathText content={answer} />
      </div>
    </div>
  );
}

export default function Lab2() {
  const { g, atomicMassUnitKg, problems } = useLab2();
  const showProblems = getQueryParam("problem") === "y";

  return (
    <div className="mx-auto w-full max-w-screen-md grid gap-4 px-3 py-4">
      <LabOverbeck />
      <div className="text-xs text-muted-foreground">
        <MathText
          content={`Константы: $g = ${g}\\,\\mathrm{m/s^2}$, $1\\,u = ${atomicMassUnitKg}\\,\\mathrm{kg}$`}
        />
      </div>
      {showProblems &&
        problems.map((p) => (
          <ProblemBlock
            key={p.id}
            title={p.title}
            steps={p.steps}
            answer={p.answer}
          />
        ))}
    </div>
  );
}
