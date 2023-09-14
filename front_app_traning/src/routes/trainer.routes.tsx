import { Route } from "react-router-dom";

import { Dashoard } from "../pages/home";
import { ListAllModalities } from "../pages/modalities";

import { ModalitiesPageProvider } from "../context";
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
