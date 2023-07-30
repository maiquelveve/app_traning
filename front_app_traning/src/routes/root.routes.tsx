import { Route } from "react-router-dom";

import { Dashoard } from "../pages/home";

import { LayoutDashboard } from "../components";
import { AuthPageProvider } from "../context";

export const rootRoutes = () => {
  return (
    <>
      <Route 
        path='/usuarios' 
        element={
          <LayoutDashboard>
            <AuthPageProvider>
              <Dashoard />
            </AuthPageProvider>
          </LayoutDashboard>
        } 
      />
    </>
  );
};
