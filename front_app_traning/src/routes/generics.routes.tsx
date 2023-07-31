import { Route, Navigate } from "react-router-dom";

import { ErrorPage } from "../pages/system";
import { Dashoard } from "../pages/home";
import { Profile, ChangePassword } from "../pages/users";

import { AuthPageProvider } from "../context";
import { LayoutSingle, LayoutDashboard } from "../components/layout";

export const genericsRoutes = () => {
  return (
    <>
      <Route 
        path='/perfil' 
        element={
          <LayoutDashboard>
            <AuthPageProvider>
              <Profile />
            </AuthPageProvider>
          </LayoutDashboard>
        } 
      />
      <Route 
        path='/troca_senha' 
        element={
          <LayoutDashboard>
            <AuthPageProvider>
              <ChangePassword />
            </AuthPageProvider>
          </LayoutDashboard>
        } 
      />
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
        path='/error' 
        element={
          <LayoutSingle>
            <AuthPageProvider>
              <ErrorPage />
            </AuthPageProvider>
          </LayoutSingle>
        } 
      />
      
      <Route path='*' element={<Navigate to="/error" />} />
    </>
  );
};
