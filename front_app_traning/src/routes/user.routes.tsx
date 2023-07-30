import { Route } from "react-router-dom";

import { Dashoard } from "../pages/home";

import { LayoutDashboard } from "../components";
import { AuthPageProvider } from "../context";

export const userRoutes = () => {
  return (
    <>
      <Route 
        path='/meus_treinos' 
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
