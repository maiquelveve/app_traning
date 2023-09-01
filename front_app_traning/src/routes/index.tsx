import { Routes } from "react-router-dom";

import { useAuthUserContext } from "../context";

import { publicRoutes } from "./public.routes";
import { genericsRoutes } from "./generics.routes";
import { userRoutes } from "./user.routes";
import { trainerRoutes } from "./trainer.routes";
import { rootRoutes } from "./root.routes";
import { loadingRoutes } from "./loading.routes";

const AppRoutes = () => {
  const { 
    getToken, 
    isUserProfiles, 
    isTrainerProfiles, 
    isRootProfiles, 
    loadingAuthUserContext, 
    profilesUsersCurrent 
  } = useAuthUserContext();

  const token = getToken();

  if(loadingAuthUserContext || (token && !profilesUsersCurrent.length)) {
    return(
      <Routes>
        {loadingRoutes()}
      </Routes>
    );
  }

  return (
    <Routes>
      {genericsRoutes()}
      {!token && publicRoutes()}
        
      {isUserProfiles && userRoutes()}
      {isTrainerProfiles && trainerRoutes()}
      {isRootProfiles && rootRoutes()}
    </Routes>
  );
};

export default AppRoutes;
