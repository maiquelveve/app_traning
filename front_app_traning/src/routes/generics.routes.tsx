import { Route, Navigate } from "react-router-dom";

import { Dashoard } from "../pages/home";

import { AuthPageProvider } from "../context";
import { LayoutSingle } from "../components/layout";
import { ErrorPage } from "../pages/system";

export const genericsRoutes = () => {
  return (
    <>
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
