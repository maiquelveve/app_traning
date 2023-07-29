import { Route } from "react-router-dom";

import { Dashoard } from "../pages/home";

import { LayoutSingle } from "../components";

export const rootRoutes = () => {
  return (
    <>
      <Route 
        path='/root' 
        element={
          <LayoutSingle>
            <Dashoard />
          </LayoutSingle>
        } 
      />
    </>
  );
};
