import { Route } from "react-router-dom";

import { Dashoard } from "../pages/home";

import { LayoutSingle } from "../components/layout";

export const rootRoutes = () => {
  return (
    <>
      <Route 
        path='/usuarios' 
        element={
          <LayoutSingle>
            <Dashoard />
          </LayoutSingle>
        } 
      />
    </>
  );
};
