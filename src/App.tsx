import { ThoughtsProvider } from "./contexts/ThoughtsContext";
import { MerchandiseProvider } from "./contexts/MerchandiseContext";
import AppRouting from "./routing/AppRouting";

function App() {
  return (
    <ThoughtsProvider>
      <MerchandiseProvider>
        <AppRouting />
      </MerchandiseProvider>
    </ThoughtsProvider>
  );
}

export default App;
