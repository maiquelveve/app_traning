import { useAuthUserContext } from "../context";

import { PublicRoutes } from "./public.routes";
import { RootRoutes } from "./root.routes";

const AppRoutes = () => {
  const { getToken } = useAuthUserContext();

  return getToken() ? <RootRoutes /> : <PublicRoutes />;
};

export default AppRoutes;
