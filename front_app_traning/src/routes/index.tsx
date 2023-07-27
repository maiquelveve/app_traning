import { Routes } from "react-router-dom";

import { useAuthUserContext } from "../context";

import { rootRoutes } from "./root.routes";
import { publicRoutes } from "./public.routes";
import { genericsRoutes } from "./generics.routes";

const AppRoutes = () => {
  const { getToken } = useAuthUserContext();

  return (
    <Routes>
      {genericsRoutes()}
      {!getToken() 
        ?
        publicRoutes() 
        :
        rootRoutes()  
      }
      
    </Routes>
  );
};

export default AppRoutes;
