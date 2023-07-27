import { Route } from "react-router-dom";

import { Dashoard } from "../pages/home";

import { LayoutSingle } from "../components/layout";

export const userRoutes = () => {
  return (
    <>
      <Route 
        path='/user' 
        element={
          <LayoutSingle>
            <Dashoard />
          </LayoutSingle>
        } 
      />
    </>
  );
};
