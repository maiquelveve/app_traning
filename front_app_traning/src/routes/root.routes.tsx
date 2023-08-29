import { Route } from "react-router-dom";

import { Dashoard } from "../pages/home";
import { ListAllModalities } from "../pages/modalities";

import { LayoutDashboard } from "../components";
import { AuthPageProvider } from "../context";

export const rootRoutes = () => {
  return (
    <>
      <Route 
        path='/' 
        element={
          <LayoutDashboard>
            <AuthPageProvider>
              <Dashoard />
            </AuthPageProvider>
          </LayoutDashboard>
        } 
      />
      <Route 
        path='/modalidades' 
        element={
          <LayoutDashboard>
            <AuthPageProvider>
              <ListAllModalities />
            </AuthPageProvider>
          </LayoutDashboard>
        } 
      />
    </>
  );
};
