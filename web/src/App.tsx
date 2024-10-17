import "./App.css";
import { Banner } from "./components/Banner/Banner";
import { Resizable } from "./components/Resizable/Resizable";

export function App() {
  return (
    <>
      <Banner />
      <Resizable left={<CodecInput />} right={<Json />} />
    </>
  );
}

function CodecInput() {
  return (
    <div>
      <h1>Hello JAM</h1>
    </div>
  );
}

function Json() {
  return <pre />;
}
