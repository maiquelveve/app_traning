import { Route } from "react-router-dom";

import { Dashoard } from "../pages/home";

import { LayoutSingle } from "../components";

export const trainerRoutes = () => {
  return (
    <>
      <Route 
        path='/trainer' 
        element={
          <LayoutSingle>
            <Dashoard />
          </LayoutSingle>
        } 
      />
    </>
  );
};
