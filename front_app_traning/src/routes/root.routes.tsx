import { Route, Routes, Navigate } from "react-router-dom";

import { Dashoard } from "../pages/home";
import { ErrorPage } from "../pages/system";

import { LayoutSingle } from "../components/layout";

export const RootRoutes = () => {
  return (
    <Routes>
      <Route 
        path='/' 
        element={
          <LayoutSingle>
            <Dashoard />
          </LayoutSingle>
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
    </Routes>
  );
};
