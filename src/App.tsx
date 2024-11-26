import "./App.css";
import { ThoughtsProvider } from "./contexts/ThoughtsContext";
import AppRouting from "./routing/AppRouting";

function App() {
  return (
    <>
      <ThoughtsProvider>
        <AppRouting />
      </ThoughtsProvider>
    </>
  );
}

export default App;
