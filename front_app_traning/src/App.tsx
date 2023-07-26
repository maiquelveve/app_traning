import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes";
import { LayoutProvider, AuthUserProvider } from "./context";

function App() {
  return(
    <BrowserRouter>
      <LayoutProvider>
        <AuthUserProvider>
          <AppRoutes />
        </AuthUserProvider>
      </LayoutProvider>
    </BrowserRouter>
  );
}
 
export default App;
