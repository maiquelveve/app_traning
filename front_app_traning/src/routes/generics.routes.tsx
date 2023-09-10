import { Route, Navigate } from "react-router-dom";

import { ErrorPage } from "../pages/system";
import { Dashoard } from "../pages/home";
import { Profile, ChangePassword } from "../pages/users";

import { LayoutSingle, LayoutDashboard } from "../components/layout";

export const genericsRoutes = () => {
  return (
    <>
      <Route 
        path='/perfil' 
        element={
          <LayoutDashboard>
            <Profile />
          </LayoutDashboard>
        } 
      />
      <Route 
        path='/troca_senha' 
        element={
          <LayoutDashboard>
            <ChangePassword />
          </LayoutDashboard>
        } 
      />
      <Route 
        path='/' 
        element={
          <LayoutDashboard>
            <Dashoard />
          </LayoutDashboard>
        } 
      />

      <Route 
        path='/error' 
        element={
          <LayoutSingle>
            <ErrorPage />
          </LayoutSingle>
        } 
      />
      
      <Route path='*' element={<Navigate to="/error" />} />
    </>
  );
};
