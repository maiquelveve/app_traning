import { Route } from "react-router-dom";

import { Dashoard } from "../pages/home";

import { LayoutDashboard } from "../components";

export const trainerRoutes = () => {
  return (
    <>
      <Route 
        path='/meus_alunos' 
        element={
          <LayoutDashboard>
            <Dashoard />
          </LayoutDashboard>
        } 
      />
    </>
  );
};
