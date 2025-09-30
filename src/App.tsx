import Layout from "./components/Layout";
import Lab1 from "./pages/lab1/Lab1";
import Lab2 from "./pages/lab2/Lab2";

export default function App() {
  return (
    <Layout
      defaultValue="lab1"
      tabs={[
        { value: "lab1", label: "Lab 1", content: <Lab1 /> },
        { value: "lab2", label: "Lab 2", content: <Lab2 /> },
      ]}
    />
  );
}
