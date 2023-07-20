import { Route, Routes, Navigate } from "react-router-dom";

import { Auth } from "../pages/users";
import { Dashoard } from "../pages/home";
import { ErrorPage } from "../pages/system";
import { LayoutSingle } from "../components/layout";
import { AuthPageProvider } from "../context";

const AppRoutes = () => {
  return (
    <Routes>
      <Route 
        path='/' 
        element={<Dashoard />} 
      />

      <Route 
        path='/acessos' 
        element={ 
          <LayoutSingle>
            <AuthPageProvider>
              <Auth />
            </AuthPageProvider>
          </LayoutSingle> 
        } 
      />

      <Route 
        path='/error'
        element={<ErrorPage />}
      />

      <Route path='*' element={<Navigate to="/error" />} />
    </Routes>
  );
};

export default AppRoutes;
