import { Route } from "react-router-dom";

import { Auth } from "../pages/users";

import { AuthPageProvider } from "../context";
import { LayoutSingle } from "../components/layout";

export const publicRoutes = () => {
  return (
    <>
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
    </>
  );
};
