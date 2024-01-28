import Canvas from "./components/Canvas";
import beachImg from "./assets/beach.jpg";

function App() {
  return (
    <div>
      <h1>Editor</h1>
      <Canvas imageUrl={beachImg} />
    </div>
  );
}

export default App;
