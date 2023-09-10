import { Route } from "react-router-dom";

import { Dashoard } from "../pages/home";

import { LayoutDashboard } from "../components";

export const userRoutes = () => {
  return (
    <>
      <Route 
        path='/meus_treinos' 
        element={
          <LayoutDashboard>
            <Dashoard />
          </LayoutDashboard>
        } 
      />
    </>
  );
};
