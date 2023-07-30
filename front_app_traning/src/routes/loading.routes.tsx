import { Route } from "react-router-dom";

import { LayoutSingle } from "../components/layout";

import { LoadingPage } from "../pages/system";

export const loadingRoutes = () => {
  return (
    <>
      <Route path='*' element={<LayoutSingle><LoadingPage /></LayoutSingle>} />
    </>
  );
};
