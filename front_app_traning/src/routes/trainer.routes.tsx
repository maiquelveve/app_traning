import { Route } from "react-router-dom";

import { Dashoard } from "../pages/home";

import { LayoutDashboard } from "../components";
import { AuthPageProvider } from "../context";

export const trainerRoutes = () => {
  return (
    <>
      <Route 
        path='/meus_alunos' 
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
