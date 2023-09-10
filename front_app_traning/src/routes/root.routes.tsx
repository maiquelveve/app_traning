import { Route } from "react-router-dom";

import { Dashoard } from "../pages/home";
import { ListAllModalities } from "../pages/modalities";

import { LayoutDashboard } from "../components";

import { ModalitiesPageProvider } from "../context";

export const rootRoutes = () => {
  return (
    <>
      <Route 
        path='/' 
        element={
          <LayoutDashboard>
            <Dashoard />
          </LayoutDashboard>
        } 
      />
      <Route 
        path='/modalidades' 
        element={
          <LayoutDashboard>
            <ModalitiesPageProvider>
              <ListAllModalities /> 
            </ModalitiesPageProvider>
          </LayoutDashboard>
        } 
      />
    </>
  );
};
