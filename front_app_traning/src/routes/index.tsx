import { Routes } from "react-router-dom";

import { useAuthUserContext } from "../context";

import { publicRoutes } from "./public.routes";
import { genericsRoutes } from "./generics.routes";
import { userRoutes } from "./user.routes";
import { trainerRoutes } from "./trainer.routes";
import { rootRoutes } from "./root.routes";
import { loadingRoutes } from "./loading.routes";

const AppRoutes = () => {
  const { getToken, isUserProfiles, isTrainerProfiles, isRootProfiles, loadingAuthUserContext } = useAuthUserContext();

  if(loadingAuthUserContext) {
    return(
      <Routes>
        {loadingRoutes()}
      </Routes>
    );
  }

  return (
    <Routes>
      {genericsRoutes()}
      {!getToken() && publicRoutes()}
        
      {isUserProfiles && userRoutes()}
      {isTrainerProfiles && trainerRoutes()}
      {isRootProfiles && rootRoutes()}
    </Routes>
  );
};

export default AppRoutes;
