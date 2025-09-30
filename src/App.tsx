import Layout from "./components/Layout";
import Calculator1 from "./pages/Calculator1";
import Calculator2 from "./pages/Calculator2";
import Graph1 from "./pages/Graph1";

export default function App() {
  return (
    <Layout
      defaultValue="calc1"
      tabs={[
        { value: "calc1", label: "Calculator 1", content: <Calculator1 /> },
        { value: "calc2", label: "Calculator 2", content: <Calculator2 /> },
        { value: "graph1", label: "Graph 1", content: <Graph1 /> },
      ]}
    />
  );
}
