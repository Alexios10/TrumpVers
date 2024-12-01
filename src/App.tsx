import { ThoughtsProvider } from "./contexts/ThoughtsContext";
import { MerchandiseProvider } from "./contexts/MerchandiseContext";
import { StaffProvider } from "./contexts/StaffMembersContext"; // Add this import
import AppRouting from "./routing/AppRouting";

function App() {
  return (
    <ThoughtsProvider>
      <MerchandiseProvider>
        <StaffProvider>
          <AppRouting />
        </StaffProvider>
      </MerchandiseProvider>
    </ThoughtsProvider>
  );
}

export default App;
