import { Route, Navigate } from "react-router-dom";

import { Dashoard, DashoardResponsive, DashoardClipped } from "../pages/home";

import { AuthPageProvider } from "../context";
import { LayoutSingle } from "../components/layout";
import { ErrorPage } from "../pages/system";

export const genericsRoutes = () => {
  return (
    <>
      <Route 
        path='/responsive' 
        element={
          <LayoutSingle>
            <AuthPageProvider>
              <DashoardResponsive />
            </AuthPageProvider>
          </LayoutSingle>
        } 
      />
      <Route 
        path='/clipped' 
        element={
          <LayoutSingle>
            <AuthPageProvider>
              <DashoardClipped />
            </AuthPageProvider>
          </LayoutSingle>
        } 
      />
      <Route 
        path='/' 
        element={
          <LayoutSingle>
            <AuthPageProvider>
              <Dashoard />
            </AuthPageProvider>
          </LayoutSingle>
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
